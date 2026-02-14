import admin from "firebase-admin";
// Với ES6, việc import file JSON cần có thêm flag 'assert' hoặc đọc thủ công
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("../../secrets/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;