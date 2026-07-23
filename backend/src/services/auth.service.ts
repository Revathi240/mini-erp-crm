import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

// Register User
export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUser) => {
  // Check if user already exists
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save User
  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashedPassword]
  );

  return result.rows[0];
};

// Login User
export const loginUser = async ({
  email,
  password,
}: LoginUser) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];

  // Compare Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};