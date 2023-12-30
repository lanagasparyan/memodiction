$(function () {
    $('#change-skin').on('click', function () {
        $("body").toggleClass("page-dark-mode");
        localStorage.setItem('bj-dark-mode', $("body").hasClass("page-dark-mode"));
        BeautifulJekyllJS.initNavbar();
    });
    if (localStorage.getItem('bj-dark-mode') === 'true') {
        $('#change-skin').trigger('click');
    }
});
document.addEventListener("DOMContentLoaded", function () {
    var gradientElements = document.querySelectorAll('.random-gradient');

    gradientElements.forEach(function (elem) {
        var gradient = generateRandomDarkGradient();
        elem.style.backgroundImage = gradient;
    });

    function generateRandomDarkGradient() {
        // Generate two random RGB values for a dark gradient
        var color1 = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
        var color2 = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
        return `linear-gradient(to right, ${color1}, ${color2})`;
    }
});
