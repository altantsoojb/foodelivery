import express from "express";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import foodRoutes from "./routes/food.routes";
import loginRoutes from "./routes/login.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/foods", foodRoutes);
app.use("/users", loginRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
