// MODULES IMPORT //
import lazySizes from 'lazysizes'; // Lazysizes
import GLightbox from 'glightbox'; // Lightbox
import Plyr from 'plyr'; // Plyr

// Swiper //
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

// BOOTSTRAP //
// import * as bootstrap from 'bootstrap'
import { Dropdown, Collapse, Modal, Tab, ScrollSpy, Offcanvas, } from 'bootstrap';

// CUSTOM IMPORT //
import './custom/hoverintent'; // Hover intent

// Smooth Scroll //
const links = document.querySelectorAll(".smooth");

for (const link of links) {
    link.addEventListener("click", smoothFn);
}

function smoothFn(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    let headerHeight = document.querySelector('.header').clientHeight;
    const offsetTop = document.querySelector(href).offsetTop - headerHeight;
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}

// Lightbox //
const lightbox = GLightbox({
    loop: true
});

// Single Lightbox //
const singleLightbox = GLightbox({
    loop: false
});

const singleLightboxElements = document.querySelectorAll('.glightbox-single');
if (singleLightboxElements) {
    singleLightboxElements.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            let targetHref = this.getAttribute('href');
            singleLightbox.setElements([{
                'href': targetHref
            }]);
            singleLightbox.open();
        })
    })
}

// Video Player //
const vid_player = Plyr.setup('.video-player', {
    controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'fullscreen'
    ],
    youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        modestbranding: 1
    },
    vimeo: {
        byline: false,
        portrait: false,
        title: false,
        speed: true,
        transparent: false
    }
});
