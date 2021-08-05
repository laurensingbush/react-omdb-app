export default function validateRegister(values) {
    let errors = {};
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!values.firstName) {
        errors.firstName = 'Please enter your first name';
    };
    if (!values.lastName) {
        errors.lastName = 'Please enter your last name';
    };
    if (!values.email || !regexEmail.test(values.email)) {
        errors.email = 'Please enter a valid email address';
    };
    if (!values.password || values.password.length < 7) {
        errors.password = 'Password must 7 or more characters';
    };

    return errors;
};