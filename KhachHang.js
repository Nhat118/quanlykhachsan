// Mảng lưu trữ thông tin khách hàng
let customers = [];
function saveCustomerInfo(customers) {
    const jsonData = JSON.stringify(customers, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.json'; // Tên file lưu
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
class KhachHang {
    constructor(maKH, hoTen, cccd, sdt, diaChi, ngayDatPhong, ngayTraPhong) {
        this._maKH = maKH; // Mã khách hàng
        this._hoTen = hoTen; // Họ tên khách hàng
        this._cccd = cccd; // Căn cước công dân
        this._sdt = sdt; // Số điện thoại
        this._diaChi = diaChi; // Địa chỉ
        this._ngayDatPhong = ngayDatPhong; // Ngày đặt phòng
        this._ngayTraPhong = ngayTraPhong; // Ngày trả phòng
    }

    themKH() {
        // Thêm khách hàng mới vào cơ sở dữ liệu
    }

    suaKH() {
        // Sửa thông tin khách hàng
    }

    xoaKH() {
        // Xóa thông tin khách hàng
    }

    timKiemKH() {
        // Tìm kiếm khách hàng
    }
}