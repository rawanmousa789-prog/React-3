import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { auth } from "../firebase/Config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";

// signin with email verification
export default function SginUp() {
  const [user, loading, error] = useAuthState(auth);

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [Error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
// loading
  if (loading) {
    return (
      <div>
        <Header />
        <p>Initialising User...</p>
        <Footer />
      </div>
    );
  }
  //error
    if (error) {
      return (
        <div>
          <Header />
          <p>Error: {error}</p>
          <Footer />
        </div>
      );
    }
  // signin without email verification
  if(user){
    if(user.emailVerified){ 
      navigate("/")
    }
    if(!user.emailVerified){
      navigate("/")
    }
  }
  // not signin
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>Sgin Up page</title>
        </Helmet>
        <Header />
        <main>
          <form>
            <p>Create a new account</p>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
              type="text"
              placeholder="user name"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              placeholder="Your Email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    
                    const user = userCredential.user;
                    console.log("sign up success!!");
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                      // Email verification sent!
                      console.log("Email verification sent!");
                    });
                    updateProfile(auth.currentUser, {
                      displayName: userName,
                    })
                      .then(() => {
                        // Profile updated!
                        console.log("success update profile");
                      })
                      .catch((error) => {
                        // An error occurred
                        console.log("error update profile");
                      });
                    navigate("/");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(true);
                    switch (errorCode) {
                      case "auth/email-already-in-use":
                        setMessageError("Email already in use.");
                        break;
                      case "auth/invalid-email":
                        setMessageError("Invalid email address.");
                        break;
                      case "auth/weak-password":
                        setMessageError(
                          "Password should be at least 6 characters.",
                        );
                        break;
                      default:
                        setMessageError("An error occurred. Please try again.");
                    }
                    console.log("error!!!");
                    console.log(errorCode);
                    console.log(errorMessage);
                  });
              }}
            >
              Sign Up
            </button>
            <p className="account">
              Already have an account?<Link to="/SginIn"> Sign In</Link>
            </p>
            {Error && <p>{messageError}</p>}
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}
