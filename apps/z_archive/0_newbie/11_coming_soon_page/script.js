'use strict';

// Variables
const btn = document.querySelector('button[type="submit"]');
const emailInput = document.querySelector('input');
const errorIcon = document.querySelector('.error-icon');
const errorMsg = document.querySelector('.error-msg');
var checkBool = false;

// Email Validation
const validate = () => {
  var emailReg = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;
  // e.preventDefault()
  if (emailInput.value == '') {
    errorIcon.classList.remove('hidden');
    errorMsg.classList.remove('hidden');
  }

  if (emailReg.test(emailInput.value)) {
    alert('Email Valid');
  } else {
    btn.style.background = 'linear-gradient(135deg, hsla(0, 80%, 86%, 0.5), hsla(0, 74%, 74%, 0.5))';
    errorIcon.classList.remove('hidden');
    errorMsg.classList.remove('hidden');
    checkBool = true;
  }
};

// Reset Styles
const reset = () => {
  if (checkBool == true) {
    btn.style.background = 'linear-gradient(135deg, hsl(0, 80%, 86%), hsl(0, 74%, 74%))';
    errorIcon.classList.add('hidden');
    errorMsg.classList.add('hidden');
  }
};

// Event Listeners
btn.addEventListener('click', validate);
emailInput.addEventListener('input', reset);
