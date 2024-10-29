import FileUploader from "@/components/fileUploader";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/repository/post.service";
import { FileEntry, PhotoMeta, Post } from "@/shared.types";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IPostProps {}
const AddPost: React.FC<IPostProps> = () => {
  //USELESS: const { user } = useContext(userAuthContext);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    likedBy: [],
    userId: user?.uid as string,
    date: new Date(),
  });
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });
  const navigate = useNavigate();
  /*submit post btn clicked*/
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newPost: Post;
    const photos: PhotoMeta[] = fileEntry.files.map((file) => {
      return { cdnUrl: file.cdnUrl as string, uuid: file.uuid as string };
    });
    if (loading) console.log(`loading user b4 submitting post`);
    else if (user) {
      newPost = {
        ...post,
        date: new Date(),
        photos: photos,
        userId: user!.uid,
      };
      console.log(`final post ${JSON.stringify(newPost)}`);
      createPost(newPost);
      toast.success("Post created successfully");
      navigate("/");
    } else {
      toast.error("Please login to post");
      navigate("/login");
    }
  };
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Create Post
          </h3>
          <div className="p-8">
            <div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">
                  Photo Caption
                </Label>
                <Textarea
                  className="mb-8"
                  id="caption"
                  placeholder="what's in your photo!"
                  value={post.caption}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                />
              </div>
              {/* uploadCare file uploader */}
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="photo">
                  Photos
                </Label>
                <FileUploader
                  fileEntry={fileEntry}
                  setFileEntry={setFileEntry}
                />
              </div>
              <Button
                className="mt-8 w-32"
                type="submit"
                onClick={handleSubmit}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default AddPost;
