const mainSlider = () => {
  const slider = document.querySelector('.main-slider'),
   slide = slider.querySelectorAll('.slide');

  let currentSlide = 0,
      interval;

  const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'none');
      currentSlide++;
      if (currentSlide >= slide.length) {
          currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'flex');
  };

  const prevSlide = (elem, index, strAttr) => {
    elem[index].style.display = strAttr;
  };

  const nextSlide = (elem, index, strAttr) => {
    elem[index].style.display = strAttr;
  };

  const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
  };

  startSlide(3000);
};
export default mainSlider;