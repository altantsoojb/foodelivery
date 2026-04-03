"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.createFood = exports.getFoodById = exports.getFoods = void 0;
const prisma_1 = require("../lib/prisma");
const getFoods = async (req, res) => {
    try {
        const foods = await prisma_1.prisma.food.findMany();
        res.json(foods);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch foods" });
    }
};
exports.getFoods = getFoods;
const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await prisma_1.prisma.food.findUnique({
            where: { id: Number(id) },
        });
        if (!food)
            return res.status(404).json({ error: "Food not found" });
        res.json(food);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch food" });
    }
};
exports.getFoodById = getFoodById;
const createFood = async (req, res) => {
    try {
        const { name, price, foodCategoryId } = req.body;
        const newFood = await prisma_1.prisma.food.create({
            data: { name, price, foodCategoryId: Number(foodCategoryId) },
        });
        res.status(201).json(newFood);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create food" });
    }
};
exports.createFood = createFood;
const updateFood = async (req, res) => {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({ error: "name is required" });
    try {
        const food = await prisma_1.prisma.food.update({
            where: { id: Number(req.params.id) },
            data: { name },
        });
        res.json(food);
    }
    catch {
        res.status(404).json({ error: "Food not found or update failed" });
    }
};
exports.updateFood = updateFood;
const deleteFood = async (req, res) => {
    try {
        await prisma_1.prisma.food.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(204).send();
    }
    catch {
        res.status(404).json({ error: "Food not found or delete failed" });
    }
};
exports.deleteFood = deleteFood;
