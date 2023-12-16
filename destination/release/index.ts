import { fastify } from "fastify"
import OU from "openurl"

start().catch(console.log)

async function start() {
    const server = fastify({ logger: false })
    
    server.get(`/`, (q,p) => p
        .code(200)
        .header('Content-Type', 'text/html')
        .send(`<h1>Hello World</h1><h2>${new Date}</h2><h3>${Math.random()}</h3>`)
    )
    
    const port = await new Promise((r, j) => 
        server.listen({port: 0, host: "::"}, (e,a) => 
            e ? j(e) : r(+a.split(":").pop()!)))
    
    const url = `http://localhost:${port}`
    
    console.log(url)
    OU.open(url)
}