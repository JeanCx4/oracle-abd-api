const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear directorio si no existe
const uploadsDir = 'uploads/fotos';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Carpeta donde se guardarán los archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/fotos');
  },
  filename: function (req, file, cb) {
    const nombreUnico = `${Date.now()}-${file.originalname}`;
    cb(null, nombreUnico);
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = function (req, file, cb) {
  const tiposPermitidos = /jpeg|jpg|png/;
  const extension = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  const mimetype = tiposPermitidos.test(file.mimetype);

  if (extension && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos .jpeg, .jpg o .png'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB máx.
  fileFilter: fileFilter
});

module.exports = upload;
