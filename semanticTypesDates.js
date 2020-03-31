//Check if the browser supports sematic types and attributes
    //   - min, max, min-length, range
    //   - date, time, datetime-local, month, week
    //   - required, checked
//Create custom UI for date/time types with select/options
    //   - for datetime-locale /timezone in hidden possible/

document.addEventListener("DOMContentLoaded", () => {   
    const fallbackElements = document.getElementsByClassName('fallback');
    const fallbackLabelElements = document.getElementsByClassName('fallbackLabel');
    const fallbacks = [...fallbackElements, ...fallbackLabelElements];
    const nativeElements = document.getElementsByClassName('native');
    for(const f of fallbacks){
        f.style.display= 'none';
    };
    //Helper functions
    const selectPopulate = (min, max, selectElement) => {
        for(var i = min;i <= max;i++){
            let option = document.createElement('option');
            option.textContent = (i < 10) ? '0' + i : i;
            selectElement.appendChild(option);
        }
    };
    const weekPopulate = () => {
        selectPopulate(1, 52, fallbackWeek);
        yearPopulate();
    };
    const yearPopulate = () => {
        let date = new Date();
        let year = date.getFullYear();
        selectPopulate(year, year + 10, fallbackYear);
    };
    const dayPopulate = (month, year) => {
        //could try extracting min/max days if supported
        //add code to calculate days according to months/leap years
        //populate days
    };
    const datePopulate = (min, max) => {
        dayPopulate(min, max);
        yearPopulate();
    };
    const datetimePopulate = () => {

    };
    const monthPopulate = () => {
        yearPopulate();
    };
    const timePopulate = () => {
        //add check if min/max supported here
        //set default values if it's not
        let min = document.getElementById('time').getAttribute('min');
        let max = document.getElementById('time').getAttribute('max');
        selectPopulate(min, max, fallbackHour);
        selectPopulate(0, 59, fallbackMinute);
    };
    const typeHandlers = {
        'date': datePopulate, 'time': timePopulate,'month': monthPopulate,'week': weekPopulate,
        'datetime-local': datetimePopulate
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
                setFallback(type);
            }
        }
    };
    //Show fallback elements if type not supported
    const setFallback = (type) => {
        if(!checkSemanticSupport(type)){
            const functionName = typeHandlers[type];
            functionName();
            for(const f of fallbacks){
                f.style.display= 'block';
            };
            for(const n of nativeElements){
                n.style.display= 'none';
            };
        }   
    };
    checkTypesPresent();
}); 