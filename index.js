import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import Express from "express";
import cookieParser from "cookie-parser";

import communityreportsRoutes from './routes/communityreports.js'
import educationalresourcesRoutes from './routes/educationalresources.js'
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

