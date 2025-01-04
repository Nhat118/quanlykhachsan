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
        amenities: ['Wifi miễn phí', 'TV màn hình phẳng', 'Điều hòa nhiệt độ']
    },
    {
        id: 'double1',
        type: 'double',
        name: 'Phòng Đôi 201',
        price: 800000,
        image: 'images/phongdoi.jpg',
        description: 'Không gian thoải mái cho 2 người',
        status: 'available',
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

let isEditing = false;
let hasUnsavedChanges = false;

// Hiển thị danh sách phòng
function renderRooms(roomsToRender = rooms) {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';
    
    roomsToRender.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.className = `room-card ${room.status}`;
        roomElement.dataset.id = room.id;
        roomElement.innerHTML = `
            <div class="room-image">
                <img src="${room.image}" alt="${room.name}">
                <div class="status-badge ${room.status}">
                    ${room.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                </div>
            </div>
            <div class="room-info">
                <h3>${room.name}</h3>
                <p class="description">${room.description}</p>
                <p class="price">${room.price.toLocaleString('vi-VN')} VNĐ/đêm</p>
                <div class="room-bottom">
                    <div class="amenities">
                        ${room.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                    </div>
                    <button class="book-btn" onclick="bookRoom('${room.id}')" ${room.status === 'occupied' ? 'disabled' : ''}>
                        <i class="fas fa-calendar-check"></i>
                        ${room.status === 'available' ? 'Đặt phòng' : 'Đã đặt'}
                    </button>
                </div>
            </div>
        `;
        roomList.appendChild(roomElement);
    });

    // Hiển thị nút chỉnh sửa cho admin
    const adminControls = document.getElementById('adminControls');
    if (adminControls) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            adminControls.innerHTML = `
                <button class="admin-btn" onclick="toggleAdminPanel()">
                    <i class="fas fa-edit"></i> Chỉnh sửa
                </button>
                <div id="adminPanel" class="admin-panel" style="display: none;">
                    <button class="admin-btn" onclick="openAddRoomModal()">
                        <i class="fas fa-plus"></i> Thêm Phòng
                    </button>
                    <button class="admin-btn" onclick="showEditButtons()">
                        <i class="fas fa-edit"></i> Sửa Phòng
                    </button>
                    <button class="admin-btn" onclick="showDeleteButtons()">
                        <i class="fas fa-trash"></i> Xóa Phòng
                    </button>
                </div>
            `;
            adminControls.style.display = 'block';
        } else {
            adminControls.style.display = 'none';
        }
    }
}

// Toggle admin panel
function toggleAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
}

// Lọc phòng theo loại
function filterRooms(type) {
    // Xóa class active từ tất cả các nút
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Thêm class active cho nút được chọn
    document.querySelector(`.filter-btn[onclick*="${type}"]`).classList.add('active');
    
    let filteredRooms;
    if (type === 'all') {
        filteredRooms = rooms; // Hiển thị tất cả phòng
    } else {
        filteredRooms = rooms.filter(room => room.type === type);
    }
    renderRooms(filteredRooms);
}

// Hiển thị nút sửa cho từng phòng
function showEditButtons() {
    const roomCards = document.querySelectorAll('.room-card');
    isEditing = true;
    
    roomCards.forEach(roomCard => {
        if (!roomCard.querySelector('.edit-btn')) {
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Sửa';
            
            const roomId = roomCard.querySelector('.book-btn').getAttribute('onclick').split("'")[1];
            editBtn.onclick = () => editRoom(roomId);
            
            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Lưu';
            saveBtn.style.display = 'none';
            saveBtn.onclick = () => {
                if(confirm('Bạn có muốn lưu thay đổi không?')) {
                    document.getElementById('roomForm').dispatchEvent(new Event('submit'));
                    saveBtn.style.display = 'none';
                    editBtn.style.display = 'block';
                }
            };
            
            roomCard.querySelector('.room-bottom').appendChild(editBtn);
            roomCard.querySelector('.room-bottom').appendChild(saveBtn);
        }
    });
}
// Hiển thị nút xóa cho từng phòng
function showDeleteButtons() {
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(roomCard => {
        if (!roomCard.querySelector('.delete-btn')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Xóa';
            
            const roomId = roomCard.querySelector('.book-btn').getAttribute('onclick').split("'")[1];
            deleteBtn.onclick = () => {
                if (confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
                    const index = rooms.findIndex(r => r.id === roomId);
                    if (index !== -1) {
                        rooms.splice(index, 1);
                        renderRooms();
                        alert('Đã xóa phòng thành công!');
                    }
                }
            };
            
            roomCard.querySelector('.room-bottom').appendChild(deleteBtn);
        }
    });
}

