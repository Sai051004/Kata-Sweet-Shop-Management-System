const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database.
 * 
 * It handles the connection string based on the environment (test or development).
 * Logs the host upon successful connection or exits the process on failure.
 */
const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        
        // Use a separate database for testing to ensure isolation
        if (process.env.NODE_ENV === 'test') {
            if (uri.includes('?')) {
                uri = uri.replace('?', '_test?'); 
            } else {
                uri += '_test';
            }
        }
        
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
