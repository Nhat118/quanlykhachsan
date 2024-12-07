CREATE TABLE KhachHang (
    ID INT IDENTITY(1,1) PRIMARY KEY, -- ID tự tăng
    FullName NVARCHAR(255) NOT NULL,  -- Họ và tên
    Email NVARCHAR(255) UNIQUE NOT NULL, -- Email (phải duy nhất)
    Password NVARCHAR(MAX) NOT NULL,  -- Mật khẩu đã mã hóa
    CreatedAt DATETIME DEFAULT GETDATE() -- Thời gian đăng ký
);
select * from KhachHang