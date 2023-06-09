/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.NEXT_PUBLIC_COOKIE_SECRET_KEY;

export default async function (req, res) {
  const { username, password } = req.body;

  // Check in the database
  // if a user with this username
  // and password exists
  if (username === "Admin" && password === "1111") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
        username: username,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}
