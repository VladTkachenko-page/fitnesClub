const slider = () => {
    const slider = document.querySelector('.gallery-slider'),
        slide = slider.querySelectorAll('.slide'),
        dotWrap = document.querySelector('.slider-dots');

    let currentSlide = 0,
        interval,
        dot = document.querySelectorAll('.dot');

    const addDots = () => {
        for (let i = 0; i < slide.length; i++) {
            const elemDot = document.createElement('li');
            elemDot.className = "dot";
            dotWrap.append(elemDot);
        }
        dot = document.querySelectorAll('.dot');
        dot[0].classList.add('dot-active');
    };

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        dot = document.querySelectorAll('.dot');
        prevSlide(slide, currentSlide, 'slide-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'slide-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', event => {
        event.preventDefault();

        const target = event.target;
        prevSlide(slide, currentSlide, 'slide-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'slide-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
        if (event.target.matches('span') || event.target.matches('.dot')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', event => {
        if (event.target.matches('span') || event.target.matches('.dot')) {
            startSlide();
        }
    });
    addDots();
    startSlide(3000);
};
export default slider;