const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0daUDVMN2duRkIxWHVqSDR5OWhQOFVNN3kzekZ1RGFvaE5NV1I0L2NGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzFWZFdEa2g1MnBNY2YvcjZpZGVFcmdheENhQUtlQVJYblgwUExvV3VtVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSEJIS0Q3ZnlwdWQ2ZDhzakxHdnpHYXBzbjE3N1YyUG55SDlUOWR2SmtZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEVS94OWNaUmV5SWhvVHlNb2R4OFdDRWtFLzhDcGNTU3hldGVlWUxmTng0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldOV0xVbUoyVVgzcWtnQktmdmUxNlBNbDlTOHZsSCtXNm9xbmtvRE9wMmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVaQk91dW9wU3VzaG01ODN1WldOR1VZYkZKOVhyL1VoVWFJdFZmQXFjd0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU1jcjg1Tk9EdUM5T3haWkNUd0xzTCtTZkNsMFlEL1Q5K3hHQVZmODFHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVJEN0NpQzlxaGxWWlA3YVdkKy9oZlIybTg2YnF1R2g5QXhaMDAvMVFCRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFxTzJ1bmdUK1l5ZXcyeVU0YTNydjFEUkY0a1FEUnlsaDN6dVpDSkFyMTI4Z0MxT2JYcU40SjNFS1FZUFZvLzR5bTZJQ3RnV2lCRzBRdlZoT0lJYmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiJ2TnZpODYrbGkxVVhqcHFSM3BwSDlPdkNVVHlxUjBNckl2L284bmROeVdzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTg1Njc3NDI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE0OEQzQUY0OTEyRUI2NDVGN0Y0MjcxRjdEOTUwRUM1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mzg0ODk5Mjl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImJLQUxnYWZVVFctT2VRbGU5YXZLS0EiLCJwaG9uZUlkIjoiM2M1ZDdiMzYtOGE0NC00MTA0LWEzYmYtMWY3Y2E3MDBiZGM3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlY5dnFZRlJDRlM2OWtmdXdyazJ0VnRJU3BwMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRd1JxWHM4UklDczM1cnc4d0l4UkptTDZmVUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ0ZOUjQ3RFYiLCJtZSI6eyJpZCI6IjIyNTg1Njc3NDI5OjU2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkxpZ2h0IGluIHRoZSBEYXJrbmVzcyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3VqbDh3SEVMaUEvYndHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiblJBMzRxb2t6N09Da3RUMFpQT3VEamZ0SzJUbi9heGpOYWxMR2RmMUxGTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUXpLMGxVWmZKTTdRR3BlWGswaVl4WnBub2oxY0huK3czcyt1V3RlSGlnUHRXZ2xWSW1MVW51OUthV29xeHV4N2ZwdDU5MzlqM3F0Q2VpRW1QZ2hJQVE9PSIsImRldmljZVNpZ25hdHVyZSI6ImpkOGU2OHV6Rm96TjRJWE1EelF2cGU4Y3ljZGtwZmlSV2tGcm4xcDU0TGZHWFBXdzh1WVdoNEpHejNKTS8yVDZVYzJkaFJ0OXYrUCtRN29yZEtmTWhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1ODU2Nzc0Mjk6NTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWjBRTitLcUpNK3pncExVOUdUenJnNDM3U3RrNS8yc1l6V3BTeG5YOVN4VCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODQ4OTkyNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEQ3YifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    CAPTION : process.env.CAPTION || "CASEYRHODES-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    URL: process.env.URL || "https://files.catbox.moe/yedfbr.jpg",
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
