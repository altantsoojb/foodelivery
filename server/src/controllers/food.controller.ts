import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany();
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch foods" });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const food = await prisma.food.findUnique({
      where: { id: Number(id) },
    });
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch food" });
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const { name, price, foodCategoryId } = req.body;
    const newFood = await prisma.food.create({
      data: { name, price, foodCategoryId: Number(foodCategoryId) },
    });
    res.status(201).json(newFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create food" });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  try {
    const food = await prisma.food.update({
      where: { id: Number(req.params.id) },
      data: { name },
    });
    res.json(food);
  } catch {
    res.status(404).json({ error: "Food not found or update failed" });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    await prisma.food.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Food not found or delete failed" });
  }
};
