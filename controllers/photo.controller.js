exports.subirFoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ninguna imagen' });
  }

  const ruta = req.file.path;
  res.status(200).json({ mensaje: 'Imagen subida correctamente', ruta });
};
