import { useState } from "react";
import { serialize, parse } from "cookie";
import jwt from "jsonwebtoken";

const SECRET = "mysecretkey";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { token } = parse(req.headers.cookie || "");

  if (!token) {
    res.setHeader("Location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = decoded.user;

    return {
      props: { user },
    };
  } catch (error) {
    res.setHeader("Location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
}

export default function MyPage({ user }) {
  const [loggedIn, setLoggedIn] = useState(user);

  const handleLogin = () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const token = jwt.sign({ user }, SECRET);
    document.cookie = serialize("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    setLoggedIn(user);
  };

  const handleLogout = () => {
    document.cookie = serialize("token", "", {
      path: "/",
      maxAge: -1,
    });
    setLoggedIn(null);
  };

  return (
    <>
      {loggedIn ? (
        <div>
          <p>Hello, {loggedIn.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </>
  );
}


// gọi lại cookies

import cookie from 'cookie';

export default function MyPage({ name }) {
  return (
    <div>
      <h1>Hello {name}!</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const name = cookies.name;

  return {
    props: {
      name: name || 'World',
    },
  };
}