// Hàm mở modal thêm phòng mới
function openAddRoomModal() {
    const modal = document.getElementById('roomModal');
    if (!modal) return;

    // Reset form
    document.getElementById('modalTitle').textContent = 'Thêm Phòng Mới';
    document.getElementById('roomForm').reset();
    document.getElementById('roomId').value = ''; // Reset room ID
    modal.style.display = 'block';
}

// Hàm chỉnh sửa phòng
function editRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    const modal = document.getElementById('roomModal');
    if (!modal) return;

    // Hiển thị nút lưu và ẩn nút sửa
    const roomCard = document.querySelector(`[data-id="${roomId}"]`);
    if (roomCard) {
        const editBtn = roomCard.querySelector('.edit-btn');
        const saveBtn = roomCard.querySelector('.save-btn');
        if (editBtn && saveBtn) {
            editBtn.style.display = 'none';
            saveBtn.style.display = 'block';
        }
    }

    // Điền thông tin phòng vào form
    document.getElementById('modalTitle').textContent = 'Chỉnh Sửa Phòng';
    document.getElementById('roomName').value = room.name;
    document.getElementById('roomType').value = room.type;
    document.getElementById('roomPrice').value = room.price;
    document.getElementById('roomDescription').value = room.description;
    document.getElementById('roomAmenities').value = room.amenities.join(', ');
    document.getElementById('roomId').value = room.id;

    modal.style.display = 'block';
    hasUnsavedChanges = true;
}

// Xử lý form submit
document.getElementById('roomForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('roomName').value,
        type: document.getElementById('roomType').value,
        price: parseInt(document.getElementById('roomPrice').value),
        description: document.getElementById('roomDescription').value,
        amenities: document.getElementById('roomAmenities').value.split(',').map(item => item.trim()),
        status: 'available',
        id: document.getElementById('roomId').value || `${document.getElementById('roomType').value}${Date.now()}`
    };

    // Xử lý hình ảnh
    const imageFile = document.getElementById('roomImage')?.files[0];
    const roomId = document.getElementById('roomId').value;

    if (roomId) {
        // Chỉnh sửa phòng
        const index = rooms.findIndex(r => r.id === roomId);
        if (index !== -1) {
            // Giữ lại hình ảnh cũ nếu không có hình mới
            formData.image = imageFile ? 
                URL.createObjectURL(imageFile) : 
                rooms[index].image;
            
            rooms[index] = { ...rooms[index], ...formData };
            alert('Đã lưu thay đổi thành công!');
        }
    } else {
        // Thêm phòng mới
        formData.image = imageFile ? 
            URL.createObjectURL(imageFile) : 
            `images/${formData.type}.jpg`;
        
        rooms.push(formData);
        alert('Đã thêm phòng mới thành công!');
    }

    renderRooms();
    document.getElementById('roomModal').style.display = 'none';
    hasUnsavedChanges = false;
});

// Đóng modal
document.querySelector('.close')?.addEventListener('click', () => {
    const modal = document.getElementById('roomModal');
    if (!modal) return;

    if (hasUnsavedChanges) {
        if (confirm('Bạn có thay đổi chưa được lưu. Bạn có muốn lưu thay đổi không?')) {
            document.getElementById('roomForm').dispatchEvent(new Event('submit'));
        } else {
            hasUnsavedChanges = false;
            modal.style.display = 'none';
        }
    } else {
        modal.style.display = 'none';
    }
});

