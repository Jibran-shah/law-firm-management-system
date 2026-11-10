import { User } from "./User.model.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { sanitizeUser } from "../../utils/auth.js";
import { UnauthorizedError } from "../../errors/Http.error.js";
import bcrypt from "bcrypt"
import { USER_ROLES } from "./auth.constants.js";

export const registerUser = async ({
  username,
  email,
  password,
  role = USER_ROLES.MEMBER
}) => {

  const normalizedEmail = email
    .toLowerCase()
    .trim();

  const SALT_ROUNDS = Number(process.env.PASSWORD_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);

  const user = await User.create({
    username: username.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role
  });

  const token = generateAccessToken(user);

  return {
    user: sanitizeUser(user),
    token,
  };

};


export const loginUser = async ({
  email,
  password,
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({email: normalizedEmail}).select("+password");

  if (!user) throw new UnauthorizedError("Invalid email or password")

  const passwordMatches = await bcrypt.compare(password,user.password)

  if (!passwordMatches) throw new UnauthorizedError("Invalid email or password");

  const token = generateAccessToken(
    user
  );

  return {
    user: sanitizeUser(user),
    token,
  };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId)
    .select("-password");
  if (!user) {
    const error = new Error(
      "User not found"
    );
    error.statusCode = 404;
    throw error;
  }
  return sanitizeUser(user);
};