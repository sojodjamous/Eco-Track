import pkg from './package.json' assert { type: 'json' };

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
    },
  },
  apis: [
         ,'./routes/post.js', './controllers/post.js'
         ,'./routes/connections.js', './controllers/connections.js'
         ,'./routes/comment.js', './controllers/comment.js'
], 
};

export default swaggerOptions;
