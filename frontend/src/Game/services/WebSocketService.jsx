import { useRef } from "react";

class WebSocketService {
  static instance = null;

  callbacks = {};

  constructor() {
    this.socketRef = null;
  }

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(roomName) {
    const path = `ws://localhost:8000/ws/game/${roomName}/`;
    this.socketRef = new WebSocket(path);

    this.socketRef.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (Object.keys(this.callbacks).length) {
        Object.keys(this.callbacks).forEach((key) => {
          this.callbacks[key](data);
        });
      }
    };

    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };

    this.socketRef.onerror = (e) => {
      console.error("WebSocket error:", e);
    };

    this.socketRef.onclose = () => {
      console.log("WebSocket closed");
    };
  }

  disconnect() {
    if (this.socketRef) {
      this.socketRef.close();
      this.socketRef = null;
    }
  }

  sendData(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.error("Error sending data:", err);
    }
  }

  addCallbacks(callback) {
    this.callbacks["gameData"] = callback;
  }
}

export const webSocketService = WebSocketService.getInstance();
