const rooms = [
    {
        id: 'single1',
        type: 'single',
        name: 'Phòng Đơn 101',
        price: 500000,
        image: 'images/phongdon.jpg',
        description: 'Phòng tiện nghi dành cho 1 người',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ']
    },
    {
        id: 'double1',
        type: 'double',
        name: 'Phòng Đôi 201',
        price: 800000,
        image: 'images/phongdoi.jpg',
        description: 'Không gian thoải mái cho 2 người',
        status: 'occupied',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bồn tắm']
    },
    {
        id: 'family1',
        type: 'family',
        name: 'Phòng Gia Đình 301',
        price: 1200000,
        image: 'images/phonggiadinh.jpg',
        description: 'Phòng rộng rãi cho cả gia đình',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bếp nhỏ', 'Bồn tắm']
    }
];

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
                <div class="price">${room.price.toLocaleString()}đ/đêm</div>
                <div class="room-bottom">
                    <div class="amenities">
                        ${room.amenities.map(amenity => `<span><i class="fas fa-check"></i> ${amenity}</span>`).join('')}
                    </div>
                    ${room.status === 'available' ? 
                        `<button onclick="openBookingModal('${room.id}')" class="book-btn">
                            <i class="fas fa-calendar-check"></i> Đặt ngay
                        </button>` : 
                        '<button class="book-btn booked" disabled>Đã đặt</button>'
                    }
                </div>
            </div>
        `;
        roomList.appendChild(roomCard);
    });
}

function filterRooms(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn[onclick*="${category}"]`).classList.add('active');
    
    if (category === 'all') {
        displayRooms();
    } else {
        const filteredRooms = rooms.filter(room => room.type === category);
        displayRooms(filteredRooms);
    }
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayRooms();
});