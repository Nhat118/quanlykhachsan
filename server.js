const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối SQL Server
const config = {
    user: 'sa',
    password: '123123',
    server: 'MSI\\SQLEXPRESS',
    database: 'DSKhachHang',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// API đăng nhập
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Kết nối đến database
        await sql.connect(config);
        
        // Kiểm tra email trong database
        const result = await sql.query`
            SELECT * FROM Users 
            WHERE email = ${email}
        `;

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ error: 'Email không tồn tại!' });
        }

        // Kiểm tra mật khẩu
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Mật khẩu không đúng!' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'your_jwt_secret_key',
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Đăng nhập thành công!',
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Lỗi server!' });
    } finally {
        sql.close();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});