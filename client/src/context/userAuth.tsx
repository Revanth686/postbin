//manage auth of app
import { auth } from "@/config/firebaseConfig";
import { ProfileInfo } from "@/shared.types";
import {
  signInWithPopup,
  User,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const updateProfileInfo = async (profileInfo: ProfileInfo) => {
  //NOTE: auth.currentUser;
  try {
    await updateProfile(profileInfo.user!, {
      displayName: profileInfo.displayName,
      photoURL: profileInfo.photoURL,
    });
  } catch (error) {
    console.log(`error updating profile info ${error}`);
  }
};

interface AuthContextType {
  user: User | null;
  login: typeof login;
  signup: typeof signup;
  logout: typeof logout;
  googleSignIn: typeof googleSignin;
}
/*signin with email,password managed by firebase*/
const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
/*signup with email-password*/
const signup = async (email: string, password: string) => {
  let userCreds;
  try {
    userCreds = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCreds);
  } catch (e) {
    throw new Error(`error signup with email,pwd ${e}`);
  }
  return userCreds;
};
const logout = async () => {
  await signOut(auth);
};
/*sign-in/up with GOOGLE same provider or method */
const googleSignin = async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleAuthProvider);
};
export const userAuthContext = createContext<AuthContextType>({
  user: null,
  login,
  signup,
  logout,
  googleSignIn: googleSignin,
});

interface UserAuthProviderProps {
  children: React.ReactNode;
}

export const UserAuthProvider: React.FC<UserAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`loggedin user: ${JSON.stringify(user)}`);
        setUser(user);
      } else setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const value: AuthContextType = {
    user: user,
    login,
    signup,
    logout,
    googleSignIn: googleSignin,
  };
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};
