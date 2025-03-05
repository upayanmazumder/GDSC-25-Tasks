import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const users = [
  { username: "admin", password: bcrypt.hashSync("password123", 10) },
];

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const user = users.find((u) => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const res = NextResponse.json({ success: true, token });
    res.cookies.set("token", token, { httpOnly: true, secure: true });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
