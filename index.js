import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import Express from "express";
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";
import aleartRoutes from "./routes/aleart.js"
import likeRoutes from "./routes/likes.js"

const app = Express()
app.use(Express.json());
app.use(cookieParser());

import swaggerOptions from './swaggerOptions.js';

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use("/api/users", userRoutes);
app.use("/api/alert", aleartRoutes);
app.use("/api/likes", likeRoutes)

