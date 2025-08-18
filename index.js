const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');

// Flag to control bot features
let botActive = false;

async function startBot() {
    // Use multi-file auth to save session in ./auth
    const { state, saveCreds } = await useMultiFileAuthState('./auth');

    const sock = makeWASocket({
        auth: state,
        browser: ["PinoBot", "Chrome", "1.0.0"]
    });

    // Save credentials on update
    sock.ev.on('creds.update', saveCreds);

    // Connection updates
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            qrcode.generate(qr, { small: true }); // Show QR in terminal
        }

        if (connection === 'close') {
            const errorCode = lastDisconnect?.error ? new Boom(lastDisconnect.error) : null;
            const shouldReconnect = errorCode?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('Connection closed. Reconnecting:', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ Bot connected successfully!');
        }
    });

    // Message handling
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;
        const sender = m.key.remoteJid;

        const text = m.message.conversation?.toLowerCase();
        console.log(`📩 New message from ${sender}: ${text}`);

        // Commands to start/stop bot features
        if (text === 'start bot') {
            await sock.sendMessage(sender, { text: '✅ Bot is now active! Send "stop bot" to pause features.' });
            botActive = true;
        } else if (text === 'stop bot') {
            await sock.sendMessage(sender, { text: '🛑 Bot features paused. Send "start bot" to resume.' });
            botActive = false;
        } 
        // Respond only if bot is active
        else if (botActive) {
            if (text === 'hi') {
                await sock.sendMessage(sender, { text: 'Hello 👋, I am your Pino Bot!' });
            }
            // Add more commands here if needed
        }
    });
}

// Start the bot
startBot();
