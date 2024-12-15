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
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn[onclick*="${type}"]`).classList.add('active');
    
    if (type === 'all') {
        renderRooms(rooms);
    } else {
        const filteredRooms = rooms.filter(room => room.type === type);
        renderRooms(filteredRooms);
    }
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
    const modal = document.getElementById('roomModal');
    if (!modal) return;

    if (event.target == modal) {
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
    }
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    renderRooms();
});