// =============================
// IMPORTACIÓN DE LIBRERÍAS
// =============================
const { Client, LocalAuth } = require('whatsapp-web.js'); // Controla WhatsApp Web
const xlsx = require('xlsx'); // Permite leer archivos Excel
const qrcode = require('qrcode-terminal'); // Para mostrar el QR en consola

// =============================
// INICIALIZACIÓN DEL CLIENTE
// =============================
const client = new Client({
    authStrategy: new LocalAuth(), // Guarda la sesión para no escanear siempre
    puppeteer: {
        headless: true, // Muestra el navegador (poné true si querés ocultarlo)
    }
});

// Cuando el bot esté listo
client.on('ready', () => {
    async function mensajeConectado() {
        console.log('✅ Bot Conectado y Listo Para Trabajar!\n ');
        console.log("-------------------------------------------------------------------------------\n");
        await esperar(2000); // Espera 2 segundos
    }
    mensajeConectado();
    // Iniciar el envío de mensajes desde Excel
    enviarMensajesDesdeExcel().then(() => {
        process.exit(0); // Salir del proceso una vez terminado
    });
});

// Mostrar QR de WhatsApp Web
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Inicializar el bot
client.initialize();


// ========================================
// FUNCIÓN: Mostrar banner en consola
// ========================================
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

    await esperar(2000); // Espera 2 segundos para asegurar que el cliente esté listo
    console.log("📂 Leyendo archivo Excel...\n ");
    await esperar(4000); // Espera 4 segundos
    console.log("Lectura exitosa. Iniciando envíos...\n\n ");


    // Cargar archivo Excel
    const workbook = xlsx.readFile('./database/base.xlsx');

    // Leer la primera hoja del Excel
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convertir la hoja a JSON
    const datos = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Extraer solo los números (primera columna)
    const numeros = datos.map(row => row[0]).filter(n => n !== undefined);

    // Opciones de mensajes (personalizables)
    const mensajes = [
        "Buenas, ¿cómo estás? Te saluda *NovinhoDev* (Alexis). Soy *desarrollador web* y actualmente estoy buscando microempresas y negocios que quieran mejorar su presencia digital.\n\nEn este momento estoy ofreciendo *páginas web profesionales* a una cotización muy accesible, ya que estoy ampliando mi portafolio y deseo sumar nuevos trabajos de calidad.\n\nSi tenés alguna consulta, estaré encantado de ayudarte. También puedo mostrarte algunos ejemplos de sitios que desarrollé para que veas mi estilo de trabajo.\n\n*Mi sitio web:* [www.novinho.online]\n\nSi no deseas recibir este tipo de mensajes, por favor avisame y no volveré a contactarte. *Muchas gracias por tu tiempo.*",
        "Buenas, ¿qué tal? Te habla *NovinhoDev* (Alexis). Me dedico al *desarrollo web* y estoy buscando pequeños negocios o emprendedores que quieran dar el siguiente paso en el mundo digital.\n\nEstoy creando mi portafolio, por lo que estoy ofreciendo *sitios web profesionales* a un precio especial y muy accesible, manteniendo siempre la mejor calidad.\n\nSi te interesa, puedo responder cualquier consulta y mostrarte algunos proyectos que ya realicé para que conozcas mi forma de trabajar.\n\n*Podés ver más en mi página:* www.novinho.online\n\nSi no deseás recibir estos mensajes, solo avisame y no te volveré a contactar. *Gracias por tu tiempo.*",
        "Hola, ¿cómo va todo? Soy *NovinhoDev* (Alexis), *desarrollador web*. Actualmente estoy colaborando con microempresas y emprendedores que quieren fortalecer su imagen digital.\n\nEstoy ofreciendo *páginas web profesionales* a un costo reducido mientras amplío mi portafolio, buscando sumar trabajos reales y de calidad.\n\nSi tenés dudas, con gusto te respondo. También puedo mostrarte algunos ejemplos de sitios que ya realicé para que puedas evaluar mi estilo.\n\n*Mi web es:* www.novinho.online\n\nSi preferís no recibir este tipo de mensajes, indicámelo y no volveré a escribirte. *Agradezco mucho tu tiempo.*"
    ];

    // Recorrer cada número y enviar mensajes con espera
    for (let numero of numeros) {

        // WhatsApp requiere formato 123456789@c.us
        const chatId = `${numero}@c.us`;

        // Elegir un mensaje aleatorio
        const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];

        try {
            console.log(`📩 Enviando mensaje a ${numero}...`);
            await esperar(2000); // Espera 2 segundos antes de enviar
            await client.sendMessage(chatId, mensaje);
            console.log(` ⮑ ✅ Mensaje Enviado Correctamente\n `);

        } catch (error) {
            console.log(` ⮑ ❌ Número No Registrado En WhatsApp\n `);
        }

        // Esperar 30 segundos entre cada envío
        await esperar(40000);
    }

    console.log("------------------------------------")
    console.log("--  Finalizó el envío automático  --");
    console.log("------------------------------------")
}


// ========================================
// FUNCIÓN: Espera (delay)
// ========================================
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
