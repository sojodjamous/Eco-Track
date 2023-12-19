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
    ,'./routes/educationalresources.js', './controllers/educationalresources.js'
    ,'./routes/communityreports.js', './controllers/communityreports.js'
        ], 
};

export default swaggerOptions;
