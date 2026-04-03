"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const prisma_1 = require("../lib/prisma");
const enums_1 = require("../../generated/prisma/enums");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = async (req, res) => {
    const { role } = req.query;
    const where = role ? { role: role } : undefined;
    const users = await prisma_1.prisma.user.findMany({ where });
    res.json({ users });
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await prisma_1.prisma.user.findFirst({
        where: { id: Number(id) },
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json({ user });
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    const { email, password, age } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                age,
            },
        });
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, age, role } = req.body;
    if (role && !Object.values(enums_1.Role).includes(role)) {
        res.status(400).json({
            message: `Invalid role. Must be one of: ${Object.values(enums_1.Role).join(", ")}`,
        });
        return;
    }
    try {
        const user = await prisma_1.prisma.user.update({
            where: { id: Number(id) },
            data: {
                email,
                password,
                age,
                ...(role && { role }),
            },
        });
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.prisma.user.delete({
            where: { id: Number(id) },
        });
        res.json({ message: `User ${id} deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.deleteUser = deleteUser;
