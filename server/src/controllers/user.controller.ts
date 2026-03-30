import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  const { role } = req.query;

  const where: any = role ? { role: role as Role } : undefined;

  const users = await prisma.user.findMany({ where });

  res.json({ users });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ user });
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        age,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, age, role } = req.body;

  if (role && !Object.values(Role).includes(role)) {
    res.status(400).json({
      message: `Invalid role. Must be one of: ${Object.values(Role).join(", ")}`,
    });
    return;
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        password,
        age,
        ...(role && { role }),
      },
    });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: `User ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error });
  }
};
