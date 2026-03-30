import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.foodOrder.findMany({
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
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.foodOrder.findUnique({
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
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
