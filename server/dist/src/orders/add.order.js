"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrder = void 0;
const prisma_1 = require("../lib/prisma");
const addOrder = async (req, res) => {
    const { userId, orderItems } = req.body;
    const totalPrice = await calcTotalPrice(orderItems);
    try {
        const order = await prisma_1.prisma.foodOrder.create({
            data: {
                userId,
                status: "pending",
                totalPrice: totalPrice,
                foodOrderItems: {
                    create: orderItems,
                },
            },
        });
        res.json({ order });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
};
exports.addOrder = addOrder;
const calcTotalPrice = async (orderItems) => {
    const foodIds = orderItems.map((orderItem) => orderItem.foodId);
    const foods = await findFoodsByIds(foodIds);
    const foodWithQuantity = foods.map((food) => {
        const foundedOrderItem = orderItems.find((orderItem) => orderItem.foodId === food.id);
        return { ...food, quantity: foundedOrderItem?.quantity };
    });
    const totalPrice = foodWithQuantity.reduce((acc, curr) => {
        return acc + Number(curr.price) * Number(curr.quantity);
    }, 0);
    return totalPrice.toString();
};
const findFoodsByIds = async (foodIds) => {
    const foods = await prisma_1.prisma.food.findMany({
        where: {
            id: {
                in: foodIds,
            },
        },
    });
    return foods;
};
