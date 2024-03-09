//success modal
const closeModalSuccess = document.getElementById("close-modal-success");
const modalSuccess = document.getElementById("modal-success");
if (modalSuccess) {
  modalSuccess.showModal();
}

if (closeModalSuccess) {
  closeModalSuccess.addEventListener("click", () => {
    modalSuccess.close();
  });
}

// create account modal // sign-up-modal
const dialogElement = document.getElementById("modal-sign-up");
const closeDialogElement = document.getElementById("close-dialog");
const openDialogElement = document.getElementById("create-account");
closeDialogElement.addEventListener("click", () => {
  dialogElement.close();
});
openDialogElement.addEventListener("click", showModal);
function showModal() {
  dialogElement.showModal();
}

// open  modal for forgot password
const forgotPasswordElement = document.getElementById("forgot-password");
const openChangePassword = document.getElementById("modal-change-password");
forgotPasswordElement.addEventListener("click", () => {
  openChangePassword.showModal();
});

// radio design
const inputRadioError = document.querySelector(".birthday div");
const inputRadioDiv = document.querySelectorAll(".form-content-row div");
const inputRadioElements = document.querySelectorAll(
  ".form-content-row div input"
);
const radioActiveBorder = inputRadioError.dataset.error;

if (radioActiveBorder) {
  // multiple radio error
  for (let i = 0; i < inputRadioDiv.length; i++) {
    const radioActiveValue = inputRadioError.dataset.value;
    if (radioActiveBorder) {
      inputRadioDiv[i].classList.add("active");
    }

    if (radioActiveValue === inputRadioElements[i].value) {
      inputRadioElements[i].checked = "true";
    }

    inputRadioElements[i].addEventListener("click", function () {
      removeAllActiveRadio();
    });
  }
}

function removeAllActiveRadio() {
  for (let i = 0; i < inputRadioDiv.length; i++) {
    inputRadioDiv[i].classList.remove("active");
  }
}

// fast??
// function removeAllActive() {
//   inputRadioDiv[0].classList.remove("active");
//   inputRadioDiv[1].classList.remove("active");
//   inputRadioDiv[2].classList.remove("active");
// }

// change-password-error-design
const errorElement = document.querySelectorAll(".form-content")[1].children[7];
const inputChangePassword = document.querySelectorAll(
  "#modal-change-password form input"
);
const changePasswordError = document.getElementById("change-password-error");
if (changePasswordError) {
  inputDesign(inputChangePassword, errorElement, openChangePassword);
}

// sign-up-error-design
const inputElements = document.querySelectorAll(".form-content-sign-up input");
const errorElementSignUp =
  document.querySelectorAll(".form-content")[0].children[4];
const errorSignUp = document.getElementById("error-signup");

if (errorSignUp) {
  inputDesign(inputElements, errorElementSignUp, dialogElement);
}

// function for the error design
function inputDesign(element, errorElement, modal) {
  for (let i in element) {
    let errorMessage = element[i].dataset.error; // error message of different input
    let selectedInput = element[i];
    if (errorMessage) {
      // if it has error message input
      element[i].classList.add("active");
      modal.showModal(); // it will show modal again after render // it depends on the session
      element[i].addEventListener("change", function () {
        // remove message in when changing input
        const error = document.querySelector(".error-tip");
        element[i].classList.remove("active");
        error.classList.remove(selectedInput.name);
        error.textContent = "";
        errorMessage = "";
      });

      element[i].addEventListener("focus", () => {
        // add error message in focus
        if (errorElement && errorMessage) {
          errorElement.innerHTML = ` <p class= "error-tip ${selectedInput.name}"> ${errorMessage} </p>`;
        }
      });
    }
  }
}

// for login error
const loginError = document.getElementById("login-error");
const loginInput = document.querySelectorAll(".login-js input");

if (loginError) {
  for (let i in loginInput) {
    loginInput[i].addEventListener("change", () => {
      loginError.textContent = "";
    });
  }
}
