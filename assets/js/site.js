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
        // Generate diverse gradient colors with teal as base + contrasting colors
        var colorPalettes = [
            // Teal variations (primary brand colors)
            ['rgb(74, 124, 126)', 'rgb(108, 164, 167)'],
            ['rgb(90, 143, 146)', 'rgb(143, 196, 199)'],

            // Teal to warm contrasts
            ['rgb(74, 124, 126)', 'rgb(184, 134, 87)'], // teal to warm brown
            ['rgb(108, 164, 167)', 'rgb(207, 159, 112)'], // teal to gold
            ['rgb(90, 143, 146)', 'rgb(186, 109, 92)'], // teal to coral

            // Teal to cool contrasts
            ['rgb(61, 100, 102)', 'rgb(95, 87, 139)'], // dark teal to purple
            ['rgb(127, 180, 183)', 'rgb(139, 125, 173)'], // light teal to lavender
            ['rgb(74, 124, 126)', 'rgb(107, 142, 184)'], // teal to blue

            // Complementary warm tones
            ['rgb(184, 134, 87)', 'rgb(207, 159, 112)'], // browns/golds
            ['rgb(186, 109, 92)', 'rgb(191, 142, 125)'], // corals

            // Nature-inspired
            ['rgb(108, 164, 167)', 'rgb(134, 171, 108)'], // teal to sage green
            ['rgb(90, 143, 146)', 'rgb(171, 146, 108)'], // teal to olive
        ];

        var palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        return `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`;
    }
});
