import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/Config"
import { useState } from "react";


export default function SginIn() {
  const[email , setEmail] = useState("")
  const[password , setPassword] = useState("")
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
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log("faild login")
                });
            }}
          >
            Sign In
          </button>
          <p className="account">
            Don't have an account? <Link to="/SginUp">Sign Up</Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
