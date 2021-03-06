const request = require('request');
const logger = require('heroku-logger');

const KEEP_ALIVE = process.env.KEEP_ALIVE || false;
const INTERVAL = process.env.INTERVAL || 5;

let interval = INTERVAL * 60 * 1000;


module.exports = (req, res, next) => {
    if (KEEP_ALIVE) {
        let hostname = req.headers.host;
        let protocol = req.connection.encrypted ? 'https' : 'http';
        let url = `${protocol}://${hostname}/healthcheck/`;

        function keepAlive() {
            setInterval(() => {
                logger.info(`ping every ${interval} seconds.`);
                request.get(url);
            }, interval);
        }

        keepAlive();
    };
    res.json({ success: true });
    next();
};
