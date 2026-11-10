import { NAMESPACES } from "../../constants/media.constants.js";
import { deleteFile, uploadFiles } from "../files/files.service.js";
import { LawFirm } from "./LawFirm.model.js";

export const getFirm = async () => {
  return LawFirm.findOne().populate({
    path:"combinedMembersImage",
    select:"url"
  });
};

export const updateFirm = async ({ data, media, user }) => {
  const firm = await LawFirm.findOne();

  const updateData = { ...data };

  if (media.combinedMembersImage?.length > 0) {
    if (firm?.combinedMembersImage) {
      await deleteFile(firm.combinedMembersImage);
    }

    const [image] = await uploadFiles({
      files: media.combinedMembersImage,
      user,
      namespace: NAMESPACES.FIRM_MEMBERS_COMBINED,
      provider: "cloudinary",
    });

    if (image) {
      updateData.combinedMembersImage = image._id;
    }
  }

  // Location images
  if (media.locationImages?.length > 0) {
    if (firm?.location?.images?.length > 0) {
      await Promise.all(
        firm.location.images.map((imageId) => deleteFile(imageId))
      );
    }

    const images = await uploadFiles({
      files: media.locationImages,
      user,
      namespace: NAMESPACES.FIRM_LOCATION,
      provider: "cloudinary",
    });

    updateData.location = {
      ...updateData.location,
      images: images.map((image) => image._id),
    };
  }

  return LawFirm.findOneAndUpdate(
    {},
    { $set: updateData },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );
};