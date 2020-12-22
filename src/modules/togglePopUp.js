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
      const inputPopUp = popup.querySelectorAll('input'),
        error = popup.querySelectorAll('.validator-error'),
        error2 = popup.querySelector('.validator-error2');
      const clearInput = () => {
          inputPopUp.forEach(item => {
            item.classList.remove('success');
            item.classList.remove('error');
            item.value = '';
            item.checked = false;
        });
          if(error !== null) {
            error.forEach(item => {
              item.remove();
          });
          }
          if (error2 !== null) {
            error2.remove();
          }
        }  
      if (target.classList.contains('close-form') || target.classList.contains('close-btn')) {
        popup.style.display = 'none';
        clearInput();
      } else {
          target = target.closest('.form-content');
          if (!target) {
            popup.style.display = 'none';
            clearInput();
          }
      }
  });
  }

  const openGift = () => {
    const giftBtn = document.querySelector('.fixed-gift'),
      popUpGift = document.getElementById('gift');
      if (giftBtn) {
        giftBtn.addEventListener('click', () => {
          popUpGift.style.display = 'flex';
          giftBtn.style.display = 'none';
        });
        popUpClose(popUpGift);
      }
  } 
  openGift();

  
}

export default togglePopUp;