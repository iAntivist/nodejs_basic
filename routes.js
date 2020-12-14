const fs    = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    //console.log(req.url, req.method, req.headers);
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Input Form</title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST">');
        res.write('<input type="text" name="pesan"><button type="submit">Submit</button>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);    
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.text', message);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Hello from Respon</title></head>');
    res.write('<body>');
    res.write('<h1>Hello from Respon</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler: requestHandler,
    someText: "it work's"
};