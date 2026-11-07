import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import {auth} from "../firebase/Config"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


export default function SginUp() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

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
                  // Signed up
                  const user = userCredential.user;
                    console.log("success!!")
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
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
        </form>
      </main>
      <Footer />
    </div>
  );
}
