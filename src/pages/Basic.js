import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import {  useEffect } from 'react';
import {useNavigate} from "react-router";
import {auth} from "../firebase/Config"
import { useAuthState } from 'react-firebase-hooks/auth';
import Moment from 'react-moment';

export default function Basic() {
  let navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(!user && !loading){
      navigate("/");
    }
  });
  if (loading) {
    return (
      <div>
        <Header />
        <p>Initialising User...</p>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Header />
        <p>Error: {error}</p>
        <Footer />
      </div>
    );
  }

  if(user){
    if(!user.emailVerified){
      navigate("/");
    }
    if(user.emailVerified){
      return (
    <div>
      <Helmet>
        <title>Basic page</title>
        <meta name="description" content="Basic" />
      </Helmet>
      <Header />

      <main>
      <div className="basic-page">
        <h3>Wellcome {user.displayName}</h3>
        <p>Email: {user.email}</p>
      
        <p>last time sign in: <Moment className="date" fromNow date={user.metadata.lastSignInTime} /></p>
        <p>created acount: <Moment className="date"  format="YYYY/MM/DD" date={user.metadata.creationTime} /></p>
        <button className="deleteBtn">Delete Account</button>
      </div>
</main>
      <Footer />
    </div>
  );
    }
  }
}
