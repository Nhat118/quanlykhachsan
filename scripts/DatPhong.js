// Dữ liệu phòng
const rooms = [
    {
        id: '101',
        type: 'Phòng Đơn',
        name: 'Phòng Đơn 101',
        price: 500000,
        image: 'images/phongdon.jpg',
        description: 'Phòng tiện nghi dành cho 1 người',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ']
    },
    {
        id: '102',
        type: 'Phòng Đơn',
        name: 'Phòng Đơn 102',
        price: 550000,
        image: 'images/phongdon2.jpg',
        description: 'Phòng đơn ấm cúng với cửa sổ lớn',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ']
    },
    {
        id: '103',
        type: 'Phòng Đơn',
        name: 'Phòng Đơn 103',
        price: 600000,
        image: 'images/phongdon3.jpg',
        description: 'Phòng đơn với nội thất hiện đại',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ']
    },
    {
        id: '201',
        type: 'Phòng Đôi',
        name: 'Phòng Đôi 201',
        price: 800000,
        image: 'images/phongdoi.jpg',
        description: 'Không gian thoải mái cho 2 người',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bồn tắm']
    },
    {
        id: '202',
        type: 'Phòng Đôi',
        name: 'Phòng Đôi 202',
        price: 850000,
        image: 'images/phongdoi2.jpg',
        description: 'Phòng đôi sang trọng với tầm nhìn đẹp',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bồn tắm']
    },
    {
        id: '203',
        type: 'Phòng Đôi',
        name: 'Phòng Đôi 203',
        price: 900000,
        image: 'images/phongdoi3.jpg',
        description: 'Phòng đôi với thiết kế hiện đại',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bồn tắm']
    },
    {
        id: '301',
        type: 'Phòng Gia Đình',
        name: 'Phòng Gia Đình 301',
        price: 1200000,
        image: 'images/phonggiadinh.jpg',
        description: 'Phòng rộng rãi cho cả gia đình',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bếp nhỏ', 'Bồn tắm']
    },
    {
        id: '302',
        type: 'Phòng Gia Đình',
        name: 'Phòng Gia Đình 302',
        price: 1300000,
        image: 'images/phonggiadinh2.jpg',
        description: 'Phòng gia đình với không gian thoáng đãng',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bếp nhỏ', 'Bồn tắm']
    },
    {
        id: '303',
        type: 'Phòng Gia Đình',
        name: 'Phòng Gia Đình 303',
        price: 1400000,
        image: 'images/phonggiadinh3.jpg',
        description: 'Phòng gia đình với nội thất sang trọng',
        status: 'available',
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ', 'Ban công', 'Bếp nhỏ', 'Bồn tắm']
    }
];

// Cập nhật tên cho tất cả các phòng
rooms.forEach(room => {
    room.name = `${room.type.charAt(0).toUpperCase() + room.type.slice(1)} ${room.id}`; // Định dạng tên phòng
});

// Kiểm tra trạng thái đăng nhập từ localStorage
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Hàm hiển thị nút Đăng xuất hoặc Đăng nhập
function updateAuthLink() {
    const authLink = document.getElementById('authLink');
    if (isLoggedIn) {
        authLink.innerHTML = '<a href="#" onclick="logout()">Đăng Xuất</a>';
    } else {
        authLink.innerHTML = '<a href="DangNhap.html">Đăng Nhập</a>';
    }
}

// Hàm đăng xuất
function logout() {
    isLoggedIn = false; // Đặt lại trạng thái đăng nhập
    localStorage.setItem('isLoggedIn', 'false'); // Cập nhật localStorage
    updateAuthLink(); // Cập nhật lại liên kết
}

// Hàm đăng nhập (giả lập)
function login() {
    isLoggedIn = true; // Đặt trạng thái đăng nhập thành true
    localStorage.setItem('isLoggedIn', 'true'); // Cập nhật localStorage
    updateAuthLink(); // Cập nhật lại liên kết
}

