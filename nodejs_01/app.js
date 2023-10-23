const http = require("http")
const server = http.createServer((req, res)=>{
    res.setHeader('content-type', 'text/html');
    const url = req.url
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    res.write('<html>')
    res.write('<head><title>my first page</title></head>')
    res.write('<body><h1>hellow from nodejs</h1></body>')
    res.write('</html>')
    res.end()
})
server.listen(3000)