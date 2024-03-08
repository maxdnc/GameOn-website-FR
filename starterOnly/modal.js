import FormValidator, { formRules } from './form.js';

class ModalManager {
  constructor(modalId, openButtonsIds, closeButtonsIds) {
    //Select the Modal
    this.modal = document.querySelector(modalId);
    //Select the close buttons
    this.closeButtons = this.selectElements(closeButtonsIds);
    //Select the open buttons
    this.openButtons = this.selectElements(openButtonsIds);
  }

  // Method to select elements

  selectElements(elements) {
    return document.querySelectorAll(
      Array.isArray(elements) ? elements.join(',') : elements
    );
  }

  // Method to add event listeners to an array of buttons
  addEventListeners(buttons, action) {
    buttons.forEach((button) => {
      button.addEventListener('click', action);
    });
  }

  // Method to bind click events to open and close buttons
  buttonEvents() {
    this.addEventListeners(this.openButtons, () => this.open());
    this.addEventListeners(this.closeButtons, () => this.close());
  }

  open() {
    this.modal.style.display = 'block';
  }

  // Method to open the modal
  close() {
    this.modal.style.display = 'none';

    // Reset the form
    for (const fieldId in formValidator.fields) {
      const field = document.getElementById(fieldId);
      formValidator.hideError(field);
    }
    const location = document.getElementsByName('location');
    formValidator.hideError(location[0]);
    formValidator.hideValidMessage();

    formValidator.resetForm();
  }
}

// Create a new instance of the ModalManager class
const signUpModal = new ModalManager('.bground', '.modal-btn', [
  '.close',
  '#valid-btn-close',
]);

// Bind the click events to the open and close buttons
signUpModal.buttonEvents();

// Form validation
const formValidator = new FormValidator('reserveForm', formRules);

// nav  bar responsive

function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}
document.getElementById('nav-icon').addEventListener('click', editNav);
