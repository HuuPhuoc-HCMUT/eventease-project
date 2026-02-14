import express from "express";
import cors from "cors";
import verifyToken from "./middlewares/authMiddleware.js";
import { loginVerify } from "./modules/auth/auth.controller.js"; // Import controller

const app = express();
app.use(cors());
app.use(express.json());

// Route bây giờ trông rất gọn gàng
app.post("/api/auth/login-verify", verifyToken, loginVerify);

export default app;