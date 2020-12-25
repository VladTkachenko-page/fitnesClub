const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся';
  const form1 = document.getElementById('form1'),
      form2 = document.getElementById('form2'),
      bannerForm = document.getElementById('banner-form'),
      cardOrder = document.getElementById('card_order'),
      footerForm = document.getElementById('footer_form'),
      statusMessage = document.createElement('div'),
      inputForm1 = form1.querySelectorAll('input'),
      inputForm2 = form2.querySelectorAll('input'),
      inputBannerForm = bannerForm.querySelectorAll('input'),
      inputCardOrder = cardOrder.querySelectorAll('input'),
      inputFooterForm = footerForm.querySelectorAll('input'),
      inputAll = document.querySelectorAll('input');
  statusMessage.style.color = '#fff';

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
      statusMessage.textContent = successMessage;
      form.forEach(item => {
          item.classList.remove('success');
          if (item.getAttribute('type') !== 'radio') {
            item.value = '';
            }
          if (item.getAttribute('type') === 'checkbox') {
              item.checked = false;
          }
      });
  };
  const openThanks = () => {
    const popUpThanks = document.getElementById('thanks');

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
    const errorPost = error => {
      statusMessage.textContent = errorMessage;
      console.error(error);
  };
  
  form1.addEventListener('submit', event => {
      form1.appendChild(statusMessage);
      event.preventDefault();
      statusMessage.textContent = 'Идет отправка...';
      const formData = new FormData(form1);
      const body = {};
      formData.forEach((key, val) => {
          body[key] = val;
      });
      postData(body)
          .then(response => {
              if (response.status !== 200) {
                  throw new Error('status network not 200');
              }
              successSend(inputForm1);
          })
          .catch(errorPost);
  });
  form2.addEventListener('submit', event => {
      event.preventDefault();
      form2.appendChild(statusMessage);
      statusMessage.textContent = 'Идет отправка...';
      const formData = new FormData(form2);
      const body = {};
      formData.forEach((key, val) => {
          body[key] = val;
      });
      postData(body)
          .then(response => {
              if (response.status !== 200) {
                  throw new Error('status network not 200');
              }
              successSend(inputForm2);
          })
          .catch(errorPost);
  });
  bannerForm.addEventListener('submit', event => {
    event.preventDefault();
    openThanks();
    document.getElementById('thanks').getElementsByTagName('p')[0].textContent = 'Идет отправка...';
    const formData = new FormData(bannerForm);
    const body = {};
    formData.forEach((key, val) => {
        body[key] = val;
    });
    postData(body)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            successSend(inputBannerForm);
            successPopUpSend();
        })
        .catch(errorPopUpSend);
});
cardOrder.addEventListener('submit', event => {
    event.preventDefault();
    openThanks();
    document.getElementById('thanks').getElementsByTagName('p')[0].textContent = 'Идет отправка...';
    const formData = new FormData(cardOrder);
    const body = {};
    formData.forEach((key, val) => {
        body[key] = val;
    });
    postData(body)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            successSend(inputCardOrder);
            successPopUpSend();
        })
        .catch(errorPopUpSend);
});
footerForm.addEventListener('submit', event => {
    event.preventDefault();
    openThanks();
    document.getElementById('thanks').getElementsByTagName('p')[0].textContent = 'Идет отправка...';
    const formData = new FormData(footerForm);
    const body = {};
    formData.forEach((key, val) => {
        body[key] = val;
    });
    postData(body)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            successSend(inputFooterForm);
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