"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const prisma_1 = require("../lib/prisma");
const getCategories = async (req, res) => {
    try {
        const categories = await prisma_1.prisma.foodCategory.findMany({
            include: { foods: true },
        });
        res.json(categories);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
    try {
        const category = await prisma_1.prisma.foodCategory.findUnique({
            where: { id: Number(req.params.id) },
            include: { foods: true },
        });
        if (!category)
            return res.status(404).json({ error: "Category not found" });
        res.json(category);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch category" });
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({ error: "name is required" });
    try {
        const category = await prisma_1.prisma.foodCategory.create({
            data: { name },
            include: { foods: true },
        });
        res.status(201).json(category);
    }
    catch {
        res.status(500).json({ error: "Failed to create category" });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({ error: "name is required" });
    try {
        const category = await prisma_1.prisma.foodCategory.update({
            where: { id: Number(req.params.id) },
            data: { name },
            include: { foods: true },
        });
        res.json(category);
    }
    catch {
        res.status(404).json({ error: "Category not found or update failed" });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        await prisma_1.prisma.foodCategory.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(204).send();
    }
    catch {
        res.status(404).json({ error: "Category not found or delete failed" });
    }
};
exports.deleteCategory = deleteCategory;
