const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/////////////////////////////////////////////////////////
////////// HELPER METHODS //////////////////////////////
/////////////////////////////////////////////////////////

// show input success status
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/////////////////////////////////////////////////////////
////////// VALIDATION METHODS //////////////////////////////
/////////////////////////////////////////////////////////

const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be smaller than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

function checkValidEmail(email) {
  const isValidEmail = validateEmail(email.value.trim());

  if (isValidEmail) {
    showSuccess(email);
  } else {
    showError(email, `${getFieldName(email)} is not valid`);
  }

  if (email.value.trim() === '') {
    showError(email, `${getFieldName(email)} is required`);
  }
}

const checkMatch = (password, password2) => {
  if (password.value !== password2.value) {
    showError(password, `Password don't match`);
    showError(password2, `Password don't match`);
  }
};

function validateFormFields() {
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkValidEmail(email);
  checkMatch(password, password2);
}

// Event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  validateFormFields();
});
