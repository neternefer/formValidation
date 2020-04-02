//Check if the browser supports sematic types and attributes
    //   - min, max, min-length, range
    //   - date, time, datetime-local, month, week
    //   - required, checked
//Create custom UI for date/time types with select/options
    //   - for datetime-locale /timezone in hidden possible/

document.addEventListener("DOMContentLoaded", () => {   
    const nativeElements = document.getElementsByClassName('native');
    let min = document.getElementById('time').getAttribute('min');
    let max = document.getElementById('time').getAttribute('max');
    let idCounter = 0;
    //Helper functions
    const selectPopulate = (min, max) => {
        let fragment = new DocumentFragment();
        for(var i = parseInt(min);i <= parseInt(max);i++){
            let option = document.createElement('option'); 
            option.textContent = (i < 10) ? '0' + i : i;
            fragment.appendChild(option);
           
        }
        return fragment;
    };
    const week = () => {return selectPopulate(1, 52);};
    const year = () => {
        let date = new Date();
        let year = date.getFullYear();
        console.log(year)
        return selectPopulate(year, year + 10);
    };
    const day = (month, year) => {
        if(month in ["April", "June", "September", "November"]){
            selectPopulate(1, 30);
        }
        if(month === 'February'){
            let dayNum = 0;
            const isLeap = new Date(year, 1, 29).getMonth() === 1;
            dayNum = isLeap ? 29 : 28;
            selectPopulate(1, dayNum);

        }else{
            selectPopulate(1, 31);
        }
    };
    const hour = () => {
        let min = document.querySelector('#time').getAttribute('min');
        let max = document.querySelector('#time').getAttribute('max');
        return selectPopulate(min.slice(0, min.indexOf(':')), max.slice(0, max.indexOf(':')));
    };
    
    const minute = () => {
        let min = document.querySelector('#time').getAttribute('min');
        let max = document.querySelector('#time').getAttribute('max');
        return selectPopulate(min.slice(min.indexOf(':') + 1), max.slice(max.indexOf(':') + 1));
    };
    const month = () => {
        const monthNames = ["January", "February", "March", "April",
            "May", "June", "July", "August", "September", "October", 
            "November", "December"];
        let fragment = new DocumentFragment();
        for(var i = 0;i <= monthNames.length;i++){
            let option = document.createElement('option');
            option.textContent = monthNames[i];
            fragment.appendChild(option);
        }
        return fragment;
    };
    const typeHandlers = {
        'date': [day, year], 
        'time': [hour, minute],
        'month': [month, year],
        'week': [week, year],
        'datetime-local': [day, month, year,
            hour, minute]
    };
    //Check support for semantic date/time types
    const checkSemanticSupport = (type) => {
        let newElement = document.createElement('input');
        newElement.setAttribute('type', type);
        newElement.setAttribute('value', 'a');
         if(newElement.type !== type && newElement.type === 'text'){
            return false;
        }else{
            return true;
        }
    }; 
    //Check if date/time types present in html
    const checkTypesPresent = () => {
        for(const type in typeHandlers){
            if(document.getElementById(type) === null){
                continue;
            }else{
                console.log('calling setFallback')
                setFallback(type);
            }
        }
    };
    //Show fallback elements if type not supported
    const setFallback = (type) => {
        if(checkSemanticSupport(type)){
            const parentDiv = document.querySelector(`.${type}s`);
            const p = parentDiv.appendChild(document.createElement('p'));
            p.setAttribute('class', 'fallbackLabel');
            const d = parentDiv.appendChild(document.createElement('div'));
            d.setAttribute('class', 'fallback');
            const functionName = typeHandlers[type];
            for(var i=0;i<functionName.length;i++){
                let currentFallback = createFallbackElement(type, functionName[i].name);
                if(functionName[i].name === day){
                    yearArg = parentDiv.querySelector('[name=year]').value;
                    monthArg = parentDiv.querySelector('[name=month]').value;
                    currentFallback.appendChild(functionName[i](monthArg, yearArg));
                }
                console.log(functionName[i].name)
                currentFallback.appendChild(functionName[i]());
            }
            for(const n of nativeElements){
                n.style.display= 'none';
            };
        }   
    }; 
    const createFallbackElement = (type, func) => {
        let fallbackId = `fallback${type.toLowerCase()}`;
        if(document.getElementById(fallbackId) !== null){
            fallbackId += idCounter;
            idCounter += 1;
        }
        const parentElement = document.querySelector(`.${type}s div.fallback`);
        const span = document.createElement('span');
        parentElement.insertAdjacentElement('afterbegin', span);
        const l = document.createElement('label');
        l.setAttribute('for', `${fallbackId}`);
        l.innerText = `${func.toUpperCase()}:`;
        span.insertAdjacentElement('afterbegin', l);
        const s = document.createElement('select');
        s.setAttribute('id', `${fallbackId}`);
        s.setAttribute('name', `${func}`);
        span.insertAdjacentElement('beforeend', s);
        // parentElement.innerHTML =
        //     `<span><label for=${fallbackId}>${func.toUpperCase()}:</label>
        //     <select id=${fallbackId} name=${func}></select></span>`;
        return document.getElementById(`${fallbackId}`);
    }
    checkTypesPresent();
}); 