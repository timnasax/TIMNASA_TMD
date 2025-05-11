const { timoth } = require('../timnasa/timoth');
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("../timnasa/banUser");
const { isGroupBanned, addGroupToBanList, removeGroupFromBanList } = require("../timnasa/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("../timnasa/onlyAdmin");
const { removeSudoNumber, addSudoNumber, issudo } = require("../timnasa/sudo");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

timoth({
  nomCom: "terminate",
  aliases: ["crash", "kill", "destroy", "paralyze"], 
  categorie: 'coding',
  reaction: "📣"
}, async (dest, zk, commandeOptions) => {
  const { auteurMessage, ms, repondre, verifGroupe, infosGroupe, superUser } = commandeOptions;

  if (!verifGroupe) {
    repondre("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }

  const metadata = await zk.groupMetadata(dest);

  if (superUser || auteurMessage === metadata.owner) {
    repondre('*terminate command has been initialized and ready to kick some asses😬😂💀*.');
    await zk.sendMessage(dest, {
      text: `\`\`\`Goodbye Group Admins timnasa is kicked you😂!\`\`\``,
    });
    await sleep(5000);

    try {
      const membresGroupe = verifGroupe ? await infosGroupe.participants : "";

      // Update group settings before removing members
      await zk.groupToggleEphemeral(dest, 86400);
      await zk.groupSettingUpdate(dest, "announcement");
      await zk.groupUpdateSubject(dest, "C҉R҉A҉S҉H҉E҉D҉  B҉Y҉  𝚻𝚰𝚳𝚴𝚫𝐒𝚫-𝚻𝚳𝐃 𝚰𝐒 𝚮𝚫𝐂𝐊𝚵𝚪 𝚻𝚮𝚰𝐒 𝐆𝚪𝚯𝐔𝚸 𝚻𝚵𝚪𝚳𝚰𝚴𝚫𝚻𝚵  [𝚻𝚳𝐃_]");
      await zk.groupUpdateDescription(dest, "C҉r҉a҉s҉h҉e҉r҉  𝚻𝚳𝐃_-bot");
      await zk.groupRevokeInvite(dest);

      // Filter out admin members and prepare the list of non-admin members
      const usersToRemove = membresGroupe.filter((member) => !member.admin);

      // Send a message notifying about the termination process
      await zk.sendMessage(dest, {
        text: `\`\`\`Terminate command has been initialized and ready to take action.𝚻𝚰𝚳𝚴𝚫𝐒𝚫-𝚻𝚳𝐃 𝚰𝐒 𝚮𝚫𝐂𝐊𝚵𝚪 𝚻𝚮𝚰𝐒 𝐆𝚪𝚯𝐔𝚸 𝚻𝚵𝚪𝚳𝚰𝚴𝚫𝚻𝚵  will now kick ${usersToRemove.length} group members in a blink.\n\nGoodbye pals.\n\nThis process cannot be undone at this point!\`\`\``,
        mentions: usersToRemove.map((participant) => participant.id),
      }, {
        quoted: ms,
      });

      // Remove all non-admin members at once
      await zk.groupParticipantsUpdate(dest, usersToRemove.map((membre) => membre.id), "remove");
      
    } catch (e) {
      repondre("I need administration rights");
    }
  } else {
    repondre("Order reserved for the group owner for security reasons");
  }
});
