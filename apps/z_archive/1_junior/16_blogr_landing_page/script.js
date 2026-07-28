'use strict';

// Selectors
const mob_menu = document.querySelector('#mob-menu');
const menu = document.querySelector('.menu-nav');
const windowResize = globalThis.matchMedia('(max-width: 375px)');

// Mobile Menu Toggle
function menuActivate() {
  mob_menu.classList.toggle('exit');
  menu.classList.toggle('hidden');
}

// Window Resize Event
function mobileLayout(x) {
  menu.classList.toggle('hidden', x.matches);
}

// Event Handler
mob_menu.addEventListener('click', menuActivate);
windowResize.addEventListener('change', mobileLayout);
mobileLayout(windowResize);
