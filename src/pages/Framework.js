import Content from "../component/Content";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { Helmet } from 'react-helmet-async';
import {  useEffect } from 'react';
import {useNavigate} from "react-router";
import {auth} from "../firebase/Config"
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Framework() {
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
        <title>Framework page</title>
        <meta
      name="description"
      content="Framework"
    />
      </Helmet>

      <Header/>
      <Content data="FrameWork"/>
      <Footer/>
    </div>
  )
}
