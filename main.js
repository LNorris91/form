const form = document.querySelector('form');
const email = document.getElementById('email');
const emailError = document.querySelector('.emailError');
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const zipError = document.querySelector('.zipError');
const pwd = document.getElementById('pwd');
const pwdError = document.querySelector('.pwdError');
const pwdConfirm = document.getElementById('pwdConfirm');
const pwdConfirmError = document.querySelector('.pwdConfirmError');

email.addEventListener('focusout', validateEmail);
country.addEventListener('input', showPlaceholder);
zip.addEventListener('focusin', zip.setCustomValidity('field is invalid'));
zip.addEventListener('focusout', validateZip);
pwd.addEventListener('focusout', validatePwd);
pwdConfirm.addEventListener('keyup', validatePwdConfirm);
pwdConfirm.addEventListener('focusout', validatePwdConfirm);

function validateEmail() {
  if (email.validity.valid) {
    emailError.textContent = '';
  } else {
    if (email.validity.valueMissing) {
      emailError.textContent = 'You need to enter an email address';
    } else if (email.validity.typeMismatch) {
      emailError.textContent = 'Please use a proper email format';
    }
  }
}

function showPlaceholder() {
  zip.value = '';
  zipError.textContent = '';

  const examples = {
    Australia: '1234',
    Austria: '1234',
    Belgium: '1234',
    Brazil: '12345-123',
    Canada: 'A1A 1A1',
    Denmark: '123 or 1234',
    Germany: '12345',
    Hungary: '1234',
    Italy: '12345',
    Japan: '123-1234',
    Netherlands: '1234 AB',
    Poland: '12-123',
    US: '12345 or 12345-1234',
  };

  zip.setAttribute('placeholder', examples[country.value]);
}

function validateZip() {
  const constraints = {
    Australia: ['^\\d{4}$', 'Please enter zip in Australian format "1234"'],
    Austria: ['^\\d{4}$', 'Please enter zip in Austrian format "1234'],
    Belgium: ['^\\d{4}$', 'Please enter zip in Belgian format "1234'],
    Brazil: ['^\\d{5}-\\d{3}$', 'Please enter zip in Brazilian formal "12345-123"'],
    Canada: [
      '^(?=[^DdFfIiOoQqUu\\d\\s])[A-Za-z]\\d(?=[^DdFfIiOoQqUu\\d\\s])[A-Za-z]\\s{0,1}\\d(?=[^DdFfIiOoQqUu\\d\\s])[A-Za-z]\\d$',
      'Please enter zip in Canadian format "A1A 1A1"',
    ],
    Denmark: ['^\\d{4}$', 'Please enter zip in Danish format "123 or 1234"'],
    Germany: ['^\\d{2}$', 'Please enter zip in German format "12345"'],
    Hungary: ['^\\d{4}$', 'Please enter zip in Hungarian format "1234"'],
    Italy: ['^\\d{5}$', 'Please enter zip in Italian format "12345"'],
    Japan: ['\\d{3}-\\d{4}', 'Please enter zip in Japanese format "123-1234"'],
    Netherlands: ['^\\d{4}\\s{0,1}[A-Za-z]{2}$', 'Please enter zip in Dutch format "1234 AB'],
    Poland: ['^\\d{2}[- ]{0,1}\\d{3}$', 'Please enter zip in Polish format "12-123"'],
    US: [
      '^\\b\\d{5}\\b(?:[- ]{1}\\d{4})?$',
      'Please enter zip in American format "12345 or 12345-1234"',
    ],
  };

  const constraint = new RegExp(constraints[country.value][0], '');

  if (constraint.test(zip.value)) {
    zipError.textContent = '';
    zip.setCustomValidity('');
  } else {
    if (zip.validity.valueMissing) {
      zipError.textContent = 'You need to enter a zip code';
    } else {
      zipError.textContent = constraints[country.value][1];
    }
    zip.setCustomValidity('field is invalid');
  }
}

function validatePwd() {
  if (pwd.validity.valid) {
    pwdError.textContent = '';
  } else if (pwd.validity.valueMissing) {
    pwdError.textContent = 'You need to enter a password';
  }
}

function validatePwdConfirm() {
  if (!pwd.value.length) {
    pwdConfirmError.textContent = 'No password to match';
  } else if (pwd.value === pwdConfirm.value) {
    pwdConfirmError.textContent = '';
    pwdConfirm.setCustomValidity('');
  } else if (pwdConfirm.validity.valueMissing) {
    pwdConfirmError.textContent = 'please confirm password';
  } else {
    pwdConfirmError.textContent = 'nope';
    pwdConfirm.setCustomValidity('field is invalid');
  }
}

form.addEventListener('submit', (e) => {
  if (
    !email.validity.valid ||
    !zip.validity.valid ||
    !pwd.validity.valid ||
    !pwdConfirm.validity.valid
  ) {
    validateEmail();
    validateZip();
    validatePwd();
    validatePwdConfirm();
    e.preventDefault();
  } else {
    alert('HIGH FIVE');
  }
});
