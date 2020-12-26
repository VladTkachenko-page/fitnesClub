const mainSlider = () => {
  const slider = document.querySelector('.main-slider'),
   slide = slider.querySelectorAll('.slide');

  let currentSlide = 0,
      interval;

  const autoPlaySlide = () => {
      slide[currentSlide].style.display = 'none';
      currentSlide++;
      if (currentSlide >= slide.length) {
          currentSlide = 0;
      }
      slide[currentSlide].style.display = 'flex';
  };

  const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
  };

  startSlide(3000);
};
export default mainSlider;