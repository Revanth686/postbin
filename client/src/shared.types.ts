import { OutputFileEntry } from "@uploadcare/react-uploader";
import { User } from "firebase/auth";

export interface UserSignup {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface FileEntry {
  files: OutputFileEntry[];
}
export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  likedBy: string[];
  userId: string;
  date: Date;
}
export interface PhotoMeta {
  cdnUrl: string;
  uuid: string;
  alt?: string;
}
export interface DocumentResponse {
  id: string;
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  likedBy: string[];
  userId: string | null;
  date: Date;
}
/* firebase user data type while storing */
export interface ProfileInfo {
  user?: User;
  displayName?: string;
  photoURL?: string;
}
/*User collection datatype*/
export interface UserProfile {
  userId?: string;
  displayName?: string;
  photoURL?: string;
  userBio?: string;
}
/*datatype when fetching from user collection*/
export interface ProfileResponse extends UserProfile {
  id?: string;
}
