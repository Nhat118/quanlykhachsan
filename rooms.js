// Mảng lưu trữ danh sách phòng
let rooms = [];

// Dữ liệu phòng ban đầu
const initialRooms = [
    {
        MaPhong: 'P1',
        SoPhong: '101',
        MaLoaiPhong: 'single',
        TinhTrangPhong: 'Trống',
        GiaPhong: 500000,
        GhiChu: 'Phòng đơn thoáng mát',
        TienIch: 'Wifi, TV'
    },
    {
        MaPhong: 'P2',
        SoPhong: '102',
        MaLoaiPhong: 'double',
        TinhTrangPhong: 'Trống',
        GiaPhong: 800000,
        GhiChu: 'Phòng đôi sang trọng',
        TienIch: 'Wifi, TV, Điều hòa'
    }
];

// Hàm lưu vào localStorage
function saveRoomsToStorage() {
    localStorage.setItem('hotelRooms', JSON.stringify(rooms));
}

// Hàm load từ localStorage
function loadRoomsFromStorage() {
    const savedRooms = localStorage.getItem('hotelRooms');
    if (savedRooms) {
        rooms = JSON.parse(savedRooms);
    } else {
        // Nếu không có dữ liệu trong localStorage, khởi tạo với dữ liệu ban đầu
        rooms = initialRooms;
        saveRoomsToStorage(); // Lưu dữ liệu ban đầu vào localStorage
    }
}

// Hàm thêm phòng
function addRoom(newRoom) {
    rooms.push(newRoom);
    saveRoomsToStorage();
}

// Hàm hiển thị danh sách phòng
function renderRooms() {
    const roomContainer = document.querySelector('.room-container');
    if (!roomContainer) return;

    roomContainer.innerHTML = rooms.map(room => `
        <div class="room-card" data-id="${room.MaPhong}">
            <div class="room-info">
                <h3>Phòng ${room.SoPhong}</h3>
                <p>Loại: ${room.MaLoaiPhong === 'single' ? 'Phòng đơn' : 
                          room.MaLoaiPhong === 'double' ? 'Phòng đôi' : 'Phòng gia đình'}</p>
                <p>Giá: ${room.GiaPhong.toLocaleString('vi-VN')} VNĐ</p>
                <p>Trạng thái: ${room.TinhTrangPhong}</p>
                <p>Tiện ích: ${room.TienIch || 'Không có'}</p>
            </div>
            <div class="room-actions">
                <button onclick="bookRoom('${room.MaPhong}')" 
                        ${room.TinhTrangPhong !== 'Trống' ? 'disabled' : ''}>
                    Đặt phòng
                </button>
            </div>
        </div>
    `).join('');
}

// Load dữ liệu khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    loadRoomsFromStorage();
    renderRooms();
}); 