// Click bên ngoài modal để đóng
window.onclick = function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const roomModal = document.getElementById('roomModal');
    
    if (event.target == bookingModal) {
        closeBookingModal();
    }
    
    if (event.target == roomModal) {
        if (hasUnsavedChanges) {
            if (confirm('Bạn có thay đổi chưa được lưu. Bạn có muốn lưu thay đổi không?')) {
                document.getElementById('roomForm').dispatchEvent(new Event('submit'));
            } else {
                hasUnsavedChanges = false;
                roomModal.style.display = 'none';
            }
        } else {
            roomModal.style.display = 'none';
        }
    }
}

// Thêm hàm khởi tạo ban đầu
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    // Hiển thị tất cả phòng khi trang web được tải
    renderRooms(rooms);
    
    // Khởi tạo các event listener cho form đặt phòng
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Đặt phòng thành công!');
            closeBookingModal();
        });
    }
});

// Sửa lại hàm bookRoom để mở form đặt phòng
function bookRoom(roomId) {
    console.log("Đang mở form đặt phòng cho phòng:", roomId);
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        // Lưu thông tin phòng đang được đặt
        currentBookingRoom = room;
        openBookingModal();
    }
}

// Hàm mở modal đặt phòng
function openBookingModal() {
    console.log("Đang mở modal đặt phòng...");
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error("Không tìm thấy modal đặt phòng");
    }
}

// Hàm đóng modal đặt phòng
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Thêm hàm để thiết lập ngày tối thiểu cho input date
function setupDateInputs() {
    const today = new Date();
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    // Format ngày thành YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    // Thiết lập ngày tối thiểu là ngày hiện tại
    const todayFormatted = formatDate(today);
    checkInInput.min = todayFormatted;
    checkOutInput.min = todayFormatted;

    // Khi ngày nhận phòng thay đổi
    checkInInput.addEventListener('change', function() {
        // Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = formatDate(nextDay);
        
        // Nếu ngày trả phòng nhỏ hơn ngày nhận phòng + 1, reset ngày trả phòng
        if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(this.value)) {
            checkOutInput.value = formatDate(nextDay);
        }
    });

    // Khi ngày trả phòng thay đổi
    checkOutInput.addEventListener('change', function() {
        // Kiểm tra nếu ngày trả phòng nhỏ hơn ngày nhận phòng
        if (checkInInput.value && new Date(this.value) <= new Date(checkInInput.value)) {
            alert('Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày');
            this.value = '';
        }
    });
}

// Thêm validation cho form đặt phòng
function validateBookingForm(e) {
    e.preventDefault();
    
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset giờ về 00:00:00

    // Kiểm tra ngày nhận phòng
    if (checkIn < today) {
        alert('Không thể đặt phòng cho ngày đã qua');
        return false;
    }

    // Kiểm tra ngày trả phòng
    if (checkOut <= checkIn) {
        alert('Ngày trả phòng phải sau ngày nhận phòng');
        return false;
    }

    // Kiểm tra độ tuổi từ ngày sinh
    const birthDate = new Date(document.getElementById('birthDate').value);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
        alert('Người đặt phòng phải từ 18 tuổi trở lên');
        return false;
    }

    // Nếu tất cả điều kiện đều hợp lệ
    alert('Đặt phòng thành công!');
    closeBookingModal();
    return true;
}

// Cập nhật lại event listener cho form trong DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    renderRooms(rooms);
    
    // Thiết lập các ràng buộc cho input date
    setupDateInputs();
    
    // Xử lý form đặt phòng
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', validateBookingForm);
    }

    // Thiết lập ngày tối đa cho ngày sinh (18 tuổi trở lên)
    const birthDateInput = document.getElementById('birthDate');
    if (birthDateInput) {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 18);
        birthDateInput.max = formatDate(maxDate);
    }
});
