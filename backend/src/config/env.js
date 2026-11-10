import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  PRODUCTION: process.env.PRODUCTION === "production",
  PORT: parseInt(process.env.PORT||5000),
  BASE_ROUTE:process.env.BASE_ROUTE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_TOKEN_NAME:process.env.JWT_ACCESS_TOKEN_NAME,
  PASSWORD_SALT_ROUNDS: parseInt(process.env.PASSWORD_SALT_ROUNDS || 12),
  AWS_REGION:process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME:process.env.AWS_S3_BUCKET_NAME
}