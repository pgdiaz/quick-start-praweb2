(() => {
    'use strict';
    var formValidator = function () {
        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false);
        });
    };
    formValidator();
    var inputTextValidator = function () {
        const formgroups = document.querySelectorAll('.inputtext-need-validation');
        Array.from(formgroups).forEach(group => {
            const elementInput = group.getElementsByClassName('form-control')[0];
            const elementError = group.getElementsByClassName('invalid-tooltip')[0];
            elementInput.addEventListener('input', function () {
                if (!this.validity.valid) {
                    if (this.validity.valueMissing) {
                        elementError.textContent = 'Este campo es requerido';
                    } else if (this.validity.patternMismatch) {
                        elementError.textContent = 'Solo se permiten letras';
                    } else if (this.validity.tooShort) {
                        elementError.textContent = 'Debe contener al menos ' + elementInput.getAttribute('minlength') + ' letras';
                    }
                    elementInput.classList.add('is-invalid');
                } else {
                    elementError.textContent = '';
                    elementInput.classList.remove('is-invalid');
                }
            });
        });
    };
    inputTextValidator();
    var emailValidator = function () {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        emailInput.addEventListener('input', function () {
            if (isBlank(this.value)) {
                emailError.textContent = 'El correo electrónico es requerido';
                emailInput.classList.add('is-invalid');
            } else if (!isValidEmail(this.value)) {
                emailError.textContent = 'El correo electrónico no es válido';
                emailInput.classList.add('is-invalid');
            } else {
                emailError.textContent = '';
                emailInput.classList.remove('is-invalid');
            }
        });
    }
    emailValidator();
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    function isBlank(text) {
        return text === undefined || text === null || text.trim() === '';
    }
})()