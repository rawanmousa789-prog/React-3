import Content from "../component/Content";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from 'react-helmet-async';
import {  useEffect } from 'react';
import {useNavigate} from "react-router";
import {auth} from "../firebase/Config"
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Tips() {
  let navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(!user){
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
        <title>Tips page</title>
        <meta
      name="description"
      content="Tips"
    />
      </Helmet>
      <Header/>
  <Content data="Tips"/>
  
  <Footer/>
    </div>
  )
}
  }
}
