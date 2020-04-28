document.addEventListener('DOMContentLoaded', function(){
    //1. Check if the browser supports form validation
    //a. does checkValidity() function exists
    //b. does the browser report/prevents submit ?
    const checkSupport = () => {
        return (typeof document.createElement('input').checkValidity == 'function');
    };
    // const checkReport = () => {
    //     return 'reportValidity' in document.createElement('form');
    // };
    //2. Check if the browser supports sematic types
    //   - min, max, min-length, range
    //   - date, time, datetime-local, month, week
    // *required -> find not required and exlude
    //a. use patterns + patterns descriptions
    //b. Safari/Android supports patterns but doesn't report
    //c. if pattern not supported - fallback is text - use e.g. length

    //Check if the browser supports semantic types
    //If not, show additional format instructions
    const checkSupport = () => {
        //let inputs =  Array.from({length:3}).map(x => document.createElement('input')); //ES6
        let inputs = new Array(3);
        let types = ['date', 'time', 'month', 'week', 'datetime-local'];
        let value = 'a';
        //type=week has no validation, native UI handles it
        //add pattern + description text about format YYYY-Www
        //check for empty, valid years, valid week ranges (for years)
        //or create a custom date picker
        for(var i=0;i<types.length;i++){
            inputs[i] = document.createElement('input');
            inputs[i].setAttribute('type', types[i]);
            inputs[i].setAttribute('value', value);
            if(inputs[i].value !== value){
                document.documentElement.className += `supports-${types[i]} `
            }
        }
    };  
    //3. Validity State
    //a. support
    //b. support for VS properties
    //   - badInput/tooShort/tooLong
    //4. Add novalidate to use JS
    //a. what about custom
    //5. Polyfills
    checkSupport();
    checkReport();
});
