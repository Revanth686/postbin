//similar to layout of the app, this component will be used to protect the routes that require authentication
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  //NOTE: no longer use this as firebase sets the user variable after the ui renderd and refreshing comps does not get curr user
  // const { user } = useContext(userAuthContext);
  const isAuthenticated = user != null;
  const location = useLocation();
  if (loading) {
    return <h1>...processing</h1>;
  }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default ProtectedRoutes;
