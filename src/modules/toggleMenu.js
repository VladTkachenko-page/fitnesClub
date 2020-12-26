const toggleMenu = () => {
    const menu = document.querySelector('.popup-menu'),
        menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('popup-menu-active');
    };
    
    document.addEventListener('click', event => {
        let target = event.target;
        if (target.closest('.close-menu-btn>img')) {
            handlerMenu();
        } else if (target.closest('.popup-menu>ul>li>a')){
            handlerMenu();
        }
        if (target.closest('.menu-button>img')) {
            handlerMenu();
        } else if (!target.closest('.popup-menu')) {
                menu.classList.remove('popup-menu-active');
            }
        
    });
    const smoothScroll = item => {
        let link = item.getAttribute('href').substring(1);
        
        if (link.includes('#')){
            link = item.getAttribute('href');
            document.location.href = link;
        }
        const scrollTarget = document.getElementById(link),
            elementPosition = scrollTarget.getBoundingClientRect().top;
        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    };

    menuItems.forEach(elem => {
        const href = elem.querySelector('a');
        href.addEventListener('click', e => {
            e.preventDefault();
            smoothScroll(href);
        });
    });
    window.addEventListener('scroll', function() {
        if (pageYOffset > 240 && document.documentElement.clientWidth < 768) {
            document.querySelector('.top-menu').style.position = 'fixed';
        } else {
            document.querySelector('.top-menu').style.position = 'static';
        }
    });
    window.addEventListener('resize', function() {
        if (document.documentElement.clientWidth > 767) {
            document.querySelector('.top-menu').style.position = 'static';
        } else if (pageYOffset > 240 && document.documentElement.clientWidth < 768) {
            document.querySelector('.top-menu').style.position = 'fixed';
        }
    });
};

export default toggleMenu;