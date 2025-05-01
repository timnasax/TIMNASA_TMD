const util = require('util');

const fs = require('fs-extra');

const { timoth } = require(__dirname + "/../timnasa/timoth");

const { format } = require(__dirname + "/../timnasa/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



timoth({ nomCom: "menu3", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

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



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `

┏━━ TIMNASA TMD ━━┓
┃   Mode: ${mode}
┃   User : ${s.OWNER_NAME}
┃
┣━timnasa md new vision 𒈒━➠
┗━━━𒈒by timnasa Tech𒈒━━┛\n\n`;


    

let menuMsg = `
┏━━━━━━━━━━━━━━┓
┣༆timnasa md  
┣༆by timnasa Tech
┗━━━━━━━━━━━━━━┛\n




timnasa md cmds𒈒
`;



    for (const cat in coms) {

        menuMsg += `┏━━━━━⚼ ${cat}`;

        for (const cmd of coms[cat]) {

            menuMsg += `
┃༆ ${cmd}`;

        }

        menuMsg += `
┗━━━━━━━━━━━━━━┛\n`

    }



    menuMsg += `


︎┏━━━━━━━━━━━━━━┓
️┣❏timnasa md bot 
┣❏by timnasa Tech 
┗━━━━━━━━━━━━━━┛\n


┏━━━━━━━━━━━━━━┓
┃powered by timnasa Tech 
┗━━━━━━━━━━━━━━┛\n


`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *BONIPHACE-MD*, déveloper Fredie" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *TKM-bot*, déveloper cod3uchiha" }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

else {

    

    repondre(infoMsg + menuMsg);

    

}
