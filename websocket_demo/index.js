const http=require("http");
const WebScoketServer=require("websocket").server;
let connection=null;

const httpserver=http.createServer((req,res)=>{
    console.log("request received");
});

const websocket=new WebScoketServer({
    "httpServer":httpserver
});

websocket.on("request",(request)=>{
    connection=request.accept(null,request.origin);
    connection.on("onopen",()=>console.log("connection opened"));
    connection.on("onclose",()=>console.log("connection closed"));
    connection.on("message",(message)=>{
        console.log(`Received message ${message}`);
    });
})

httpserver.listen(3000,()=>{
    console.log("server is listening on port 3000");
});