import React from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import auth from "./../../../firebase.init";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const [sendEmailVerification, sending] = useSendEmailVerification(
    auth
  );
  if (loading || sending) {
    return <Loading></Loading>;
  }
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.providerData[0].providerId==='password' && !user.emailVerified) {
    return (
      <div>
        <h3>Please verified your email</h3>
        <p>
          Dont get verification email{" "}
          <span
          style={{cursor:"pointer"}}
            className="text-primary"
            onClick={async () => {
              await sendEmailVerification();
              alert("Sent email");
            }}
          >
            Send Again
          </span>
        </p>
      </div>
    );
  }

  return children;
};

export default RequireAuth;
