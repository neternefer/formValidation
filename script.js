document.addEventListener("DOMContentLoaded", () => {

    //Add novalidate attribute
    const forms = document.getElementsByClassName('validate');
    
    for (var i=0;i<forms.length; i++){
        forms[i].noValidate = true;
    }

    //Check validity when the user leaves the field 
    //Remember to rewrite it for legacy browsers - addEven
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
    const toggleErrorClass = function(element){
        if(element.classList.contains('error')){
            element.classList.remove('error');
        }else{
            element.classList.add('error');
        }
    }
    const toggleError = function(field, error){
        toggleErrorClass(field);
        if(field.type === 'radio' && field.name){
            let group = document.getElementsByName(field.name);
            if(group){
                for(var i=0; i < group.length; i++){
                    if(group[i].form !== field.form) continue;
                    toggleErrorClass(group[i]);
                }
            }
            field = group[group.length - 1];
        }
        let id = field.id || field.name;
        console.log(id)
        if(!id) return;
        let message = field.form.querySelector(`.error-message#error-for-${id}`);
        if(!message){
            message = document.createElement('div');
            message.classList.add('error-message');
            message.id = `error-for-${id}`;
            field.parentNode.insertBefore(message, field.nextSibling);
        }
        console.log(message)
        if(!field.hasAttribute('aria-describedby')){
            field.setAttribute('aria-describedby', `error-for-${id}`);
        }else{
            field.removeAttribute('aria-describedby');
        }
        !message.innerHTML ? message.innerHTML = error : message.innerHTML = '';
        message.style.display === '' ? message.style.display = 'block' : message.style.display = 'none';
        message.style.visibility === '' ? message.style.visibility = 'visible' : message.style.visibility = 'hidden';
    };
    

    //Check validity after user leaves the field    
    document.addEventListener('blur', function(event){
    //check if the element is a form field => parent is form el
    if(!event.target.form.classList.contains('validate')) return;
    let error = hasErrors(event.target);
    if(error){
        toggleError(event.target, error);
        return;
    }
    //If no errors, remove visible error messages
    toggleError(event.target, '');
    }, true);

    //Check all fields on submit
    document.addEventListener('submit', function(event){
        if(!event.target.classList.contains('validate')) return;
        let fields = event.target.elements;
        let error, containsError;
        for(var i=0;i<fields.length;i++){
            error = hasErrors(fields[i]);
            if(error){
                console.log(error);
                toggleError(fields[i], error);
                //store the first invalid field
                if(!containsError){
                    containsError = fields[i];
                }   
            }
        }
        //prevent submit if there are errors
        if(containsError){
            event.preventDefault();
            //focus on first invalid field
            containsError.focus()
        }
        //otherwise, let the form submit   
       
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
    let properties = ['badInput', 'patternMismatch', 'stepMismatch', 
        'typeMismatch', 'valueMissing','rangeOverflow', 'rangeUnderflow', 
        'tooLong', 'tooShort', 'valid'];
    //Check if the browser supports ValidityState
    //and if so, which VS properties
    const supported = function(){
        let input = document.createElement('input');
        if('validity' in input){
            for (var i=0;i<properties.length;i++){
                if (!properties[i] in input.validity){
                    return;
                }
            return true;
            }
        return;
        }
    };
    // const getValidityState = function(field){
    //     let type = field.getAttribute('type') || field.nodeName.toLowerCase();//?
    //     let isNum = type === 'number' || type === 'range';
    //     let length = field.value.length;
    //     if(field.type === 'radio' && field.name){
    //         let group = document.getElementsByName(field.name);
    //         if(group.length > 0){
    //             for(var i=0;i<group.length;i++){
    //                 //get selected field
    //                 if(group[i].form === field.form && field.checked){
    //                     field = group[i];
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     const checkValidity = {};
    //     for (var i=0;i<properties.length;i++){
    //         if(properties[i] !== 'valid'){
    //             checkValidity[properties[i]] = false;
    //         }    
    //     };
    //     let valid = true;
    //     for(var key in checkValidity){
    //         if(checkValidity.hasOwnProperty(key)){
    //             if(checkValidity[key]){
    //                 valid = false;
    //                 break;
    //             }
    //         }
    //     }
    //     checkValidity.valid = valid;
    //     return checkValidity;
    // }
    // //Tests
    // badInput:(isNum && length > 0 && !/[-+]?[0-9]/.test(field.value));
    // patternMismatch:(field.hasAttribute('pattern') && length > 0 && new Regex(
    //     field.getAttribute('pattern')).test(field.value));
    // rangeOverflow:(field.hasAttribute('max') && isNum && field.value > 1 && parseInt(
    //     field.value, 10) > parseInt(field.getAttribute('max'), 10));
    // rangeUnderflow:(field.hasAttribute('min') && isNum && field.value > 1 && parseInt(
    //     field.value, 10) < parseInt(field.getAttribute('min'), 10));
    // stepMismatch:(field.hasAttribute('step') && isNum && field.getAttribute('step') !== 'any'&&
    //     Number(field.value) % parseFloat(field.getAttribute('step')) !== 0);
    // tooLong:(field.hasAttribute('maxlength') && field.getAttribute('maxlength') > 0 &&
    //     length > parseInt(field.getAttribute('maxlength'), 10));
    // tooShort:(field.hasAttribute('minlength') && field.getAttribute('minlength') > 0 &&
    //     length > 0 && length < parseInt(field.getAttribute('minlength'), 10));
    // typeMismatch:(length > 0 && ((type === 'email' && 
    //     !/^\S+@\S+\.\S+$/.test(field.value)) || 
    //     (type === 'url' && 
    //     !/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,5})?(?:[\/?#]\S*)?$/.test(field.value))));
    // valueMissing:(field.hasAttribute('required') && (((type === 'radio' || type === 'checkbox') &&
    // !field.checked) || (type === 'select' && field.options[field.selectedIndex].value < 1) 
    // || (type !== 'checkbox' && type !== 'radio' && type !== 'select' && length < 1)));
    checkSupport();
});


