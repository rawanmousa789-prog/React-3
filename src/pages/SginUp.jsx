import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import {auth} from "../firebase/Config"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SginUp() {
  let navigate = useNavigate();
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const[error , setError] = useState(false)
    const [messageError, setMessageError] = useState("")

  return (
    <div>
      <Helmet>
        <title>Sgin Up page</title>
      </Helmet>
      <Header />
      <main>
        <form>
          <p>Create a new account</p>
          {/* <input required type="text" placeholder="First Name" />
          <input required type="text" placeholder="Last Name" /> */}
          <input onChange={(e) => {
            setEmail(e.target.value)
          }
          } required type="email" placeholder="Your Email" />
          <input onChange={(e) => {
            setPassword(e.target.value)
          }
          }  required type="password" placeholder="Password" />
          <button
            onClick={(e) => {
              e.preventDefault();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  
                  const user = userCredential.user;
                    console.log("success!!")
                    navigate("/")
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setError(true)
                  switch (errorCode) {
                    case "auth/email-already-in-use":
                      setMessageError("Email already in use.");
                      break;
                    case "auth/invalid-email":
                      setMessageError("Invalid email address.");
                      break;
                    case "auth/weak-password":
                      setMessageError("Password should be at least 6 characters.");
                      break;
                    default:
                      setMessageError("An error occurred. Please try again.");
                  }
                  console.log("error!!!")
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
          {error && <p>{messageError}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
}
