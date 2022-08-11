import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaGLjG0NPaDZTGutFBQIaz0crFB0_TKeQ",
  authDomain: "first-login-am.firebaseapp.com",
  projectId: "first-login-am",
  storageBucket: "first-login-am.appspot.com",
  messagingSenderId: "374106482441",
  appId: "1:374106482441:web:644d64d86b216f53a795d8",
};

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const connectAuth = async () => {
    //connect to firebase project
    const app = initializeApp(firebaseConfig);
    // connect to Auth
    return getAuth(app);
  };

  const handleLogin = async () => {
    const auth = await connectAuth();
    const user = await signInWithEmailAndPassword(auth, email, password).catch(
      (err) => alert(err.message)
    );
    //if all ok ..
    if (user) setIsLoggedIn(true);
  };

  const handleSignUp = async () => {
    const auth = await connectAuth();
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => alert(err.message));
    //if all ok ..
    if (user) {
      console.log(user.user);
      setIsLoggedIn(true);
      //if error
      //popup error
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault}>
      <label htmlFor="email">
        Email:
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="you@here.com"
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          name="password"
          type="email"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>&nbsp;
      <button onClick={handleSignUp}>Sign Up</button>
    </form>
  );
}

export default Login;
