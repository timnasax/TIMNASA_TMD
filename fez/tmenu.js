const util = require('util');
const fs = require('fs-extra');
const { timoth } = require(__dirname + "/../timnasa/timoth");
const { format } = require(__dirname + "/../timnasa/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

timoth({ nomCom: "menuc", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../timnasa/timoth");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭⊷*
┃✧ ʙᴏᴛ ɴᴀᴍᴇ : 
┃✧ ʙᴏᴛ ᴜsᴇʀ : ${nomAuteurMessage} 
┃✧ ᴘʀᴇғɪx : *[ ${s.PREFIXE} ]*
┃✧ ᴍᴏᴅᴇ : ${mode}
┃✧ ᴘʟᴀᴛғᴏʀᴍ : ${os.platform()}
┃✧ ᴅᴀᴛᴇ  : ${date}
┃✧ ᴛɪᴍᴇ : ${temps}
┃✧ ʀᴏᴍ : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
*╰⊷*\n

*╭────────────────────╮*
*☀️Good evening! time to relax🌙*
*╰────────────────────╯*
╰━•➤•${readmore}
`;

    let menuMsg = ` ᴄᴍᴅ`;
    
    for (const cat in coms) {
        menuMsg += `
 *${cat}*
 `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
- . ${cmd}`;    
        }
        menuMsg += `
`;
    }
    
    menuMsg += `
╭──────────────────╮
┃✧𝗠𝗔𝗗𝗘 𝗕𝗬 
╰──────────────────╯\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: "frediezra",
                    newsletterJid: "120363313124070136@newsletter",
                },

    } catch (error) {
        console.error("Error sending menu and song: ", error);
        repondre("Error sending menu and song: " + error);
    }
})
