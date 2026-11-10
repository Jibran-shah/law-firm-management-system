/**
 * utils for setting Cookies on response
 * 
 * 
 * 
 * 
 */

const setAccessCookie = ({response,value}) => {
  response.cookie("AUTH:ACCESS",JSON.stringify(value), {
    httpOnly,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}