// Hàm hiển thị danh sách phòng
function renderRooms(roomsToRender = rooms) {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';

    roomsToRender.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.className = 'room-card';
        roomElement.innerHTML = `
            <div class="room-image">
                <img src="${room.image}" alt="${room.type} ${room.id}">
                <div class="status-badge ${room.status}">
                    ${room.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                </div>
            </div>
            <div class="room-info">
                <h3>${room.type} ${room.id}</h3>
                <p class="description">${room.description}</p>
                <p class="price">${room.price.toLocaleString('vi-VN')} VNĐ/đêm</p>
                <div class="amenities">
                    ${room.amenities.map(amenity => `<span>${amenity}</span>`).join('')}
                </div>
                <button class="book-btn" onclick="bookRoom('${room.id}')" ${room.status === 'occupied' ? 'disabled' : ''}>
                    <i class="fas fa-calendar-check"></i>
                    ${room.status === 'available' ? 'Đặt phòng' : 'Đã đặt'}
                </button>
            </div>
        `;
        roomList.appendChild(roomElement);
    });
}

// Hàm hiển thị form đặt phòng
function bookRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room || room.status === 'occupied') {
        alert('Phòng không khả dụng.');
        return;
    }

    // Hiển thị modal
    const bookingModal = document.getElementById('bookingModal');
    bookingModal.style.display = 'block'; // Hiển thị modal

    // Lắng nghe sự kiện submit của form
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.onsubmit = function(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form

        const customerInfo = {
            name: document.getElementById('customerName').value,
            gender: document.getElementById('customerGender').value,
            birthYear: document.getElementById('customerBirthYear').value,
            phone: document.getElementById('customerPhone').value,
            nationality: document.getElementById('customerNationality').value,
            idCard: document.getElementById('customerIdCard').value,
            rentalPeriod: document.getElementById('rentalPeriod').value,
        };

        // Xác nhận thông tin
        if (confirm('Bạn có chắc chắn muốn đặt phòng không?')) {
            room.status = 'occupied'; // Cập nhật trạng thái phòng
            alert('Đặt phòng thành công!');

            // Lưu thông tin khách hàng vào mảng
            customers.push(customerInfo);

            // Gọi hàm lưu thông tin khách hàng vào file
            saveCustomerInfo(customers);

            bookingModal.style.display = 'none'; // Ẩn modal
            renderRooms(); // Cập nhật danh sách phòng
        }
    };
}

// Hàm để đóng modal
function closeModal() {
    const bookingModal = document.getElementById('bookingModal');
    bookingModal.style.display = 'none'; // Ẩn modal
}

// Hàm hủy đặt phòng
function cancelBooking(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room || room.status === 'available') {
        alert('Phòng không có khách thuê.');
        return;
    }

    // Xác nhận hủy đặt phòng
    if (confirm('Bạn có chắc chắn muốn hủy đặt phòng không?')) {
        room.status = 'available'; // Cập nhật trạng thái phòng
        alert('Hủy đặt phòng thành công!');
        renderRooms(); // Cập nhật danh sách phòng
    }
}

// Hàm tìm kiếm phòng
function searchRooms(criteria) {
    const filteredRooms = rooms.filter(room => {
        return (criteria.type ? room.type === criteria.type : true) &&
               (criteria.price ? room.price <= criteria.price : true) &&
               (criteria.status ? room.status === criteria.status : true);
    });

    renderRooms(filteredRooms);
}

// Gọi hàm tìm kiếm khi người dùng nhấn nút tìm kiếm
document.getElementById('searchButton').onclick = function() {
    const criteria = {
        type: document.getElementById('roomType').value,
        price: parseInt(document.getElementById('roomPrice').value),
        status: document.getElementById('roomStatus').value,
    };
    searchRooms(criteria);
};

// Hàm thêm phòng
function addRoom(newRoom) {
    const existingRoom = rooms.find(r => r.id === newRoom.id);
    if (existingRoom) {
        alert('Phòng đã tồn tại.');
        return;
    }

    // Gán tên phòng theo định dạng "Loại phòng + ID"
    newRoom.name = `${newRoom.type} ${newRoom.id}`;

    rooms.push(newRoom); // Thêm phòng mới vào danh sách
    alert('Thêm phòng thành công!');

    // Lưu danh sách phòng vào file
    saveRoomsToFile(); // Gọi hàm lưu danh sách phòng

    renderRooms(); // Cập nhật danh sách phòng
}

