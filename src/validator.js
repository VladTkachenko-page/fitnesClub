class Validator {
    constructor({ selector, pattern = {}, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
        this.buttonForm = this.form.querySelector('.btn');
        this.checkbox = this.form.querySelector('.personal-data').getElementsByTagName('input');
        this.error = new Set();
    }
    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.chekIt({ target: elem }));
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                } 
                  return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };
        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        }
        return true;
    }

    chekIt(event) {
        const target = event.target;

        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
        if (this.checkbox[0].checked) {
            this.buttonForm.disabled = false;
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.buttonForm.disabled = true;
            if (this.form.querySelector('.personal-data').nextElementSibling && this.form.querySelector('.personal-data').nextElementSibling.classList.contains('validator-error2')) {
                return;
            }
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Подтвердите согласие на отправку';
            errorDiv.classList.add('validator-error2');
            this.form.querySelector('.personal-data').insertAdjacentElement('afterend', errorDiv);
        }
        if (this.error.size > 0) {
            this.buttonForm.disabled = true;
        } else {
            this.buttonForm.disabled = false;
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
        if (this.form.querySelector('.personal-data').nextElementSibling && this.form.querySelector('.personal-data').nextElementSibling.classList.contains('validator-error2')) {
            this.form.querySelector('.personal-data').nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
          input.success {
            border: 2px solid green !important
          }
          input.error {
            border: 2px solid red !important
          }
          .validator-error {
              font-size: 12px;
              font-family: sans-serif;
              color: red;
            }
          .validator-error2 {
              font-size: 12px;
              font-family: sans-serif;
              color: red;
            }
          #banner-form .validator-error {
              display: none;
          }
        `;
        document.head.appendChild(style);
    }

    setPattern() {
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+[78]([-()]*\d){10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
    }
}
