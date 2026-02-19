import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/initDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// 🔹 GET all users
export async function GET() {
  try {
    await initDB();
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// 🔹 SIGNUP user
export async function POST(req: NextRequest) {
  try {
    await initDB();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...body,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          id: user.getDataValue("id"),
          email: user.getDataValue("email"),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// 🔹 LOGIN user
export async function PUT(req: NextRequest) {
  try {
    await initDB();
    const body = await req.json();
    const { email, password } = body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 🔑 Safely read password from Sequelize model
    const hashedPassword = user.getDataValue("password");

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
