const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся';
  const inputAll = document.querySelectorAll('input');

  for (let i = 0; i < inputAll.length; i++) {
      if (inputAll[i].name === 'name') {
          inputAll[i].addEventListener('input', () => {
              inputAll[i].value = inputAll[i].value.replace(/[^а-яА-ЯёЁ ]/, '');
          });
      } else if (inputAll[i].name === 'phone') {
          inputAll[i].addEventListener('input', () => {
              inputAll[i].value = inputAll[i].value.replace(/[^0-9+]/, '');
              if (inputAll[i].value.length > 12) {
                  inputAll[i].value = inputAll[i].value.slice(0,12); 
              }
          });
      }
  }

  const successSend = form => {
      form.forEach(item => {
          item.classList.remove('success');
          if (item.getAttribute('type') !== 'radio') {
            item.value = '';
          } else if (item.id === 'm1' || item.id === 't1') {
                item.checked = true;
          } else if (item.id === 'card_leto_mozaika') {
            item.checked = true;
            document.getElementById('price-total').textContent = 1999;
          }
          if (item.getAttribute('type') === 'checkbox') {
              item.checked = false;
          }
      });
  };

  const openThanks = () => {
    const popUpThanks = document.getElementById('thanks'),
        popUpCallback = document.getElementById('callback_form'),
        popUpFreeVisit = document.getElementById('free_visit_form');
    
    if (popUpCallback.style.display === 'flex' || popUpFreeVisit.style.display === 'flex') {
        popUpCallback.style.display = 'none';
        popUpFreeVisit.style.display = 'none';
    }

    popUpThanks.style.display = 'flex';
    popUpThanks.addEventListener('click', event => {
        let target = event.target;
        
        if (target.classList.contains('close-form') || target.classList.contains('close-btn')) {
          popUpThanks.style.display = 'none';
        } else {
            target = target.closest('.form-content');
            if (!target) {
              popUpThanks.style.display = 'none';
            }
        }
    });
  } 
  const successPopUpSend = () => {
    const popUpThanks = document.getElementById('thanks');
    popUpThanks.getElementsByTagName('p')[0].textContent = successMessage;
    setTimeout(() => {
        popUpThanks.style.display = 'none';
    }, 5000)
  }

  const errorPopUpSend = () => {
    const popUpThanks = document.getElementById('thanks');
    popUpThanks.getElementsByTagName('p')[0].textContent = errorMessage;
}

  document.addEventListener('submit', event => {
    let target = event.target;
    event.preventDefault();
    openThanks();
    document.getElementById('thanks').getElementsByTagName('p')[0].textContent = 'Идет отправка...';
    const formData = new FormData(target);
    const body = {};
    formData.forEach((key, val) => {
        body[key] = val;
    });
    postData(body)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            successSend(target.querySelectorAll('input'));
            successPopUpSend();
        })
        .catch(errorPopUpSend);
});

  const postData = body => fetch('./server.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  });
};
export default sendForm;