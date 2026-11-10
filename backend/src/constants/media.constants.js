export const MEMORY_SIZES = Object.freeze({
  ONE_MB:1024*1024,
  ONE_GB:1024*1024*1024
})

export const NAMESPACES = Object.freeze({
  MEMBER_AVATAR: "member/avatar",
  MEMBER_COVER: "member/cover",
  CLIENT_AVATAR: "client/avatar",
  CLIENT_COVER: "client/cover",
  SERVICE_IMAGE:"service/image",
  FIRM_LOCATION:"firm/location/images",
  FIRM_MEMBERS_COMBINED:"firm/members/combined"
});

export const FILE_MAX_SIZES = Object.freeze({
  AVATAR: 10 * MEMORY_SIZES.ONE_MB,
  COVER: 20 * MEMORY_SIZES.ONE_MB,
  PRODUCT_IMAGE: 10 * MEMORY_SIZES.ONE_MB,
  SERVICE_IMAGE: 10 * MEMORY_SIZES.ONE_MB,
  CHAT_IMAGE: 15 * MEMORY_SIZES.ONE_MB,
  CHAT_VIDEO: 50 * MEMORY_SIZES.ONE_MB,
  CHAT_DOCUMENT: 20 * MEMORY_SIZES.ONE_MB,
  REVIEW_IMAGE: 8 * MEMORY_SIZES.ONE_MB,
  REVIEW_VIDEO: 50 * MEMORY_SIZES.ONE_MB,
})


export const MAX_SIZE_CAP = 200 * MEMORY_SIZES.ONE_MB;

export const MEDIA_PROVIDERS = Object.freeze({
  LOCAL:"local",
  AWS_S3:"aws-s3",
  CLOUDINARY:"cloudinary"
});