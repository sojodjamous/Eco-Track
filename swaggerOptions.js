import pkg from './package.json' assert { type: 'json' };

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
    },
  },
  apis: ['./routes/users.js', './controllers/user.js'
         ,'./routes/likes.js', './controllers/likes.js'
         ,'./routes/aleart.js', './controllers/aleart.js'         
], 
};

export default swaggerOptions;
