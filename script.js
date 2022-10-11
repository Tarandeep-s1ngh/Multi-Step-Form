const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const progress = document.getElementById("progress");
const submitBtn = document.getElementById("submit-btn");
const passwordLabel = document.getElementById("password-label");
const confirmPasswordLabel = document.getElementById("confirm-password-label");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

const showCurrentStep = () => {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
};

const checkPassword = (psw) => {
  var generalValidator = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return generalValidator.test(psw);
}

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]") || currentStep===0 && e.target.matches("[data-prog2]") || currentStep===0 && e.target.matches("[data-prog3]") || currentStep===1 && e.target.matches("[data-prog2]") || currentStep===1 && e.target.matches("[data-prog3]") ) {
    incrementor = 1;
    const inputs = [...formSteps[currentStep].querySelectorAll("input")];
    const allValid = inputs.every((input) => input.reportValidity());
    if (allValid && checkPassword(passwordInput.value) && passwordInput.value === confirmPasswordInput.value) {
      currentStep += incrementor;
      passwordLabel.innerText = "";
      confirmPasswordLabel.innerText = "";
      switch (currentStep) {
        case 0: {
          progress.style.width = "110px";
          break;
        }
        case 1: {
          progress.style.width = "220px";
            const rememberMe = document.getElementById("remember-me");
            if(rememberMe.checked) {
                submitBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const allInputs = [...document.getElementsByTagName("input")];
                    let formData = [];
                    for(let i=0; i<allInputs.length; i++) {
                        if(allInputs[i].name === "gender") {
                            if(allInputs[i].checked) {
                                formData.push({name: allInputs[i].name, value: allInputs[i].id});
                            }
                            else continue;
                        } else {
                            formData.push({name: allInputs[i].name, value: allInputs[i].value});
                        }
                    }
                    localStorage.setItem("FORMDATA", JSON.stringify(formData));
                })
            }
          break;
        }
        case 2: {
          progress.style.width = "330px";
          break;
        }
      }
      showCurrentStep();
    }
  } else if (e.target.matches("[data-previous]") || e.target.matches("[data-prog1]") || e.target.matches("[data-prog2]")) {
    if( currentStep===2 && e.target.matches("[data-prog1]")) {
      incrementor = -2;
    } else {
      incrementor = -1;
    }
    currentStep += incrementor;
    switch (currentStep) {
      case 0: {
        progress.style.width = "110px";
        break;
      }
      case 1: {
        progress.style.width = "220px";
        break;
      }
      case 2: {
        progress.style.width = "330px";
        break;
      }
    }
    showCurrentStep();
  } if(e.target.matches("[data-next]") && !checkPassword(passwordInput.value)) {
    passwordLabel.innerText = "Password must contain min. 8 characters, one uppercase letter, lowercase letter, number & symbol.";
  } if(e.target.matches("[data-next]") && passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordLabel.innerText = "Passwords does not match.";
  } 

  if (incrementor == null) return;
});
