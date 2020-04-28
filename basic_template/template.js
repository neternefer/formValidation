/*Validate form with one field of type email
1. Check field on blur
2. If there are errors, show error message
3. Hide error message on blur if field is corrected
4. Call checkForm on every form change
5. checkForm returns a list of checkValidity results for its inputs
6. Call checkSubmit after each checkForm
7. If all items in checkForm list are true === form has no errors
8. Add active class to submit, disabled = false, attach event listener
9. Submit form
*/

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
    const submitBtn = document.querySelector('#submit');
    const inputs = Array.prototype.slice.apply(e.target.form.elements);
    const formErrors = inputs.map((i) => {
        if(!i.disabled || i.type !== 'submit' || i.type !== 'button') {
            if(!i.checkValidity) {
                checkInput(i);
            }
            return i.checkValidity()
        }
    });
    checkSubmit(formErrors, submitBtn)
};

//Check if submit possible
checkSubmit = (lst, btn) => {
    if(lst.every(x => x)) {
        btn.classList.add('active');
        btn.disabled = false;
        btn.addEventListener('click', console.log('Submitted!'));
    }
};


document.querySelector('#email').addEventListener('change', showErrors);
//document.querySelector('#submit').addEventListener('click', console.log('Submitted!'));
document.querySelector('form').addEventListener('change', checkForm);


