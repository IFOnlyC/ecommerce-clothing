import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.style.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmedPassword: '',
};

const SignUpForm = () => {
  const [formfields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmedPassword } = formfields;

  console.log(formfields);

  const formFieldChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formfields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    // 1. check password === confirmedPassword
    if (password !== confirmedPassword) {
      alert('Passwords do not match');
      return;
    }

    // 2. check user authentication
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Can not create a user, email already in use.');
      } else {
        console.log(
          'An Error happened when creating the user: ',
          error.message
        );
      }
    }
  };

  return (
    <div className='signup-form-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={formSubmitHandler}>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
          value={displayName}
          onChange={formFieldChangeHandler}
        />

        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          value={email}
          onChange={formFieldChangeHandler}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          value={password}
          onChange={formFieldChangeHandler}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          name='confirmedPassword'
          value={confirmedPassword}
          onChange={formFieldChangeHandler}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
