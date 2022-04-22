import React from "react";
import google from '../../../images/social/google.png'
import facebook from '../../../images/social/facebook.png'
import github from '../../../images/social/github.png'
import auth from "../../../firebase.init";
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const [signInWithFacebook, user2, loading2, error2] = useSignInWithFacebook(auth);
  const navigate = useNavigate();
  let errorElement;
  if (error || error1 || error2) {
    errorElement =  
      <div>
        <p className="text-danger">Error: {error?.message}{error1?.message}{error2?.message}</p>
      </div>
  }
  if(loading || loading1 || loading2){
    return <Loading></Loading>
  }
  if(user || user1 || user2){
    navigate('/home')
  }

  

  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="w-50 bg-dark"></div>
        <p className="px-2 mt-2">or</p>
        <div style={{ height: "1px" }} className="w-50 bg-dark"></div>
      </div>
      {
        errorElement
      }
      <div>
      <button
      onClick={()=>signInWithGoogle()}
          type="button"
          className="btn my-2 btn-dark w-50 d-block mx-auto "
        >
            <img style={{height: "18px"}} src={google} alt="" />
          <span className="text-white ps-4">Google</span>
        </button>
      <button
      onClick={()=>signInWithFacebook()}
          type="button"
          className="btn my-2 btn-dark w-50 d-block mx-auto "
        >
            <img style={{height: "18px"}} src={facebook} alt="" />
          <span className="text-white ps-4">Facebook</span>
        </button>
      <button
      onClick={()=>signInWithGithub()}
          type="button"
          className="btn my-2 btn-dark w-50 d-block mx-auto "
        >
            <img style={{height: "18px"}} src={github} alt="" />
          <span className="text-white ps-4">Github</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
