import { IncomingMessage } from "http";
import WebSocket from "ws";
import { Server } from "socket.io";

const wss = new WebSocket.Server();

// Handle WebSocket connections
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // Handle incoming messages
    console.log("Received message:", message);
    // You can perform any necessary operations or send messages back to the client
  });

  // Send a welcome message to the client
  ws.send("Welcome to the WebSocket server!");
});

export default function handler(
  req: IncomingMessage,
  res: { socket: { server: { wss: WebSocket.Server<typeof WebSocket, any> } } }
) {
  if (!res.socket.server.wss) {
    console.log("Setting up WebSocket server...");
    res.socket.server.wss = wss;
  }
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);

  function onConnect(ws: WebSocket) {
    wss.emit("connection", ws, req);
  }
}
