export const socket = new WebSocket("wss://melocure.fugamaru.com/ws/");
socket.addEventListener("open", e => {
    console.log("==========WebSocket Connected==========");
    socket.send(JSON.stringify([{ "type": "rfq" }]));
});
socket.addEventListener("message", e => {
    const received = JSON.parse(e.data)[0];
    if (received["type"] == "init") {
        const tmpQueue = [{ "type": "init", "online": received.online }, ...received["queue"]];
        sessionStorage.setItem("prevQueue", JSON.stringify(tmpQueue));
    }
});
export default socket;