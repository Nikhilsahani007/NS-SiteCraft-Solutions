const mongoose = require('mongoose');
const os = require('os');

/**
 * Basic health check
 * GET /api/health
 */
const getHealth = (req, res) => {
    res.json({
        success: true,
        message: 'NS SiteCraft API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
};

/**
 * Detailed health check with system information
 * GET /api/health/detailed
 */
const getDetailedHealth = async (req, res) => {
    try {
        // Check database connection
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        const dbName = mongoose.connection.name || 'unknown';

        // Get memory usage
        const memoryUsage = process.memoryUsage();
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();

        // Get uptime
        const uptime = process.uptime();

        res.json({
            success: true,
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0',
            database: {
                status: dbStatus,
                name: dbName,
                host: mongoose.connection.host || 'unknown',
            },
            memory: {
                rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
                heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
                heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
                external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
                systemTotal: `${Math.round(totalMemory / 1024 / 1024)}MB`,
                systemFree: `${Math.round(freeMemory / 1024 / 1024)}MB`,
            },
            uptime: {
                seconds: Math.round(uptime),
                formatted: formatUptime(uptime),
            },
            system: {
                platform: os.platform(),
                arch: os.arch(),
                cpus: os.cpus().length,
                hostname: os.hostname(),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 'unhealthy',
            message: error.message,
        });
    }
};

/**
 * Readiness probe for Kubernetes/Docker
 * GET /api/health/ready
 */
const getReadiness = async (req, res) => {
    try {
        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                ready: false,
                message: 'Database not connected',
            });
        }

        // Optionally check other dependencies here
        // (Redis, external APIs, etc.)

        res.json({
            success: true,
            ready: true,
            message: 'Service is ready to accept traffic',
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            ready: false,
            message: error.message,
        });
    }
};

/**
 * Liveness probe for Kubernetes/Docker
 * GET /api/health/live
 */
const getLiveness = (req, res) => {
    // Simple check - if this endpoint responds, the app is alive
    res.json({
        success: true,
        alive: true,
        message: 'Service is alive',
    });
};

/**
 * Helper function to format uptime
 */
const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(' ');
};

module.exports = {
    getHealth,
    getDetailedHealth,
    getReadiness,
    getLiveness,
};
