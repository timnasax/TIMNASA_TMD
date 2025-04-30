const {timoth} = require('../timnasa/timoth');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

timoth({
  nomCom: "face",
  categorie: "Download",
  reaction: "🎬"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{
         image : { url : result.thumbnail}, 
         caption: quoted: ms,
         contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "NJABULO JB",
         serverMessageId: 143,
           {
         }
       zk.sendMessage(dest, { 
         video: { url: result.hd  }, 
         caption: quoted: ms,
         contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "NJABULO JB",
         serverMessageId: 143,
        }
      },
    })
    .catch((error) => {console.log("Error:", error)
                      repondre('try fbdl2 on this link')});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.' , error);
  }
});
