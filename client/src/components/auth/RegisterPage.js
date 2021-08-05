import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import validateRegister from '../../utils/formValidation';
import PasswordInput from './PasswordInput';

const RegisterPage = () => {
    const { registerUser, error, setError } = useAuth();
    const { values, errors, handleChange, handleSubmit, handleBlur, validSubmit, clicked } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }, registerUser, validateRegister);

    const resetServerError = () => {
        setError('');
    };
    
    return (
        <div className='register-form-container'>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} aria-label='register form'>
                <div className='form-item'>
                    <label htmlFor='firstName' className='required'>First Name</label>
                    <input
                        type='text'
                        aria-label='first name input'
                        id='firstName'
                        placeholder='First Name'
                        name='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='off' 
                        className={errors.firstName && clicked.firstName ? 'input-error capitalize' : 'capitalize'}
                    />
                    <div className={errors.firstName && clicked.firstName ? 'input-error-feedback show' : 'input-error-feedback'}>
                        <BiErrorCircle className='error-icon' />
                        {errors.firstName}
                    </div>
                </div>
                <div className='form-item'>
                    <label htmlFor='lastName' className='required'>Last Name</label>
                    <input
                        type='text'
                        aria-label='last name input'
                        id='lastName'
                        placeholder='Last Name'
                        name='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='off'
                        className={errors.lastName && clicked.lastName ? 'input-error capitalize' : 'capitalize'} 
                    />
                    <div className={errors.lastName && clicked.lastName ? 'input-error-feedback show' : 'input-error-feedback'}>
                        <BiErrorCircle className='error-icon' />
                        {errors.lastName}
                    </div>
                </div>
                <div className='form-item'>
                    <label htmlFor='email' className='required'>Email</label>
                    <input
                        type='text'
                        aria-label='email input'
                        id='email'
                        placeholder='Email'
                        name='email'
                        value={values.email}
                        onChange={(e) => {handleChange(e); resetServerError()}}
                        onBlur={handleBlur}
                        autoComplete='off' 
                        className={errors.email && clicked.email || error ? 'input-error' : ''}
                    />
                    <div className={errors.email && clicked.email ? 'input-error-feedback show' : 'input-error-feedback'}>
                        <BiErrorCircle className='error-icon' />
                        {errors.email}
                    </div>
                </div>
                <div className='form-item'>
                    <label htmlFor='password' className='required'>Password</label>
                    <PasswordInput 
                        type={'password'}
                        aria-label={'password input'}
                        id={'password'}
                        placeholder={'Password'}
                        name={'password'}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete={'off'}
                        className={errors.password && clicked.password ? 'input-error' : ''}
                    />
                    {errors.password ? (
                        <div className={errors.password && clicked.password ? 'input-error-feedback show' : 'input-error-feedback'}>
                            <BiErrorCircle className='error-icon' />
                            {errors.password}
                        </div>
                    ) : (
                        <div className={error ? 'input-error-feedback show' : 'input-error-feedback'}>
                            <BiErrorCircle className='error-icon' />
                            {error}
                        </div>
                    )}
                </div>
                <div className='form-item'>
                    <button onClick={handleSubmit} disabled={!validSubmit} className='submit-btn' aria-label='submit'>
                        Create Account
                    </button>
                </div>
                <div className='form-item form-redirect'>
                    Already have an account?
                    <a href="/login">Log In</a>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;