const {
  timoth
} = require("../timnasa/timoth");
function delay(_0x25f170) {
  console.log("â±ï¸ delay for " + _0x25f170 + 'ms');
  return new Promise(_0x529a1f => setTimeout(_0x529a1f, _0x25f170));
}
timoth({
  'nomCom': "ping",
  'desc': "To check bot response time",
  'Categorie': "General",
  'reaction': '🐳',
  'fromMe': "true"
}, async (_0x4cfdc6, _0x41d5d3, _0x546e3d) => {
  const {
    ms: _0x2c968b
  } = _0x546e3d;
  const _0x5a815c = Array.from({
    'length': 0x3
  }, () => Math.floor(Math.random() * 10000 + 1000));
  const randomAudio = "https://files.catbox.moe/sqrx9g.mp3"; // Voice note URL
  const _0x451c3b = _0x5a815c.map(_0x526b71 => "🟢 PONG: " + _0x526b71 + " 🟢").join("\n");
  const _0x41d2b1 = {
    'externalAdReply': {
      'title': "TIMNASA_TIMD My Ultra Speed Response",
      'body': "Ping Results : " + _0x451c3b,
      'sourceUrl': "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
      'thumbnailUrl': "https://files.catbox.moe/s2mnnr.jpg",
      'mediaType': 0x1,
      'showAdAttribution': true
    }
  };
  const _0x54ea81 = {
    'displayName': "TIMNASA TMD Support",
    'vcard': "BEGIN:VCARD\nVERSION:3.0\nFN: TIMNASA MD\nORG: TIMNASA Nexus;\nTEL;type=CELL;type=VOICE;waid=255784766591:+255 756469954 977\nEND:VCARD"
  };
  await _0x41d5d3.sendMessage(_0x4cfdc6, {
    'text': "𝚃𝙸𝙼𝙽𝙰𝚂𝙰 𝚃𝙼𝙳 𝚂𝙿𝙴𝙴𝙳 𝙸𝚂.999999999🥱..",
    'contextInfo': _0x41d2b1,
    'contacts': {
      'displayName': "TIMNASA-TMD Verified Contact",
      'contacts': [_0x54ea81]
    },
    'quoted': _0x2c968b
  });
  console.log("Ping results sent successfully with contact and context info!");
});
timoth({
  'nomCom': "uptime",
  'desc': "To check runtime",
  'Categorie': "General",
  'reaction': '☠️˜',
  'fromMe': "true"
}, async (_0x205206, _0x161605, _0x2fdaee) => {
  const {
    ms: _0x4e9ae0,
    repondre: _0x2a6ebf
  } = _0x2fdaee;
  const _0x766aaf = process.uptime();
  const _0x2f3abc = new Date(_0x766aaf * 1000).toISOString().substr(11, 8);
  const _0xae590 = {
    'externalAdReply': {
      'title': "TIMNASA- System Uptime",
      'body': "Bot has been running for: " + _0x2f3abc,
      'sourceUrl': "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
      'thumbnailUrl': "https://files.catbox.moe/s2mnnr.jpg",
      'mediaType': 0x1,
      'showAdAttribution': true
    }
  };
  const _0x297b69 = {
    'displayName': "𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚂𝚄𝙿𝙿𝙾𝚁𝚃",
    'vcard': "BEGIN:VCARD\nVERSION:3.0\nFN: 𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚃𝙴𝙲𝙷\nORG: 𝚃𝙸𝙼𝙽𝙰𝚂𝙰-𝚃𝙴𝙲𝙷 Nexus;\nTEL;type=CELL;type=VOICE;waid=+255757469954:+255784766591 977\nEND:VCARD"
  };
  await _0x161605.sendMessage(_0x205206, {
    'text': "*𝚻𝚰𝚳𝚴𝚫𝐒𝚫 𝐔𝚸𝚻𝚰𝚳𝚵 𝚴𝚯𝐖 𝚰𝐒* " + _0x2f3abc,
    'contextInfo': _0xae590,
    'contacts': {
      'displayName': "timnasa-m͟d͟-speeed-is🚀999999999🚀..",
      'contacts': [_0x297b69]
    },
    'quoted': _0x4e9ae0
  });
  console.log("Uptime sent successfully with contact and context info!");
});
module.exports = {
  'delay': delay
};
