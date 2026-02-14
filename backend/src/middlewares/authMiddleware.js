import admin from "../config/firebaseAdmin.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy Token!" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 
    next();
  } catch (error) {
    console.error("Lỗi xác thực Token:", error);
    res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

export default verifyToken;