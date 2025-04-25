const { timoth } = require('/../timnasa/timoth');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../luckydatabase/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

timoth(
    {
        nomCom : 'menu',
        categorie : 'General'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
            mode = "private";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Hours(GMT)* : ${temps}
*From* : Tanzania
*Bot* : ${s.bot} 
*Forks* : ${forks} 

 ${message}
 
 
 *𝐓𝐈𝐌𝐍𝐀𝐒𝐀 𝐓𝐌𝐃*`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Checking for .jpeg or .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(alivemsg);
    
}

    } else {
        if(!superUser) { repondre("Hello 𝚃𝙸𝙼𝙽𝙰𝚂𝙰 𝙳𝙴𝚃𝙴𝚂𝚃𝙴𝙳 𝚃𝙴𝙲𝙷 𝙸𝚜 𝚊𝚕𝚒𝚟𝚎 𝟸𝟺𝚑𝚘𝚞𝚛𝚜 𝙴𝚗𝚓𝚘𝚢 𝚃𝚘 𝚞𝚊𝚎 𝙰𝚕𝚕 𝚃𝚒𝚖𝚎🤗") ; return};

      await   repondre("You have not yet saved your alive, to do this;  enter after alive your message and your image or video link in this context: .alive message;lien");
         repondre("don't do fake thinks :)")
     }
 } else {

    if(!superUser) { repondre ("Uuuhh Only the owner can  modify the alive 𝙾𝚁 𝚃𝙸𝙼𝙽𝙰𝚂𝙰 𝚃𝙴𝙲𝙷") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(texte , tlien)

repondre('  𝐓𝐈𝐌𝐍𝐀𝐒𝐀-𝐓𝐌𝐃 Is A Live 24hrs Enjoy To Use All Time🤗. ')

}
    });
