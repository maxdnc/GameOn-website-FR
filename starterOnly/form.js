class FormValidator {
  constructor(formId, fields) {
    this.form = document.getElementById(formId);
    this.fields = fields;
    this.fieldValues = {};

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validateFormFields();
      console.log(this.fieldValues);
      console.log(this.isFormValid());
      if (this.isFormValid()) {
        this.displayValidMessage('Merci pour votre inscription');
      }
    });
  }

  validateFormFields() {
    let isValid = true;

    // Special case for location checkboxes

    // Get all checkboxes with the name 'location'
    const locationCheckBoxes = document.getElementsByName('location');
    let checkedValue = null;

    // Iterate over the checkboxes
    for (let i = 0; i < locationCheckBoxes.length; i++) {
      // If the checkbox is checked, store its value and break the loop
      if (locationCheckBoxes[i].checked) {
        checkedValue = locationCheckBoxes[i].value;
        break;
      }
    }

    // If no checkbox is checked, display an error message
    if (checkedValue === null) {
      isValid = false;
      this.displayError(locationCheckBoxes[0], 'Veuillez choisir une option.');
    } else {
      this.fieldValues['location'] = checkedValue;
      this.hideError(locationCheckBoxes[0]);
    }

    // Get checkboxNextEvent
    const checkboxNextEvent = document.getElementById('checkboxNextEvent');

    // Store its checked status and value
    this.fieldValues['checkboxNextEvent'] = checkboxNextEvent.checked;

    for (const fieldId in this.fields) {
      // Get the field element and its validation rules
      const field = document.getElementById(fieldId);
      const { test, errorMessage } = this.fields[fieldId];

      // For other fields, validate the field based on its type and validation rules
      if (!test(field.type === 'checkbox' ? field : field.value)) {
        this.displayError(field, errorMessage);
        isValid = false;
      } else {
        this.hideError(field);
        // Set the value of the field
        this.fieldValues[fieldId] =
          field.type === 'checkbox' ? field.checked : field.value;
      }
    }
    return isValid;
  }

  isFormValid() {
    return this.validateFormFields();
  }

  displayError(inputElement, message) {
    const formData = inputElement.parentElement;
    formData.setAttribute('data-error', message);
    formData.setAttribute('data-error-visible', 'true');
  }

  hideError(inputElement) {
    const formData = inputElement.parentElement;
    formData.removeAttribute('data-error');
    formData.removeAttribute('data-error-visible');
  }

  displayValidMessage(message) {
    const validMessage = document.querySelector('#text-validMessage');
    const buttonValid = document.querySelector('#valid-btn-close');
    const container = document.querySelector('.container-validMessage');
    this.form.style.display = 'none';
    validMessage.style.display = 'inline-block';
    buttonValid.style.display = 'block';
    container.style.display = 'block';

    // Set the validation message
    validMessage.textContent = message;
  }

  hideValidMessage() {
    const validMessage = document.querySelector('#text-validMessage');
    const buttonValid = document.querySelector('#valid-btn-close');
    const container = document.querySelector('.container-validMessage');
    this.form.style.display = 'block';
    validMessage.style.display = 'none';
    buttonValid.style.display = 'none';
    container.style.display = 'none';
  }

  resetForm() {
    this.form.reset();
  }
}

// Form validation

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;

export const formRules = {
  first: {
    test: (value) => value.length >= 2,
    errorMessage:
      'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
  },
  last: {
    test: (value) => value.length >= 2,
    errorMessage: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
  },
  email: {
    test: (value) => emailRegex.test(value),
    errorMessage: 'Veuillez entrer un email valide.',
  },
  birthdate: {
    test: (value) =>
      value.trim() !== '' &&
      birthdayRegex.test(value) &&
      new Date(value) < new Date(),
    errorMessage: 'Vous devez entrer une date de naissance valide.',
  },
  quantity: {
    test: (value) => !isNaN(value) && value >= 0 && value !== '',
    errorMessage: 'Veuillez entrer un nombre valide.',
  },
  checkboxTerm: {
    test: (value) => value.checked,
    errorMessage:
      'Vous devez vérifier que vous acceptez les termes et conditions.',
  },
};

export default FormValidator;
