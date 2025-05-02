"use strict";
const { timoth } = require("../timnasa/timoth");
const axios = require("axios");
const moment = require("moment");

timoth({ 
    nomCom: "repo", 
    categorie: "General", 
    reaction: "☢️", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { pushname, repondre } = commandeOptions;
    const githubRepo = 'https://api.github.com/repos/https:Next5x/TIMNASA_TMD1';
    const img = 'https://files.catbox.moe/9w17os.jpg';

    try {
        const response = await axios.get(githubRepo);
        const data = response.data;

        const created = moment(data.created_at).format("DD/MM/YYYY");
        const updated = moment(data.updated_at).format("DD/MM/YYYY");

        const gitdata = `
*Hello 👋 my friend ${nomAuteurMessage}*

            *This is ${conf.BOT}*
            the best bot in the universe developed by ${conf.OWNER_NAME}. Fork and give a star 🌟 to my repo!
     ╭═════┈┈┈═══════┈┈
     ┣⁠✞  *Stars:* - ${repoInfo.stars}
     ┣⁠✞  *Forks:* - ${repoInfo.forks}
     ┣⁠✞  *Release date:* - ${releaseDate}
     ┣⁠✞  *Repo:* - ${repoData.html_url}
     ┣⁠✞  *Owner:*   *${conf.OWNER_NAME}*
     ╰┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┈`;


 await zk.sendMessage(dest, { 
            image: { url: img },
           caption: gitdata,
            contextInfo: {
            isForwarded: true,
             forwardedNewsletterMessageInfo: {
              newsletterJid: '120363313124070136@newsletter',
              newsletterName: "_many_",
              serverMessageId: 143,
              },
              forwardingScore: 999, // Score to indicate it has been forwarded
                externalAdReply: {
                    title: "𝚻𝚰𝚳𝚴𝚫𝐒𝚫-𝚻𝚳𝐃",
                    body: "repo",
                    thumbnailUrl: img,
                    mediaType: 1,
                    mediaUrl: "",
                    sourceUrl: ""
                }
            }

        });

    } catch (e) {
        console.log("Error fetching data:", error);
        repondre("❌ Error fetching repository data. Please try again later.");
    }
});