// Hàm lưu danh sách phòng vào file
function saveRoomsToFile() {
    const jsonData = JSON.stringify(rooms, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rooms.json'; // Tên file lưu
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Xử lý sự kiện khi nhấn nút thêm phòng
document.getElementById('addRoomButton').onclick = function() {
    const roomId = document.getElementById('newRoomId').value.trim();
    const roomType = document.getElementById('newRoomType').value; // Lấy giá trị từ select
    const roomPrice = document.getElementById('newRoomPrice').value.trim();
    const roomDescription = document.getElementById('newRoomDescription').value.trim(); // Lấy mô tả phòng
    const roomAmenities = document.getElementById('newRoomAmenities').value.trim();
    const roomImageInput = document.getElementById('newRoomImage'); // Lấy input file

    // Kiểm tra xem tất cả thông tin đã được nhập chưa
    if (!roomId || !roomType || !roomPrice || !roomDescription || !roomAmenities || roomImageInput.files.length === 0) {
        alert('Vui lòng nhập đầy đủ thông tin phòng.');
        return; // Ngăn không cho thêm phòng nếu thông tin chưa đầy đủ
    }

    // Lấy link ảnh từ input file
    const roomImage = URL.createObjectURL(roomImageInput.files[0]); // Tạo URL cho ảnh

    // Thêm phòng vào danh sách
    const newRoom = {
        id: roomId,
        type: roomType,
        name: `${roomType} ${roomId}`, // Gán tên phòng theo định dạng "Loại phòng + ID"
        price: parseInt(roomPrice),
        description: roomDescription, // Gán mô tả phòng
        amenities: roomAmenities.split(',').map(item => item.trim()), // Chia nhỏ tiện nghi
        image: roomImage, // Link ảnh
        status: 'available' // Mặc định là còn trống
    };

    addRoom(newRoom); // Gọi hàm thêm phòng
};

// Hàm xóa phòng
function deleteRoom(roomId) {
    const roomIndex = rooms.findIndex(r => r.id === roomId);
    if (roomIndex === -1 || rooms[roomIndex].status === 'occupied') {
        alert('Không thể xóa phòng đang có khách thuê.');
        return;
    }

    // Xác nhận xóa phòng
    if (confirm('Bạn có chắc chắn muốn xóa phòng không?')) {
        rooms.splice(roomIndex, 1); // Xóa phòng khỏi danh sách
        alert('Xóa phòng thành công!');
        renderRooms(); // Cập nhật danh sách phòng
    }
}

// Hàm hiển thị form thêm phòng
document.getElementById('showAddRoomForm').onclick = function() {
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để sử dụng chức năng này.');
        return;
    }
    const addRoomForm = document.getElementById('addRoomForm');
    addRoomForm.style.display = addRoomForm.style.display === 'none' ? 'block' : 'none';
};

// Hàm hiển thị form xóa phòng
document.getElementById('showDeleteRoomForm').onclick = function() {
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để sử dụng chức năng này.');
        return;
    }
    const deleteRoomForm = document.getElementById('deleteRoomForm');
    deleteRoomForm.style.display = deleteRoomForm.style.display === 'none' ? 'block' : 'none';
};

// Hiển thị form sửa phòng
document.getElementById('showEditRoomForm').onclick = function() {
    document.getElementById('editRoomForm').style.display = 'block';
};

