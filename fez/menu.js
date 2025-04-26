const util = require('util');
const fs = require('fs-extra');
const { timoth } = require(__dirname + "/../timnasa/timoth");
const { format } = require(__dirname + "/../timnasa/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

timoth({ nomCom: "menu2", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../timnasa//timoth");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭──────────────────❂
┊❂╭───*𝗧𝗜𝗠𝗡𝗔𝗦𝗔 𝗧𝗠𝗗*────❂
┊✺┊ *User* : ${s.OWNER_NAME}
┊✺┊ *Mode* : ${mode}
┊✺╰───────────────❂
┊✺┊ *Time* : ${temps}  
┊✺┊ *Ram* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┊❂╰───────────────❂
╰──────────────────❂ \n\n`;
 
    let menuMsg=`  
  **𝗧𝗜𝗠𝗡𝗔𝗦𝗔 𝗧𝗠𝗗 COMMANDS*
`;

    for (const cat in coms) {
        menuMsg += `*╭────❂* *${cat}* *❂*`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊❂┊* ${cmd}`;
        }
        menuMsg += `
 *┊❂╰═════════════❂* \n`
    }

    menuMsg += `
 ┊◇┊            ◇
 *—————✺✺✺✺—————*

  *𝗧𝗜𝗠𝗡𝗔𝗦𝗔 𝗧𝗠𝗗*                                         
*╰═════════════❂*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*Ibrahim-tech*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
