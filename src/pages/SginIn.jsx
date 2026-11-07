import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";


export default function SginIn() {
  return (
    <div>
          <Helmet>
            <title>SginIn page</title>
          </Helmet>
          <Header />
          <main>
            <form>
              <input required type="email" placeholder="Your Email" />
              <input required type="password" placeholder="Password" />
              <button>Sign In</button>
              <p className="account">Don't have an account? <Link to="/SginUp">Sign Up</Link></p>
            </form>
          </main>
          <Footer />
        </div>
  )
}
