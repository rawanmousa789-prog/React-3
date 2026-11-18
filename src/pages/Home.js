import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/Config";
import { Link  } from "react-router";
import {  sendEmailVerification } from "firebase/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
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
    //not signin
    if(!user){
      return(
        <div>
          <Header/>
          <div>
            <main className="auth"> <Link to="/SginIn">Sign in </Link>  to continue...</main>
          </div>
          <Footer/>
        </div>
      )
    }
// signin without email verification
// signin with email verification
    if(user){
      if(!user.emailVerified){
        return(
              <div>
                <Header/>
                <main>
                  <div>
                    <p>we sent an email to verifiy your account</p>
                    <button className="deleteBtn"
                    onClick={() => {
                      sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    console.log("email sent again!!")
  });
                    }
                    }
                    >send again</button>
                  </div>
                </main>
                <Footer/>
              </div>
        
            )
      }
      if(user.emailVerified){
        return(
          <>
          <Helmet>
        <title> Home page</title>
        <meta
      name="description"
      content="Home"
    />
      </Helmet>
          <Header/>
          <main className="hero-section">
    <div className="hero-text">
      <h2>Start your journey with Web Development</h2>
      <p>Learn step-by-step and build real projects.</p>
      <a href="#" className="hero-btn">
        Start Learning
      </a>
    </div>
    <img
      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
      alt=""
      className="hero-img"
    />
  </main>
          <Footer/>
          </>
        )
      }
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
}
