// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.style.scss';

const Authentication = () => {
  // ************ Redirect Sign In ************
  //   useEffect(
  //     () => async () => {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const userDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //     },
  //     []
  //   );

  // ************ Redirect Sign In ************
  //   const logGoogleRedirectUser = async () => {
  //     const { user } = await signInWithGoogleRedirect();
  //     console.log({ user });
  //   };

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
      {/*  ************ Redirect Sign In ************ */}
      {/* <button onClick={logGoogleRedirectUser}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
};

export default Authentication;
