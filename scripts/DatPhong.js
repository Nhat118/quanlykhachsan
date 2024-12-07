// Dữ liệu phòng
const rooms = [
    {
        id: 'single1',
        type: 'single',
        name: 'Phòng Đơn 101',
        price: 500000,
        image: 'images/phongdon.jpg',
        description: 'Phòng tiện nghi dành cho 1 người',
        status: 'available',
        amenities: ['Wifi', 'TV', 'Điều hòa', 'Phòng tắm riêng']
    },
    {
        id: 'single2',
        type: 'single',
        name: 'Phòng Đơn 102',
        price: 500000,
        image: 'images/phongdon2.jpg',
        description: 'Phòng tiện nghi dành cho 1 người',
        status: 'booked',
        amenities: ['Wifi', 'TV', 'Điều hòa', 'Phòng tắm riêng']
    },
    {
        id: 'double1',
        type: 'double',
        name: 'Phòng Đôi 201',
        price: 800000,
        image: 'images/phongdoi.jpg',
        description: 'Không gian thoải mái cho 2 người',
        status: 'available',
        amenities: ['Wifi', 'TV', 'Điều hòa', 'Phòng tắm riêng', 'Ban công']
    },
    {
        id: 'family',
        type: 'family',
        name: 'Phòng gia đình 301',
        price: 500000,
        image: 'images/phonggiadinh.jpg',
        description: 'Phòng tiện nghi dành cho gia đình',
        status: 'booked',
        amenities: ['Wifi', 'TV', 'Điều hòa', 'Phòng tắm riêng', 'Ban công']
    }
];

// Hiển thị danh sách phòng
function displayRooms(roomsToShow = rooms) {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';

    roomsToShow.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = `room-card ${room.status}`;
        roomCard.innerHTML = `
            <div class="room-image">
                <img src="${room.image}" alt="${room.name}">
                <div class="status-badge ${room.status}">
                    ${room.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                </div>
            </div>
            <div class="room-info">
                <h3>${room.name}</h3>
                <p class="description">${room.description}</p>
                <div class="amenities">
                    ${room.amenities.map(amenity => `<span><i class="fas fa-check"></i> ${amenity}</span>`).join('')}
                </div>
                <div class="price">${room.price.toLocaleString()}đ/đêm</div>
                ${room.status === 'available' ? 
                    `<button onclick="openBookingModal('${room.id}')" class="book-btn">
                        <i class="fas fa-calendar-check"></i> Đặt ngay
                    </button>` : 
                    '<button class="book-btn booked" disabled>Đã đặt</button>'
                }
            </div>
        `;
        roomList.appendChild(roomCard);
    });
}

// Lọc phòng theo loại
function filterRooms(category) {
    // Xóa class active từ tất cả các nút
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Thêm class active cho nút được click
    const activeButton = document.querySelector(`.filter-btn[onclick*="${category}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Lọc và hiển thị phòng
    if (category === 'all') {
        displayRooms();
    } else {
        const filteredRooms = rooms.filter(room => room.type === category);
        displayRooms(filteredRooms);
    }
}

// Thêm hàm kiểm tra đăng nhập
function checkLogin() {
    // Kiểm tra xem đã đăng nhập chưa (có thể lưu trong localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
}

// Mở modal đặt phòng
function openBookingModal(roomId) {
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        localStorage.setItem('pendingBookingRoom', roomId);
        window.location.href = 'DangNhap.html';
        return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    const modal = document.getElementById('bookingModal');
    const roomTypeInput = document.getElementById('roomType');
    const priceDisplay = document.getElementById('totalPrice');

    roomTypeInput.value = room.name;
    priceDisplay.textContent = `${room.price.toLocaleString()}đ/đêm`;
    
    // Lưu giá phòng vào data attribute
    modal.dataset.roomPrice = room.price;
    
    modal.style.display = 'block';

    // Set ngày mặc định
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayRooms();

    // Kiểm tra nếu có phòng đang chờ đặt sau khi đăng nhập
    const pendingBookingRoom = localStorage.getItem('pendingBookingRoom');
    if (pendingBookingRoom && checkLogin()) {
        openBookingModal(pendingBookingRoom);
        localStorage.removeItem('pendingBookingRoom');
    }

    // Đóng modal
    document.querySelector('.close').onclick = function() {
        document.getElementById('bookingModal').style.display = 'none';
    }

    window.onclick = function(event) {
        const modal = document.getElementById('bookingModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Xử lý form đặt phòng
    document.getElementById('bookingForm').onsubmit = function(e) {
        e.preventDefault();
        alert('Đặt phòng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        document.getElementById('bookingModal').style.display = 'none';
    }
}); 