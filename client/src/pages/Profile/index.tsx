import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { userAuthContext } from "@/context/userAuth";
import { getPostByUserId } from "@/repository/post.service";
import { DocumentResponse, Post, ProfileResponse } from "@/shared.types";
import { Edit2Icon, HeartIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "@/assets/images/image1.jpg";
import { getUserProfile } from "@/repository/user.service";

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const navigate = useNavigate();
  const { user } = useContext(userAuthContext);
  const [userInfo, setUserInfo] = useState<ProfileResponse>({
    id: "",
    userId: user?.uid,
    displayName: user?.displayName ? user.displayName : "email User",
    photoURL: user?.photoURL ? user.photoURL : "",
    userBio: "",
  });

  const [posts, setPosts] = React.useState<DocumentResponse[]>([]);
  const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("The response object is : ", responseObj);
          tempArr.push(responseObj);
        });
        setPosts(tempArr);
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log(`error getting allposts ${error}`);
    }
  };

  const renderPosts = () => {
    return posts.map((item) => {
      return (
        <div key={item.photos[0].uuid} className="relative">
          <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {item.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          />
        </div>
      );
    });
  };

  const getUserProfileInfo = async (userId: string) => {
    const data: ProfileResponse = (await getUserProfile(userId)) || {};
    if (data.displayName) {
      setUserInfo(data);
    }
  };
  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, []);

  const editProfile = () => {
    navigate("/edit-profile", { state: userInfo });
  };
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Profile
          </h3>
          <div className="p-8 pb-4 border-b">
            <div className="flex flex-row items-center pb-2 mb-2">
              <div className="mr-2">
                <img
                  src={userInfo.photoURL ? userInfo.photoURL : image1}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
              <div>
                <div className="text-xl ml-3">
                  {userInfo.displayName ? userInfo.displayName : "Guest_user"}
                </div>
                <div className="text-xl ml-3">
                  {user?.email ? user.email : ""}
                </div>
              </div>
            </div>
            <div className="mb-4"> {userInfo.userBio}</div>
            <div>
              <Button onClick={editProfile}>
                <Edit2Icon className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>

          <div className="p-8">
            <h2 className="mb-5">My Posts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {posts ? renderPosts() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;