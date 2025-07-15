const bcrypt = require('bcryptjs');

(async () => {
  const hash = await bcrypt.hash('aaron159', 10);
  console.log('🔐 Hash generado:', hash);
})();
