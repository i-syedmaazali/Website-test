$(document).ready(function () {
    let currentIndex = 0;
    const totalProducts = $('.product').length;
    let visibleProducts = 6; // Default number of visible products
    let autoplayInterval;

    // Update visibleProducts based on screen width
    function updateVisibleProducts() {
        if (window.innerWidth <= 480) {
            visibleProducts = 2; // 2 product visible on small screens
        } else if (window.innerWidth <= 768) {
            visibleProducts = 3; // 3 products visible on medium screens
        } else {
            visibleProducts = 6; // 6 products visible on large screens
        }
    }

    // Function to move the slider
    function moveSlider() {
        const offset = -(currentIndex * 100 / visibleProducts) + '%';
        $('.slider-wrapper').css('transform', 'translateX(' + offset + ')');
        updateActiveProduct();
        updateIndicators();
    }

    // Update active product style
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
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        moveSlider();
        resetAutoplay();
    });

    // Prev button
    $('#prevBtn').click(function () {
        if (currentIndex <= 0) {
            currentIndex = totalProducts - visibleProducts;
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
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            moveSlider();
        }, 3000);
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

    // Initial setup
    updateVisibleProducts();
    moveSlider();
    startAutoplay();

    // Update visible products on window resize
    $(window).resize(function () {
        updateVisibleProducts();
        moveSlider();
    });

    // Optional: Pause autoplay on hover
    $('.product-slider').hover(stopAutoplay, startAutoplay);
});
