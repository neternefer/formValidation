document.addEventListener("DOMContentLoaded", () => {

    //Add novalidate attribute
    const forms = document.getElementsByClassName('validate');
    
    for (var i=0;i<forms.length; i++){
        forms[i].noValidate = true;
    }

    //Check validity when the user leaves the field 
    //Remember to rewrite ot for legacy browsers - addEvent
    const hasErrors = function(field){
        if(field.disabled || field.type === 'file' || field.type === 'reset'
            || field.type === 'submit' || field.type === 'button') return;
        let validity = field.validity;
        if(validity.valid) return;
        if(validity.valueMissing) return 'This field can\'t be empty.';
        if(validity.typeMismatch){
            if(field.type === 'email'){
                return 'Please enter a valid email address.';
            }
            if(field.type === 'url'){
                return 'Please enter a valid URL.';
            }
        };
        if(validity.tooShort) return `This field requires at least ${field.getAttribute('minLength')} characters, ${field.value.length} entered.`;
        if(validity.tooLong) return `This field requires at most ${field.getAttribute('minLength')} characters, ${field.value.length} entered.`;
        if(validity.badInput) return 'Please enter a number.';
        if(validity.stepMismatch) return 'Plese enter a valid value.';
        if(validity.rangeOverflow) return `Please select a value under ${field.getAttribute('max')}.`;
        if(validity.rangeUnderflow) return `Please select a value over ${field.getAttribute('min')}.`;
        if(validity.patternMismatch){
            if(field.hasAttribute('title')){
                return field.getAttribute('title');
            }
            return 'Please match the requested format.';
        };
        return 'The value you entered is invalid';
    };
    //Show custom error messages
    const showErrors = function(field, error){
        field.classList.add('error');
        //for group radio buttons, getthe last one to display
        //error message underneath
        if(field.type === 'radio' && field.name){
            let group = document.getElementsByName(field.name);
            if(group.length > 0){
                for(var i=0;i<group.length;i++){
                    //only target radios in the current form
                    if(group[i].form !== field.form) continue;
                    group[i].classList.add('error');
                }
                //set field to the last element in the group
                field = group[group.length - 1];
            }
        }
        const id = field.id || field.name;
        if(!id) return;
        //if the error message already exists, update it
        let message = field.form.querySelector(`.error-message#error-for-${id}`);
        if(!message){
            message = document.createElement('div');
            message.className = 'error-message';
            message.id = `error-for-${id}`;
        };
        //if the field is radio/checkbox, insert error message AFTER the label
        let label;
        if(field.type == 'radio' || field.type === 'checkbox'){
            label = field.form.querySelector(`label[for="${id}"]`) || field.parentNode;
            if(label){
                label.parentNode.insertBefore(message, label.nextSibling);
            }
        }
        if(!label){
            field.parentNode.insertBefore(message, field.nextSibling);
        }
        //add aria role -> div with error message describes input field
        field.setAttribute('aria-describedby', `error-for-${id}`);
        //div is currently empty, add text  
        message.innerHTML = error;
        //show message div
        message.style.display = 'block';
        message.style.visibility = 'visible';
    };
    //Hide error message after successful validation
    const hideError = function(field){
        field.classList.remove('error');
        //if the field is a radio group, get the last one
        if(field.type === 'radio' && field.name){
            let group = document.getElementsByName(field.name);
            if(group.length > 0){
                for(var i=0;i<group.length;i++){
                    if(group[i].form !== field.form) continue;
                    group[i].classList.remove('error');
                }
                field = group[group.length - 1];
            }
        }
        field.removeAttribute('aria-describedby');
        const id = field.id || field.name;
        if(!id) return;
        let message = field.form.querySelector(`.error-message#error-for-${id}`);
        if(!message) return;
        message.innerHTML = ''
        message.style.display = 'none';
        message.style.visibility = 'hidden';   
    };

    //Check validity after user leaves the field    
    document.addEventListener('blur', function(event){
    //check if the element is a form field => parent is form el
    if(!event.target.form.classList.contains('validate')) return;
    let error = hasErrors(event.target);
    if(error){
        showErrors(event.target, error);
        return;
    }
    //If no errors, remove visible error messages
    hideError(event.target);
    }, true);

    //Check all fields on submit
    document.addEventListener('submit', function(event){
        if(!event.target.form.classList.contains('validate')) return;
        
       
    }, false);

    //Check if the browser supports semantic types
    //If not, show additional format instructions
    const checkSupport = () => {
        //let inputs =  Array.from({length:3}).map(x => document.createElement('input')); //ES6
        let inputs = new Array(3);
        let types = ['date', 'time', 'month'];
        let value = 'a';

        for(var i=0;i<types.length;i++){
            inputs[i] = document.createElement('input');
            inputs[i].setAttribute('value', value);
            inputs[i].setAttribute('type', types[i]);
            if(inputs[i].value !== value){
                document.documentElement.className += `supports-${types[i]} `
            }
        }
    };  

    checkSupport();
});


