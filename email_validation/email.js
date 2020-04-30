const checkAttributeSupport = () => {
    /* Check support for HTML5 input attributes.
     * Set messages with proper input format
     * for browsers that don't support a given feature.
     */
    const inputAttrs = {
        'date': [false, ' Date format: YYYY-MM-DD'],
        'datetime-local': [false, ' Date format: yyyy-mm-ddThh:mm'],
        'email': [false, ' Enter valid email'],
        'month': [false, ' Date format: YYYY-MM'],
        'range': [false, ' Range format: '],
        'time': [false, ' 24 hours time format: hh:mm'],
        'url': [false, ' Enter valid Url'],
        'week': [false, ' Date format: YYYY-Www'],
        'minlength': [false, ' Enter text > min length'],
        'maxlength': [false, ' Enter text < max length'],
        'min': [false, ' Enter value > min value'],
        'max': [false, ' Enter value > max value'],
        'pattern': [false, ' Input must match pattern'],
        'required': [false, ' Field can\'t be empty']
    };
    const randomInput = document.createElement('input');
    let supported = false;
    for(const attr in inputAttrs) {
        if(['date', 'datetime-local', 'email', 'month', 'range', 'time', 'url', 'week'].includes(attr)) {
            randomInput.setAttribute('type', attr);
            supported = randomInput.type !== 'text';
        } else {
            supported = attr in randomInput;
        }
        if(supported) {
            inputAttrs[attr][0] = true;
        } else {
            handleAttributeSupportText(attr, inputAttrs);
        }
    }
    return inputAttrs;
};

const handleAttributeSupportText = (attr, inputAttrs) => {
    const inputsWithAttr = document.getElementsByClassName(`${attr}`);
    for(const i of inputsWithAttr) {
        const attrMsg = i.previousElementSibling.querySelector('.format-text');
        const currentMsg = attrMsg.innerHTML;
        attrMsg.innerHTML = currentMsg + inputAttrs[attr][1];
    };
}

const handleAttributeSupport = () => {
    //If attribute is not supported - no validity check
}

const checkValiditySupport = () => {
    //check if validity is supported
    //which validity properties are supported
}

const handleValiditySupport = () => {
    //if validity is supported, check each field
    //polyfill for not supported validity properties
}

const checkChange = (e) => {
    const field = e.target.value;
}

const attachListeners = () => {
    const formToValidate = document.querySelector('form');
    console.log(formToValidate.elements);
    formToValidate.elements.map((e) => e.addEventListener('change', checkChange));
};
checkAttributeSupport();
checkValiditySupport();

