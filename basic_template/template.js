//Set novalidate property of form to true
document.querySelector('form').noValidate = true;

//Check input field when user leaves
checkInput = (input) => {
    const validity = input.validity;
    if(input.type === 'submit' || input.type === 'button' || input.disabled) return;
    if(validity.valid) return;
    if(validity.valueMissing) return 'This field can\'t be empty.';
    if(validity.typeMismatch || validity.patternMismatch){
        if(field.type === 'email'){
            return 'Please check the email is in the format: name@domain.com';
        }
    };
};

//Check form - after every form change
checkForm = (form) => {
    const inputs = Array.prototype.slice.apply(form.elements);
    const formErrors = inputs.map((i) => {
        if(!i.checkValidity) {
            checkInput(i);
        }
        return i.checkValidity()
    });
    console.log('formErrors: ', formErrors)
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

    document.querySelector('#email').addEventListener('blur', checkInput);
    document.querySelector('#submit').addEventListener('click', checkAll);


