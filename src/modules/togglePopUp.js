const togglePopUp = () => {
  document.addEventListener('click', event => {
    let target = event.target; 
    if (target.hasAttribute("data-popup")) {
      let textId = target.getAttribute("data-popup");
        openPopUp(textId);
    }
  });
  const openPopUp = id => {
    const popUpId = document.querySelector(id);

    popUpId.style.display = 'flex';
    popUpClose(popUpId);
    
  }

  const popUpClose = popup => {
    popup.addEventListener('click', event => {
      let target = event.target;
      
      if (target.classList.contains('close-form') || target.classList.contains('close-btn')) {
        popup.style.display = 'none';
      } else {
          target = target.closest('.form-content');
          if (!target) {
            popup.style.display = 'none';
          }
      }
  });
  }

  const openGift = () => {
    const giftBtn = document.querySelector('.fixed-gift'),
      popUpGift = document.getElementById('gift');

      giftBtn.addEventListener('click', () => {
        popUpGift.style.display = 'flex';
        giftBtn.style.display = 'none';
      });
      popUpClose(popUpGift);
  } 
  openGift();

  
}

export default togglePopUp;