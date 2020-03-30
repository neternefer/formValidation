

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