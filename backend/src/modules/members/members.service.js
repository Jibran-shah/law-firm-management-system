import { NAMESPACES } from "../../constants/media.constants.js"
import { NotFoundError } from "../../errors/Http.error.js"
import { deleteFile, uploadFiles } from "../files/files.service.js"
import { Member } from "./Member.model.js"

export const createMember = async ({ media, user, data }) => {
    const [avatar] = await uploadFiles({
      files: media.avatar,
      user,
      namespace: NAMESPACES.MEMBER_AVATAR,
      provider: "cloudinary",
    });

    const [cover] = await uploadFiles({
      files: media.cover,
      user,
      namespace: NAMESPACES.MEMBER_COVER,
      provider: "cloudinary",
    });

  const member = await Member.create({
    ...data,
    user:user.id,
    avatar:avatar._id,
    cover:cover._id
  })

  return member;
}


export const updateMember = async ({ id, media, user, data }) => {

  const member = await Member.findById(id);

  if(!member)
    throw new NotFoundError("member not found");

  const prevAvatar = member.avatar;
  let avatar;

  if(prevAvatar && media.avatar.length){
    console.log("avatar deletion", prevAvatar, media.avatar);
    await deleteFile(prevAvatar)
  }

  if(media.avatar){
    const files = await uploadFiles({
      files: media.avatar,
      user,
      namespace: NAMESPACES.MEMBER_AVATAR,
      provider: "cloudinary",
    });
    avatar = files[0];
  }

  const prevCover = member.cover;
  let cover;

  if(prevCover && media.cover.length){
    console.log("cover deletion", prevCover, media.cover);
    await deleteFile(prevCover)
  }

  if(media.cover){
    const files = await uploadFiles({
      files: media.cover,
      user,
      namespace: NAMESPACES.MEMBER_COVER,
      provider: "cloudinary",
    });
    cover = files[0];
  }

  const _member = await Member.findByIdAndUpdate(id,{
    ...data,
    user:user.id,
    ...((avatar)?{avatar:avatar._id}:{}),
    ...((cover)?{cover:cover._id}:{}),
  })

  return _member;
}

export const getMemberById = async ({id}) => {
  const member = await Member.findById(id).populate([
    {
      path:"avatar",
      select:"url"
    },
    {
      path:"cover",
      select:"url"
    },
  ]);
  return member;
}

export const getMemberByUser = async ({user}) => {
  const member = await Member.findOne({user});
  return member;
}

export const getAllMembers = async () => {
  const members = await Member.find({}).populate([
    {
      path:"avatar",
      select:"url"
    },
    {
      path:"cover",
      select:"url"
    },
  ]);
  return members;
}


export const deleteMemberById = async (id) => {
  const member = await Member.findByIdAndDelete(id);
  return member;
}