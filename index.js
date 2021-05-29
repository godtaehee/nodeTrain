const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>Hi world</h1>');
    res.write('<h1>Hi wossssssrld</h1>');
    res.end('<p>gogogogo</p>');
});


server.listen('8080', () => {
    console.log('http://localhost:8080');
})