// Cập nhật phòng
document.getElementById('editRoomButton').onclick = function() {
    const roomId = document.getElementById('editRoomId').value; // Lấy ID phòng từ input
    const roomType = document.getElementById('editRoomType').value; // Lấy loại phòng từ select
    const roomPrice = document.getElementById('editRoomPrice').value; // Lấy giá phòng
    const roomDescription = document.getElementById('editRoomDescription').value; // Lấy mô tả phòng
    const roomAmenities = document.getElementById('editRoomAmenities').value; // Lấy tiện nghi

    // Tìm phòng trong danh sách và cập nhật thông tin
    const room = rooms.find(r => r.id === roomId); // Tìm phòng theo ID
    if (room) {
        // Cập nhật các thuộc tính của phòng
        room.type = roomType; // Cập nhật loại phòng
        room.price = parseInt(roomPrice); // Cập nhật giá phòng
        room.description = roomDescription; // Cập nhật mô tả phòng
        room.amenities = roomAmenities.split(',').map(item => item.trim()); // Cập nhật tiện nghi
        
        // Cập nhật tên phòng theo định dạng mới
        room.name = `${room.type} ${room.id}`; // Đảm bảo tên phòng là "Loại phòng + ID"
        alert('Cập nhật phòng thành công!');
        
        // Gọi hàm renderRooms để cập nhật giao diện
        renderRooms(); // Cập nhật danh sách phòng
    } else {
        alert('Không tìm thấy phòng với số phòng đã nhập.'); // Thông báo lỗi
    }

    // Reset form
    document.getElementById('editRoomForm').reset();
    document.getElementById('editRoomForm').style.display = 'none'; // Ẩn form sau khi cập nhật
};

// Hiển thị form chuyển phòng
document.getElementById('showTransferRoomForm').onclick = function() {
    document.getElementById('transferRoomForm').style.display = 'block';
};

// Chuyển phòng
document.getElementById('transferRoomButton').onclick = function() {
    const currentRoomId = document.getElementById('transferRoomId').value.trim(); // ID phòng hiện tại
    const newRoomId = document.getElementById('newRoomId').value.trim(); // ID phòng mới

    // Kiểm tra xem ID phòng hiện tại và phòng mới có được nhập không
    if (!currentRoomId || !newRoomId) {
        alert('Vui lòng nhập đầy đủ thông tin phòng.');
        return;
    }

    // Tìm phòng hiện tại và phòng mới
    const currentRoom = rooms.find(r => r.id === currentRoomId);
    const newRoom = rooms.find(r => r.id === newRoomId);

    // Kiểm tra xem phòng hiện tại có tồn tại không
    if (!currentRoom) {
        alert('Không tìm thấy phòng hiện tại.');
        return;
    }

    // Kiểm tra xem phòng mới có tồn tại không
    if (!newRoom) {
        alert('Không tìm thấy phòng mới.');
        return;
    }

    // Bước 5: Kiểm tra tình trạng của phòng mới
    if (newRoom.status !== 'available') {
        alert('Phòng không khả dụng. Vui lòng chọn phòng khác để chuyển đến.');
        return;
    }

    // Bước 6: Cập nhật thông tin chuyển phòng cho khách hàng
    currentRoom.status = 'available'; // Đặt lại trạng thái phòng hiện tại
    newRoom.status = 'occupied'; // Đặt trạng thái phòng mới thành đã đặt

    // Cập nhật tên phòng mới
    newRoom.name = `${newRoom.type} ${newRoom.id}`; // Gán lại tên phòng mới

    alert('Chuyển phòng thành công!'); // Bước 7: Hiển thị thông báo thành công

    // Reset form
    document.getElementById('transferRoomForm').reset();
    document.getElementById('transferRoomForm').style.display = 'none'; // Ẩn form sau khi chuyển
    renderRooms(); // Cập nhật danh sách phòng
};

// Gọi hàm renderRooms khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    renderRooms(); // Hiển thị danh sách phòng ngay khi tải trang
    updateAuthLink(); // Cập nhật liên kết đăng nhập
});
// Hàm định dạng giá

function saveCustomerInfo(customer) {
    // Thêm khách hàng vào mảng customers
    customers.push(customer);

    // Chuyển đổi mảng khách hàng thành chuỗi JSON
    const jsonData = JSON.stringify(customers, null, 2);

    // Lưu vào file (giả lập, vì JavaScript trên trình duyệt không thể ghi file trực tiếp)
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

