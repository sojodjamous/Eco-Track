import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import Express from "express";
import communityreportsRoutes from './routes/communityreports.js'
import educationalresourcesRoutes from './routes/educationalresources.js'
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js"
import connectionsRouts from "./routes/connections.js";
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
app.use('/api/communityreports', communityreportsRoutes);
app.use('/api/educationalresources', educationalresourcesRoutes);

app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/connections", connectionsRouts);
app.use("/api/users", userRoutes);
app.use("/api/alert", aleartRoutes);
app.use("/api/likes", likeRoutes)

