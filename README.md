
# Novinho Bot

**Novinho Bot** es un asistente automatizado diseñado para enviar mensajes personalizados a clientes de forma **segura**, **ordenada** y **sin necesidad de interacción manual**. Está pensado para emprendedores, microempresas y negocios que buscan mejorar la comunicación con sus clientes y optimizar procesos de atención sin complicaciones.

El bot utiliza **whatsapp-web.js**, permitiendo automatizar envíos, registrar números, personalizar mensajes y trabajar con archivos **Excel/CSV** para manejar bases de datos de contactos. Todo esto manteniendo una estructura simple, estable y fácil de escalar.


## Características principales 👌

🔹 **Mensajería automática y personalizada**

**Novinho Bot** puede enviar mensajes a una lista de contactos, **eligiendo textos al azar** de múltiples opciones para evitar repetición y sonar más natural.

🔹 **Integración con Excel**

Podés cargar listas de números desde archivos **Excel** y el bot procesará cada contacto: 
- Lectura de números automáticamente
- Validación de formato
- Envío individual mensaje por mensaje
- Registro de números procesados

🔹 **Control de spam y seguridad**

Incluye **límites** y **retrasos** entre envíos para **evitar bloqueos** por parte de WhatsApp.
Se puede configurar un delay entre mensajes (def. 40 segundos).

🔹 **Detección de números no válidos**

Si un número no existe en WhatsApp o no acepta mensajes, el bot **no se detiene:**
simplemente lo salta y continúa con la lista.

🔹 **Código totalmente comentado**

El proyecto está pensado para **aprender y expandirlo**. Todas las funciones vienen con explicaciones detalladas para entender su funcionamiento.


## Tecnologías utilizadas ⚙️

- **Node.js**
- **whatsapp-web.js**
- **xlsx**
- **fs/path** para manejo de archivos
- **qrcode-terminal** para la autenticación
## Requisitos previos 📜

Asegurate de tener instalado:

- **Node.js** (v16 o superior)
// Descarga desde: https://nodejs.org
- **Git** (opcional, para clonar el repositorio)
- **Una terminal** (CMD, PowerShell, Bash, etc.)


## Instalación 🪄

Antes de ejecutar el programa asegurate de haber visto la parte de como usarlo. \
ABRE UN CMD Y EJECUTA:

```bash
  // CLONA EL REPOSITORIO
  git clone https://github.com/tuusuario/novinho-bot.git

  // INGRESA A LA CARPETA
  cd novinho-bot

  // INSTALA LAS DEPENDENCIAS
  npm install

  // EJECUTA EL PROGRAMA (MODIFICAR ANTES)
  node main.js
```


## Utilización

Agrega los números de telefonos con su prefijo en la primera columna.
**Ejemplo:**

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

**Modifica los tres mensajes predeterminados.** Agrega más si consideras necesario.\
Separa por "," cada mensaje:

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

Ejecuta, escanea el código que aparece en términal desde WhatsApp y empezará a trabajar. El proceso de escaneo de qr solo es la primera vez.
## Support

Para soporte, gmail alnexstudio.dev@gmail.com o mi instagram buscando: @NovinhoDev
