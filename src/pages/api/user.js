/* eslint-disable import/no-anonymous-default-export */
import { verify } from "jsonwebtoken";
import { parse } from "cookie";
const secret = process.env.NEXT_PUBLIC_COOKIE_SECRET_KEY;

export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ uid: null });
  }

  try {
    // Xác thực token và lấy thông tin người dùng
    const decodedToken = verify(jwt, secret);
    const { uid } = decodedToken;

    // Trả về thông tin người dùng
    return res.json({ uid: uid });
  } catch (err) {
    return res.json({ message: "Invalid token!" });
  }
}
