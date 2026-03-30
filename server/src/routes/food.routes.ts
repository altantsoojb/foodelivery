import { Router } from "express";
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/food.controller";

const router = Router();

router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
