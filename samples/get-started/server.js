const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    if (req.method === 'GET' && req.url === '/rpc') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'GET request received' }));
    } else if (req.method === 'POST' && req.url === '/rpc') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'POST request received', data: body }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} at localhost`);
});