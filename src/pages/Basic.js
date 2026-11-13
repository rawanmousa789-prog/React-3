import Content from "../component/Content";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from "react-helmet-async";
import {  useEffect } from 'react';
import {useNavigate} from "react-router";
import {auth} from "../firebase/Config"
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Basic() {
  let navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(!user){
      navigate("/");
    }
  });
  return (
    <div>
      <Helmet>
        <title>Basic page</title>
        <meta name="description" content="Basic" />
      </Helmet>
      <Header />

      {/* <Content data="Basic" /> */}
      <main>Wellcome {user.displayName}</main>

      <Footer />
    </div>
  );
}
