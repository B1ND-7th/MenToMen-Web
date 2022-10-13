import { atom } from "recoil";

export const uploadFileUrlAtom = atom({
  key: "uploadFileUrlAtom",
  default: [],
});

export const tagAtom = atom({
  key: "tagAtom",
  default: "Design",
});

export const commentAtom = atom({
  key: "commentAtom",
  default: [],
});

export const postAtom = atom({
  key: "postAtom",
  default: null,
});

export const commentbtAtom = atom({
  key: "commentbtAtom",
  default: null,
});

export const commentListAtom = atom({
  key: "commentListAtom",
  default: [],
});

export const CommentIdAtom = atom({
  key: "CommentIdAtom",
  default: null,
});

export const CommentUserId = atom({
  key: "CommentUserId",
  default: null,
});

export const ProfileUrlAtom = atom({
  key: "ProfileUrlAtom",
  default: null,
});
