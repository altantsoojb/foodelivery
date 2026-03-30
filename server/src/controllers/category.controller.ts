import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.foodCategory.findMany({
      include: { foods: true },
    });
    res.json(categories);
  } catch {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await prisma.foodCategory.findUnique({
      where: { id: Number(req.params.id) },
      include: { foods: true },
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  try {
    const category = await prisma.foodCategory.create({
      data: { name },
      include: { foods: true },
    });
    res.status(201).json(category);
  } catch {
    res.status(500).json({ error: "Failed to create category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  try {
    const category = await prisma.foodCategory.update({
      where: { id: Number(req.params.id) },
      data: { name },
      include: { foods: true },
    });
    res.json(category);
  } catch {
    res.status(404).json({ error: "Category not found or update failed" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await prisma.foodCategory.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Category not found or delete failed" });
  }
};
