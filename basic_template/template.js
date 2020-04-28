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

document.querySelector(input[type='email']).addEventListener('blur', checkInput);