import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/Config";
import { Link  } from "react-router";


export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      <Helmet>
        <title> Home page</title>
        <meta
      name="description"
      content="Home"
    />
      </Helmet>
      <Header/>
  {user && <main className="hero-section">
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
  </main>}
  {!user && <main className="auth"> <Link to="/SginIn">Sign in </Link>  to continue...</main>}
  <Footer/>
    </div>
  )
}
