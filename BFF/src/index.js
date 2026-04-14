/* Keep this as slim as possible. Its only job is to connect the middleware (CORS, JSON) 
and start the listener. If you ever switch to Fastify, this is the only file that changes significantly.*/


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const wpClient = require('./utils/wpClient');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Main API Route
app.use('/bff/api/posts', postRoutes);

// Simple Health Check for AWS EKS/ECS
// app.get('/health', (req, res) => res.status(200).send('BFF is healthy'));
app.get('/bff/health', async (req, res) => {
    try {
        // A very lightweight query just to check connectivity
        // We just ask for the site title
        const pingQuery = `{ generalSettings { title } }`;
        await wpClient(pingQuery);

        res.status(200).json({
            status: 'UP',
            services: {
                bff: 'healthy',
                wordpress: 'connected'
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        // If WordPress is down, we return a 503 (Service Unavailable)
        res.status(503).json({
            status: 'DOWN',
            services: {
                bff: 'healthy',
                wordpress: 'disconnected'
            },
            error: error.message
        });
    }
});

const checkWpConnection = async () => {
    try {
        // We perform a tiny query that requires minimal resources
        const testQuery = `{ __typename }`; 
        await wpClient(testQuery);
        console.log('✅ WordPress Connectivity: Verified');
        return true;
    } catch (error) {
        console.error('❌ WordPress Connectivity: Failed');
        console.error('Reason:', error.message);
        return false;
    }
};

app.listen(PORT, async() => {
    console.log(`
🚀 BFF Server ready at: http://localhost:${PORT}
🔌 Connected to CMS: ${process.env.WP_GRAPHQL_URL}
    `);
    await checkWpConnection();
});