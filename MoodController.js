class MoodController {
  constructor(url, reconnectDelay=1000) {
    this.url = url;
    this.ws = null;
    this.toggleMode = null;
    this.reconnectDelay = reconnectDelay;
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => console.log("Websocket opened");
    this.ws.onclose = () => {
      console.log("Websocket closed. Will try to re-connect");
      setTimeout(() => this.connect(), this.reconnectDelay);
    };
    this.ws.onmessage = e => this.onMessage(e.data);
  }

  setToggleModeCallback(toggleMode) {
    this.toggleMode = toggleMode;
  }

  onMessage(data) {
    const parsedData = JSON.parse(data);
    if (parsedData.code_state === "working" && this.toggleMode) {
      this.toggleMode();
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default MoodController;
