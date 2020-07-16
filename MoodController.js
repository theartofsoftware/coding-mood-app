class MoodController {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.toggleMode = null;
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => console.log("Websocket opened");
    this.ws.onclose = () => console.log("Closing websocket");
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
