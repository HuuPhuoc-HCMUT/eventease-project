import app from './app.js'; // Nhớ phải có đuôi .js
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});