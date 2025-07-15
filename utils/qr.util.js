const QRCode = require('qrcode');

exports.generarQRBase64 = async (texto) => {
  try {
    return await QRCode.toDataURL(texto);
  } catch (error) {
    throw new Error('Error al generar QR');
  }
};
