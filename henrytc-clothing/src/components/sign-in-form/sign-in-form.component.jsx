import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { ReactComponent as GoogleLogo } from '../../assets/icons8-google.svg';

import './sign-in-form.style.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formfields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formfields;

  const formFieldChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formfields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      // ************ useContext ************
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect Password for your account.');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email.');
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className='signin-form-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={formSubmitHandler}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            <GoogleLogo className='google-logo' />
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
