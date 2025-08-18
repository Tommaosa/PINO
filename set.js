// change only what you are ask to change else it won't work thanks for your understanding 
const fs = require('fs'), 
      dotenv = fs.existsSync('config.env') ? require('dotenv').config({ path: '/.env' }) : undefined,
      convertToBool = (text, fault = 'true') => text === fault;


global.sessionServer = "https://sessions-r8cn.onrender.com";
global.session = "https://session-id-8pge.onrender.com"; 
 
module.exports = {
SESSION_ID: process.env.SESSION_ID || "", // Add sess Id here especially when deploying on panels else use app.json and .env file...
SUDO_NUMBERS: process.env.SUDO_NUMBERS || "", // Add multiple Numbers with Country Codes without (+) Separated by Comma...
ANTI_DELETE: process.env.ANTI_DELETE || "inboxonly", // can be set to inboxonly/allchats/true/false
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "true",
AUTO_LIKE_EMOJIS: process.env.AUTO_LIKE_EMOJIS || "💛,❤️,💜,🤍,💙", // Input yours custom...
AUTO_REPLY_STATUS: process.env.AUTO_REPLY_STATUS || "false",
STATUS_REPLY_MSG: process.env.STATUS_REPLY_MSG || "✅️ Status Viewed by PINO TB", // Custom message
MODE: process.env.MODE || "public", // Put private or public or inbox or groups
OWNER_NUMBER: process.env.OWNER_NUMBER || "25451506469", // Your number
OWNER_NAME: process.env.OWNER_NAME || "Tom Maosa", // Your name
PACK_AUTHOR: process.env.PACK_AUTHOR || "PINO TB TECH", // Custom author
PACK_NAME: process.env.PACK_NAME || "💙", // Custom pack name
PREFIX: process.env.PREFIX || ".",
VERSION: process.env.VERSION || "3.0.0",
ANTILINK: process.env.ANTILINK || "false", 
ANTICALL: process.env.ANTICALL || "false",
ANTIBAD: process.env.ANTIBAD || "false",
BAD_WORDS: process.env.BAD_WORDS || "fuck, pussy, anus, idiot", 
ANTICALL_MSG: process.env.ANTICALL_MSG || "*_📞 📵 No Calls Allowed!_*",
AUTO_REACT: process.env.AUTO_REACT || "false",
BOT_NAME: process.env.BOT_NAME || "PINO TB", // Bot name updated
BOT_PIC: process.env.BOT_PIC || "https://raw.githubusercontent.com/Mayelprince/url/main/menun.jpg", // Keep default or replace with yours
AUTO_AUDIO: process.env.AUTO_AUDIO || "false",
AUTO_BIO: process.env.AUTO_BIO || "false",
AUTO_BIO_QUOTE: process.env.AUTO_BIO_QUOTE || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ PINO TB", // Custom bio
CHAT_BOT: process.env.CHAT_BOT || "false", 
WELCOME: process.env.WELCOME || "false",
GOODBYE: process.env.GOODBYE || "false",    
AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "false", 
AUTO_BLOCK: process.env.AUTO_BLOCK || "333,799", 
PRESENCE: process.env.PRESENCE || "online", 
TIME_ZONE: process.env.TIME_ZONE || "Africa/Nairobi", // Changed to your timezone
};

let file = require.resolve(__filename); 
fs.watchFile(file, () => { 
    fs.unwatchFile(file); 
    console.log(`Update '${__filename}'`); 
    delete require.cache[file]; 
    require(file); 
});
// That's All...
