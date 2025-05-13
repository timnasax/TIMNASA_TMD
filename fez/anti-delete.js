const { hango } = require("../framework/hango");
const fs = require('fs');


let antiDeleteActive = false; // Variable pour stocker l'état de la commande anti-delete

/ Map to store messages for anti-delete feature
const messageStore = new Map();
let antiDeleteEnabled = new Map(); // Changed to Map to store per-chat settings

hango({
  nomCom: "antidelete",
  categorie: "Group",
  reaction: "🔄"
}, async (dest, hn, commandeOptions) => {
  const { repondre, arg, msgId } = commandeOptions;

  if (!arg[0]) {
    repondre("Please specify 'on' or 'off' to enable/disable anti-delete feature.");
    return;
  }

  const action = arg[0].toLowerCase();
  const chatId = dest; // This works for both group and private chats

  if (action === 'on') {
    antiDeleteEnabled.set(chatId, true);
    repondre("✅ Anti-delete feature has been enabled in this chat. Deleted messages will be reposted.");
  } else if (action === 'off') {
    antiDeleteEnabled.delete(chatId);
    // Clear stored messages for this chat
    for (const [key, value] of messageStore.entries()) {
      if (value.from === chatId) {
        messageStore.delete(key);
      }
    }
    repondre("❌ Anti-delete feature has been disabled in this chat.");
  } else {
    repondre("Invalid option. Please use 'on' or 'off'.");
  }
});

// Message handler for storing messages
hn.ev.on('messages.upsert', async ({ messages }) => {
  for (const message of messages) {
    const chatId = message.key.remoteJid;
    
    // Only store if anti-delete is enabled for this chat
    if (antiDeleteEnabled.has(chatId) && message.message) {
      // Store message with key as the message ID
      messageStore.set(message.key.id, {
        message: message.message,
        from: chatId,
        participant: message.key.participant || message.key.remoteJid,
        type: chatId.endsWith('@g.us') ? 'group' : 'private'
      });
      
      // Remove message after 1 hour to prevent memory overload
      setTimeout(() => {
        messageStore.delete(message.key.id);
      }, 60 * 60 * 1000);
    }
  }
});

// Message delete handler
hn.ev.on('messages.delete', async (message) => {
  // Check if it's a single message delete or multiple
  const messageIds = Array.isArray(message.keys) ? message.keys : [message];

  for (const msgKey of messageIds) {
    const deletedMessage = messageStore.get(msgKey.id);
    
    if (deletedMessage && antiDeleteEnabled.has(deletedMessage.from)) {
      const isGroup = deletedMessage.type === 'group';
      const sender = deletedMessage.participant;
      
      let caption = `⚠️ *Anti-Delete Detection*\n\n`;
      
      if (isGroup) {
        caption += `• From: @${sender.split('@')[0]}\n`;
        caption += `• Chat: Group\n`;
      } else {
        caption += `• Chat: Private\n`;
      }
      caption += `• Action: Message Deleted\n\n`;
      caption += `*Original Message:*`;

      try {
        // Resend the deleted message
        await hn.sendMessage(deletedMessage.from, {
          forward: deletedMessage.message,
          caption: caption,
          mentions: isGroup ? [sender] : []
        });
      } catch (error) {
        console.error('Error resending deleted message:', error);
      }

      // Remove from storage
      messageStore.delete(msgKey.id);
    }
  }
});
