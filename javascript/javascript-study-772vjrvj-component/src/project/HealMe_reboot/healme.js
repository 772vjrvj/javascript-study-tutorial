$(document).ready(function () {
    const $menuBars = $('#menu-bars');
    const $menuClose = $('#menu-close');
    const $navbar = $('.navbar');
    const $header = $('header');

    function openMenu() {
        $navbar.addClass('active');
        $header.addClass('menu-open');
    }

    function closeMenu() {
        $navbar.removeClass('active');
        $header.removeClass('menu-open');
    }

    $menuBars.on('click', openMenu);
    $menuClose.on('click', closeMenu);
});
