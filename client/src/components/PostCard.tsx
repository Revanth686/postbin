import { userAuthContext } from "@/context/userAuth";
import { DocumentResponse, ProfileResponse } from "@/shared.types";
import * as React from "react";
import image2 from "@/assets/images/image2.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HeartIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateLikesOnPost } from "@/repository/post.service";
import { useState } from "react";
import { getUserProfile } from "@/repository/user.service";

interface IPostCardProps {
  data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = React.useContext(userAuthContext);
  const [likesInfo, setLikesInfo] = React.useState<{
    likes: number;
    isLike: boolean;
  }>({
    likes: data.likes,
    isLike: data.likedBy.includes(user?.uid as string) ? true : false,
  });
  const [uploader, setUploader] = useState<ProfileResponse>({
    displayName: "uploader",
    photoURL: image2,
  });
  React.useEffect(() => {
    (async () => {
      const uploadr = await getUserProfile(data.userId!);
      setUploader(uploadr!);
    })();
  }, []);

  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
      isLike: !likesInfo.isLike,
    });
    if (isVal) {
      data.likedBy?.push(user!.uid);
    } else {
      data.likedBy?.splice(data.likedBy.indexOf(user!.uid), 1);
    }

    await updateLikesOnPost(
      data.id!,
      isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
      data.likedBy!,
    );
  };
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm text-center flex justify-start items-center">
          <span className="mr-2">
            <img
              src={uploader?.photoURL ?? image2}
              className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
            />
          </span>
          <span>{uploader?.displayName ?? "uploader"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src={data.photos && data.photos[0] ? data.photos[0].cdnUrl : ""}
          alt={"uploaded pic..."}
        />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer",
              likesInfo.isLike ? "fill-red-500" : "fill-none",
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
          />
          <MessageCircle className="mr-3" />
        </div>
        <div className="w-full text-sm">{likesInfo.likes} likes</div>
        <div className="w-full text-sm">
          <span>{uploader?.displayName ?? "uploader"}</span>: {data.caption}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
