// Thêm tài khoản admin mẫu
const adminAccount = {
    username: "admin@gmail.com",
    password: "123",
    role: "admin"
};

// Kiểm tra nếu đã đăng nhập thì chuyển về trang chủ
function checkLoginStatus() {
    const currentPage = window.location.pathname;
    if (localStorage.getItem('isLoggedIn') === 'true' && currentPage.includes('DangNhap.html')) {
        window.location.href = "TrangChu.html";
    }
}

function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe');
    
    if (!username || !password) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return false;
    }

    if (username === adminAccount.username && password === adminAccount.password) {
        // Lưu thông tin đăng nhập nếu được chọn
        if(rememberMe.checked) {
            localStorage.setItem('savedUsername', username);
        } else {
            localStorage.removeItem('savedUsername');
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        alert('Đăng nhập thành công!');
        window.location.href = "TrangChu.html";
        return true;
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        return false;
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = "TrangChu.html";
}

// Kiểm tra trạng thái đăng nhập và cập nhật UI một lần duy nhất
let isUpdateLoginStatusRunning = false;
function updateLoginStatus() {
    if (isUpdateLoginStatusRunning) return;
    isUpdateLoginStatusRunning = true;

    const loginLink = document.querySelector('a[href="DangNhap.html"]');
    if (loginLink) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginLink.textContent = 'Đăng xuất';
            loginLink.href = 'javascript:void(0)';
            loginLink.onclick = logout;
        } else {
            loginLink.textContent = 'Đăng nhập';
            loginLink.href = 'DangNhap.html';
            loginLink.onclick = null;
        }
    }
    isUpdateLoginStatusRunning = false;
}

// Ch��y một lần khi trang web được load
document.addEventListener('DOMContentLoaded', () => {
    updateLoginStatus();
    checkLoginStatus();
});

function validateRegistrationForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return false;
    }
    
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    // Xử lý hiển thị/ẩn mật khẩu
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    
    if(togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Kiểm tra và điền thông tin đã lưu
    const savedUsername = localStorage.getItem('savedUsername');
    const rememberMe = document.getElementById('rememberMe');
    
    if(savedUsername && rememberMe) {
        document.getElementById('username').value = savedUsername;
        rememberMe.checked = true;
    }
});