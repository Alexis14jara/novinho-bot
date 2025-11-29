// =============================
// IMPORTACIÓN DE LIBRERÍAS
// =============================
const { Client, LocalAuth } = require('whatsapp-web.js');
const xlsx = require('xlsx');
const qrcode = require('qrcode-terminal');
const dns = require('dns'); // 🔥 NUEVO

// Función para verificar conexión a internet (simple y eficaz) 🔥 NUEVO
function hayInternet() {
    return new Promise(resolve => {
        dns.lookup("google.com", err => resolve(!err));
    });
}

// Control de spam de errores 🔥 NUEVO
let ultimoError = 0;
function logErrorControlado(msg) {
    const ahora = Date.now();
    if (ahora - ultimoError > 2000) {
        console.log(msg);
        ultimoError = ahora;
    }
}

// =============================
// INICIALIZACIÓN DEL CLIENTE
// =============================
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
    }
});

// 🔥 NUEVO — Manejo de desconexión
client.on("disconnected", (reason) => {
    logErrorControlado("❌ Cliente desconectado: " + reason);
    console.log("🔄 Intentando reconectar...");
    client.initialize();
});

// 🔥 NUEVO — Manejo de error WebSocket
client.on("ws_error", (err) => {
    logErrorControlado("⚠️ Error de WebSocket. Reconectando...");
});

// 🔥 NUEVO — Manejar errores generales
client.on("auth_failure", () => {
    logErrorControlado("❌ Fallo de autenticación. Reiniciando...");
    process.exit(1); 
});

// Cuando el bot esté listo
client.on('ready', () => {
    async function mensajeConectado() {
        console.log('✅ Bot Conectado y Listo Para Trabajar!\n ');
        console.log("-------------------------------------------------------------------------------\n");
        await esperar(2000);
    }
    mensajeConectado();
    enviarMensajesDesdeExcel().then(() => {
        process.exit(0);
    });
});

// Mostrar QR
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Inicializar bot
client.initialize();

// =============================
// BANNER
// =============================
console.clear();

const banner = `
███╗   ██╗ ██████╗ ██╗   ██╗██╗███╗   ██╗██╗  ██╗ ██████╗     ██████╗  ██████╗ ████████╗
████╗  ██║██╔═══██╗██║   ██║██║████╗  ██║██║  ██║██╔═══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
██╔██╗ ██║██║   ██║██║   ██║██║██╔██╗ ██║███████║██║   ██║    ██████╔╝██║   ██║   ██║   
██║╚██╗██║██║   ██║╚██╗ ██╔╝██║██║╚██╗██║██╔══██║██║   ██║    ██╔══██╗██║   ██║   ██║   
██║ ╚████║╚██████╔╝ ╚████╔╝ ██║██║ ╚████║██║  ██║╚██████╔╝    ██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝     ╚═════╝  ╚═════╝    ╚═╝   
`;
console.log(banner);
console.log("        ⚠️ Bot automatizado Novinho Bot v1.0");
console.log("         ©️ Desarrollado por NovinhoDev\n");
console.log("-------------------------------------------------------------------------------\n");
console.log("Conectando...");


// ========================================
// FUNCIÓN: Leer Excel y enviar mensajes
// ========================================
async function enviarMensajesDesdeExcel() {

    await esperar(4000);
    console.log("📂 Leyendo archivo Excel...\n ");
    await esperar(4000);
    console.log("Lectura exitosa. Iniciando envíos...\n\n ");
    await esperar(2000);

    const workbook = xlsx.readFile('./database/base.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const datos = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const numeros = datos.map(row => row[0]).filter(n => n !== undefined);

    const mensajes = [
        "Buenas, ¿cómo estás? Te saluda *NovinhoDev* (Alexis)...",
        "Buenas, ¿qué tal? Te habla *NovinhoDev* (Alexis)...",
        "Hola, ¿cómo va todo? Soy *NovinhoDev* (Alexis)..."
    ];

    for (let numero of numeros) {

        // 🔥 NUEVO — Verificar conexión antes de enviar
        while (!(await hayInternet())) {
            logErrorControlado("🌐 Sin internet. Esperando reconexión...");
            await esperar(2000);
        }

        const chatId = `${numero}@c.us`;
        const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];

        try {
            console.log(`📩 Enviando mensaje a ${numero}...`);
            await esperar(2000);
            await client.sendMessage(chatId, mensaje);
            console.log(` ⮑ ✅ Mensaje Enviado Correctamente\n `);
        } catch (error) {
            console.log(` ⮑ ❌ Número No Registrado En WhatsApp\n `);
        }

        await cuentaRegresiva(40);
    }

    console.log("------------------------------------")
    console.log("--  Finalizó el envío automático  --");
    console.log("------------------------------------")
}


// ========================================
// FUNCIÓN: Espera
// ========================================
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// ========================================
// FUNCIÓN: Cuenta Regresiva
// ========================================
async function cuentaRegresiva(segundos) {
    return new Promise(resolve => {
        let tiempo = segundos;

        const intervalo = setInterval(() => {
            process.stdout.write(`⏳ Siguiente mensaje en: ${tiempo}s   \r`);
            tiempo--;

            if (tiempo < 0) {
                clearInterval(intervalo);
                process.stdout.write("\n");
                resolve();
            }
        }, 1000);
    });
}
