import { ENV } from "../../config/env.js";
import * as authService from "./auth.service.js";


/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const register = async (req, res) => {
  const { token, user} = await authService.registerUser(req.body);

  res.cookie(ENV.JWT_ACCESS_TOKEN_NAME, token, {
    httpOnly:true,
    secure:ENV.PRODUCTION,
    sameSite:ENV.PRODUCTION?"none":"lax",
  })

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user
    },
  })
};


/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const login = async (req, res) => {
  const { token, user } = await authService.loginUser(req.body);
  res.cookie(ENV.JWT_ACCESS_TOKEN_NAME, token, {
    httpOnly: true,
    secure:ENV.PRODUCTION,
    sameSite:ENV.PRODUCTION?"none":"lax"
  })
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user
    },
  });
};

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const logout = async (_,res) => {

  res.clearCookie(ENV.JWT_ACCESS_TOKEN_NAME,{
    httpOnly: true,
    secure:ENV.PRODUCTION,
    sameSite:ENV.PRODUCTION?"none":"lax"
  })

  res.status(204).end();

};

export const getMe = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};