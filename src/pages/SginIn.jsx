import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/Config"
import { useState } from "react";
import { useNavigate } from "react-router";
import './SignIn.css'

export default function SginIn() {
  let navigate = useNavigate();
  const[email , setEmail] = useState("")
  const[password , setPassword] = useState("")
  const[error , setError] = useState(false)
  const [messageError, setMessageError] = useState("")
  const [resetEmail , setResetEmail] = useState(false)
  const [showForm , setShowForm] = useState(false)
  return (
    <div>
      <Helmet>
        <title>SginIn page</title>
      </Helmet>
      <Header />
      <main>
        <form>
          <input onChange={(e) => {
            setEmail(e.target.value)
          }}
          required type="email" placeholder="Your Email" />
          <input onChange={(e) => {
            setPassword(e.target.value)
          }}
          required type="password" placeholder="Password" />
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log("your login")
                  navigate("/")
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setError(true)
                  // setMessageError(errorMessage)
                  switch (errorCode) {
                    case "auth/invalid-email":
                      setMessageError("Invalid email address.");
                      break;
                    
                    case "auth/user-not-found":
                      setMessageError("User not found."); 
                      break;
                    case "auth/wrong-password":
                      setMessageError("Incorrect password.");
                      break;
                    case "auth/too-many-requests":
                      setMessageError("Too many failed login attempts. Please try again later.");
                      break;
                    default:
                      setMessageError("An error occurred. Please try again.");
                  }
                  console.log("faild login")
                });
            }}
          >
            Sign In
          </button>
          <p className="account">
            Don't have an account? <Link to="/SginUp">Sign Up</Link>
          </p>
          {error && <p>{messageError}</p>}
          <p className="reset-password-link" onClick={() => setShowForm('show-reset-password')}>Forgot Password?</p>
        </form>

        <form className={`reset-password ${showForm}`}>
          <div className="close-btn" onClick={() => setShowForm('')}>X</div>
          <input required type="email" placeholder="Your Email" />
          <button onClick={(e) => {
            e.preventDefault(); 
            setResetEmail(true);
          }}>Reset Password</button>
          {resetEmail && <p className="reset-email">Check your email to reset your password.</p>}
          </form>    
      </main>
      <Footer />
    </div>
  );
}
