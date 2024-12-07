const sql = require("mssql");

// Cấu hình kết nối SQL Server
const config = {
  user: "sa", // Tên tài khoản SQL Server (thường là "sa")
  password: "123123", // Mật khẩu
  server: "MSI\SQLEXPRESS", // Địa chỉ máy chủ SQL Server
  database: "DSKhachHang", // Tên cơ sở dữ liệu
  options: {
    encrypt: false, // Tắt mã hóa nếu sử dụng SQL Server cục bộ
    enableArithAbort: true,
  },
};

// Kết nối cơ sở dữ liệu
const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("Kết nối SQL Server thành công!");
  } catch (err) {
    console.error("Kết nối thất bại:", err.message);
  }
};

module.exports = { connectDB, sql };
