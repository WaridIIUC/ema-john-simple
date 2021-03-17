
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFBSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailandPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: ""
  });

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    });
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    });
  }

  
  const fBSignIn = () => {
    handleFBSignIn()
    .then(res => {
      handleResponse(res, true);
    });
  }

  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      });
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailandPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      });
    }
    event.preventDefault();
  }

  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      //console.log(isFieldValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
  return (
    <div style = {{textAlign: "center"}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn} className = "btn btn-primary">Sign In</button>
      }
      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>

      }
      <br />
      <button onClick={fBSignIn}  className = "btn btn-info">Sign In by Facebook</button>

      {/* //login by us */}

      <h1>Our own Login</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label htmlFor="newUser">New User SignUp</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleChange} id="" />}
        <br />
        <input type="text" onBlur={handleChange} name="email" id="" placeholder="Email" required />
        <br />
        <input type="password" onBlur={handleChange} name="password" id="" placeholder="Password" required />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"}  className = "btn btn-success"/>
      </form>
      {
        user.success && <p>User {newUser ? "Authentication" : "Login"} Success</p>
      }
      <p>{user.error}</p>
    </div>
  );
}

export default Login;
