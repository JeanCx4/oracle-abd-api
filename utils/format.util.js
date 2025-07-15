exports.capitalizar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

exports.limpiarTexto = (str) => {
  return str.replace(/\s+/g, ' ').trim();
};
