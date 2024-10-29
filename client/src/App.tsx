import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./context/userAuth";

function App() {
  return (
    <>
      <UserAuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserAuthProvider>
    </>
  );
}

export default App;
//BUG: no sync btw firebase user, users collection:
//when user signs in, and uploads a post-> the user is not present in users collection
//hence when uploading posts, displayName, photoURL are absent since were fetching those details from users collection(firebaseAuth->userId)
//HACK: add user to users collection when user signs up
