// Mảng lưu trữ danh sách khách hàng
let customers = [];

// Hàm lưu vào localStorage
function saveCustomersToStorage() {
    localStorage.setItem('hotelCustomers', JSON.stringify(customers));
}

// Hàm load từ localStorage
function loadCustomersFromStorage() {
    const savedCustomers = localStorage.getItem('hotelCustomers');
    if (savedCustomers) {
        customers = JSON.parse(savedCustomers);
    }
}

// Hàm thêm khách hàng
function addCustomer(newCustomer) {
    customers.push(newCustomer);
    saveCustomersToStorage();
}

// Hàm hiển thị danh sách khách hàng
function renderCustomers() {
    const customerContainer = document.querySelector('.customer-container');
    if (!customerContainer) return;

    customerContainer.innerHTML = customers.map(customer => `
        <div class="customer-card" data-id="${customer.MaKH}">
            <div class="customer-info">
                <h3>${customer.TenKH}</h3>
                <p>Số điện thoại: ${customer.SoDienThoai}</p>
                <p>Email: ${customer.Email}</p>
                <p>Địa chỉ: ${customer.DiaChi}</p>
            </div>
        </div>
    `).join('');
}

// Load dữ liệu khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    loadCustomersFromStorage();
    renderCustomers();
}); 