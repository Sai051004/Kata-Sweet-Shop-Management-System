const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Swagger Config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sweet Shop API',
      version: '1.0.0',
      description: 'API for Sweet Shop Management System',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'], // files containing annotations
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/sweets', require('./routes/sweetRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/test', require('./routes/testRoutes'));
console.log('User and Test routes mounted');

// Connect to Database and start server
// Connect to Database and start server
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch(err => {
        console.error('Database connection failed', err);
        process.exit(1);
    });
}

module.exports = app;
