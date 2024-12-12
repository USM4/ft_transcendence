const socket = new WebSocket("ws://localhost:8000/ws/game/");

socket.onmessage = (event) => {
    const gameState = JSON.parse(event.data);
    console.log(gameState);
};

socket.onclose = () => {
    console.log("WebSocket closed");
};

socket.onerror = (error) => {
    console.error("WebSocket error", error);
};
