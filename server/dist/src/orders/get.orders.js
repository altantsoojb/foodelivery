"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getOrders = void 0;
const prisma_1 = require("../lib/prisma");
const getOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await prisma_1.prisma.foodOrder.findMany({
            where: {
                userId: Number(userId),
            },
            include: {
                foodOrderItems: {
                    include: {
                        food: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({ orders });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await prisma_1.prisma.foodOrder.findUnique({
            where: {
                id: Number(orderId),
            },
            include: {
                foodOrderItems: {
                    include: {
                        food: true,
                    },
                },
            },
        });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.json({ order });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
};
exports.getOrderById = getOrderById;
