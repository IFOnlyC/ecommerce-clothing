// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {
  //   auth,
  signInWithGooglePopup,
  //   signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
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

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // ************ Redirect Sign In ************
  //   const logGoogleRedirectUser = async () => {
  //     const { user } = await signInWithGoogleRedirect();
  //     console.log({ user });
  //   };

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
      {/*  ************ Redirect Sign In ************ */}
      {/* <button onClick={logGoogleRedirectUser}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;
