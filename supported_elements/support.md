# Form Validation

1. HTML5 validation
a. Form features support
   # Email, telephone & URL input types
   Browsers without support for these types will fall back to using the "text" type. No support: IE 6-9, FF 2-3.6, Chrome 4, Safari 3.1-4, Opera Mini
   # Pattern attribute for input fields
   - No support: IE 6-9, FF 2-3.6, Chrome 4-9, Safari 3.1-4, Opera mini, Android Browser 2.1-4.4
   - Unknown: Safari 5, iOS Safari 3.2-4.3
   - Partial: Safari 5.1-10, iOS Safari 5-10.2, Opera Mobile 46
   Partial support refers to not displaying a message for invalid patterns
   Safari browsers support the pattern attribute but will still allow forms to be submitted if the pattern is incorrect.
   # CSS :required
   - No support: IE 6-9, FF 2-3.6, Chrome 4-9, Safari 3.1-4, iOS Safari 3.2-4.3,Android Browser 2.1-4.3
   - Unknown: Opera Mini, UC Browser for Android, QQ, Baidu, KaiOS
b. Form Validation support - checkValidity(), :valid, :invalid, :required
   - IE & Edge do not support :valid on form elements
   - No support: IE 6-9, FF 2-3.6, Chrome 4-9, Safari 3.1-4, iOS Safari 3.2, Android Browser 2.1-3
   - Partial: Safari 5-10, iOS Safari 4-10.2, Opera Mini, ANdroid Browser 4-4.4
   Partial support refers to lack of notice when form with required fields is attempted to be submitted.
   Partial support in Opera Mini refers to only supporting the CSS pseudo classes.
c. Cross browser compatibility
d. What to use
2. Constraints API support
a. Validity State support
b. Validity State properties support
3. JS polyfills
a. Custom
b. 3rd party
4. Validation libraries