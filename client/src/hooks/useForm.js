import React, { useState, useCallback } from 'react';

export const useForm = (initialValues, callback, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const formValues = {...initialValues};
    Object.keys(formValues).forEach(value => formValues[value] = false);
    const [clicked, setClicked] = useState(formValues);
    const validSubmit = Object.keys(errors).length === 0 && !Object.values(values).some(value => value === '');
    
    // validate input & only show errors in fields that have been clicked
    const handleBlur = (e) => {
        const name = e.target.name;
        setClicked({
            ...clicked,
            [name]: true
        });
    
        setErrors(validate(values));
    };

    // call useAuth function on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validSubmit) {
            return;
        }
        await callback(values);
    };

    // set values and errors when input changes
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
       
        validate 
            ? setValues((values) => {
                const newValues = {...values, [name]: value};
                setErrors(validate(newValues));
                return newValues;
            }) 
            : setValues({
                ...values,
                [name]: value
            })
    }, [values]);

    return { values, errors, handleChange, handleSubmit, handleBlur, validSubmit, clicked };
};
