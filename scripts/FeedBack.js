document.addEventListener('DOMContentLoaded', function() {
    const ratingInputs = document.querySelectorAll('.rating input');
    const ratingStars = document.querySelectorAll('.rating label');
    
    // Hiệu ứng hover cho rating stars
    ratingStars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            for(let i = 0; i <= index; i++) {
                ratingStars[i].classList.add('hover');
            }
        });
        
        star.addEventListener('mouseout', () => {
            ratingStars.forEach(s => s.classList.remove('hover'));
        });
    });
    
    // Validate form phản hồi
    function validateFeedbackForm() {
        const rating = document.querySelector('input[name="rating"]:checked');
        const comment = document.getElementById('comment').value;
        
        if (!rating) {
            alert('Vui lòng chọn đánh giá sao!');
            return false;
        }
        
        if (!comment.trim()) {
            alert('Vui lòng nhập nội dung phản hồi!');
            return false;
        }
        
        return true;
    }
    
    // Thêm validate cho form
    const feedbackForm = document.getElementById('feedbackForm');
    if(feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            if (!validateFeedbackForm()) {
                e.preventDefault();
            }
        });
    }
});
