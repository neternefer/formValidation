//Set novalidate property of form to true
document.querySelector('form').noValidate = true;

//Check input field when user leaves
checkInput = (input) => {
    const validity = input.validity;
    if(input.type === 'submit' || input.type === 'button' || input.disabled) return;
    if(validity.valid) return;
    if(validity.valueMissing) return 'This field can\'t be empty.';
    if(validity.typeMismatch || validity.patternMismatch){
        if(input.type === 'email'){
            return 'Please check the email is in the format: name@domain.com';
        }
    };
};

//Show/hide errors
//TODO: change or blur
showErrors = (e) => {
    const errorMsg = document.querySelector(`#error-msg-${e.target.id}`)
    if(checkInput(e.target)) {
        errorMsg.innerHTML = checkInput(e.target);
    } else {
        errorMsg.innerHTML = '';
    };
};

//Check form - after every form change
checkForm = (e) => {
    const inputs = Array.prototype.slice.apply(e.target.form.elements);
    const formErrors = inputs.map((i) => {
        if(!i.checkValidity) {
            checkInput(i);
        }
        return i.checkValidity()
    });
    return formErrors;
};

//Check if submit possible
checkSubmit = (lst, btn) => {
    console.log('checkSubmit lst arg: ', lst)
    if(lst.every(x => x)) {
        btn.classList.add('active');
        btn.disabled = false;
        console.log('Submitted!')
    }
    console.log('not submitted')
};

//Show errors
//Hide errors
//Main function - scope?
checkAll = () => {
    console.log('checkAll')
    const formToCheck = document.querySelector('form');
    const submitBtn = document.querySelector('#submit');
    const validityLst = checkForm(formToCheck);
    console.log('ValidityLst: ', validityLst)
    checkSubmit(validityLst, submitBtn);
};

document.querySelector('#email').addEventListener('blur', showErrors);
document.querySelector('#submit').addEventListener('click', checkAll);
document.querySelector('form').addEventListener('change', checkForm);


