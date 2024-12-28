$(document).ready(function () {
    let currentIndex = 0; // Start with the second product
    const totalProducts = $('.product').length;
    const visibleProducts = 6; // Number of visible products
    let autoplayInterval; // Interval reference for autoplay

    // Function to move the slider
    function moveSlider() {
        const offset = -(currentIndex * 100 / visibleProducts) + '%'; // 3 products visible
        $('.slider-wrapper').css('transform', 'translateX(' + offset + ')');
        updateActiveProduct();
        updateIndicators();
    }

    // Update the active product style
    function updateActiveProduct() {
        $('.product').removeClass('active');
        $('.product').eq(currentIndex % totalProducts).addClass('active');
    }

    // Update indicators
    function updateIndicators() {
        $('.slider-indicators button').removeClass('active');
        $('.slider-indicators button').eq(currentIndex % totalProducts).addClass('active');
    }

    // Next button
    $('#nextBtn').click(function () {
        if (currentIndex >= totalProducts - visibleProducts) {
            currentIndex = 0; // Recycle to start
        } else {
            currentIndex++;
        }
        moveSlider();
        resetAutoplay();
    });

    // Prev button
    $('#prevBtn').click(function () {
        if (currentIndex <= 0) {
            currentIndex = totalProducts - visibleProducts; // Recycle to end
        } else {
            currentIndex--;
        }
        moveSlider();
        resetAutoplay();
    });

    // Indicators click
    $('.slider-indicators button').click(function () {
        currentIndex = $(this).index();
        moveSlider();
        resetAutoplay();
    });

    // Auto-play slider
    function startAutoplay() {
        autoplayInterval = setInterval(function () {
            if (currentIndex >= totalProducts - visibleProducts) {
                currentIndex = 0; // Recycle to start
            } else {
                currentIndex++;
            }
            moveSlider();
        }, 3000); // 3 seconds
    }

    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Reset autoplay when user interacts
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Initial move to set the active product and indicators
    moveSlider();
    startAutoplay();

    // Optional: Pause autoplay on hover
    $('.product-slider').hover(stopAutoplay, startAutoplay);
});