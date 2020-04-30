# HTML5

1. Input type="email"
- validation based on :valid/:invalid pseudo-classes
- valid input:
    - empty
    - valid email: name@domain or name@domain.end
    - list of valid addressed if multiple attribute specified
- multiple attribute will accept '' or whitespace as valid (zero length list)
- fallback to text field on not supporting browsers
- pattern can be used but should it?
    - only check if @ in input
    - check for valid characters before and after the @
    - full regex trying to match specification
    - Use the title attribute to specify text that most browsers will display    as a tooltip to explain what the requirements are to match the pattern. You should also include other explanatory text nearby.
- placeholder can be used but should it?
    - word or example
2. Required

# Constraints API
- checkValidity(), setCustomValidity()

# Validity State
- valueMissing, typeMismatch, patternMismatch

# Polyfills
- required
- valid format

# Legacy browsers
- JS syntax