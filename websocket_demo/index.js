const http=require("http");
const WebScoketServer=require("websocket").server;
let connection=null;

const httpserver=http.createServer((req,res)=>{
    console.log("request received");
})

const websocket=new WebScoketServer({
    "httpServer":httpserver
});

websocket.on("request",request=>{
    connection=request.accept(null,request.origin);
    connection.on("open",()=>console.log("connection opened"));
    connection.on("close",()=>console.log("connection closed"));
    connection.on("message",message=>{
        console.log(`Received message ${message.utf8Data}`);
    });
    sendMessage();
})

httpserver.listen(8080,()=>{
    console.log("server is listening on port 8080");
});

function sendMessage(){
    connection.send(`Message ${Math.random()}`);

    setTimeout(sendMessage,5000);
}