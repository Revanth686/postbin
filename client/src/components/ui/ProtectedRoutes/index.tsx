//similar to layout of the app, this component will be used to protect the routes that require authentication
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  //NOTE: no longer use this as firebase sets the user variable after the ui renderd and refreshing comps does not get curr user
  // const { user } = useContext(userAuthContext);
  const isAuthenticated = user != null;
  const isLoading = async () => {
    return new Promise((resolve, reject) => {
      if (!loading) resolve(true);
      reject(false);
    });
  };
  const location = useLocation();
  if (loading) {
    toast.promise(isLoading(), {
      loading: "Setting up...",
      success: <b>Details fetched successfully!</b>,
      error: <b>Could not fetch details.</b>,
    });
    return <h1>...processing</h1>;
  }
  return isAuthenticated ? (
    <>
      <Outlet />
      <Toaster />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default ProtectedRoutes;
