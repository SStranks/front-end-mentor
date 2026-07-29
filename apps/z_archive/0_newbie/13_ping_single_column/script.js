'use strict';

const emailInput = document.querySelector('input[name="email"]');
const submitButton = document.querySelector('button[name="submit"]');
const errorMsg = document.querySelector('.error-msg');

// Email Validation
function validateEmail() {
  var emailReg = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;
  if (emailInput.value == '' || !emailReg.test(emailInput.value)) {
    emailInput.style.border = '2px solid hsla(var(--Light-Red), 0.5)';
    errorMsg.classList.remove('hidden');
  }
}

// Reset State
function resetState() {
  emailInput.style.border = '1px solid hsla(var(--Gray), 0.5)';
  errorMsg.classList.add('hidden');
}

// Event Handlers
submitButton.addEventListener('click', validateEmail);
emailInput.addEventListener('change', resetState);
