class MoodController {
  constructor(url, soundPlayer, reconnectDelay=1000) {
    this.url = url;
    this.ws = null;
    this.closed = false;
    this.setFlashColor = () => {};

    this.soundPlayer = soundPlayer;
    this.reconnectDelay = reconnectDelay;
  }

  setFlashColorCb(setFlashColor) {
    this.setFlashColor = setFlashColor;
  }

  async start() {
    await this.soundPlayer.init();
    await this.soundPlayer.start();
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => console.log("Websocket opened");
    this.ws.onclose = () => {
      if (!this.closed) {
        console.log("Websocket closed. Will try to re-connect");
        setTimeout(() => this.connect(), this.reconnectDelay);
      }
    };
    this.ws.onmessage = e => this.onMessage(e.data);
  }

  async onMessage(data) {
    const { state } = JSON.parse(data);

    if (state === "working") {
      this.setFlashColor("#000");
      await this.soundPlayer.toggleSong();
    } else if (state === "broken") {
      this.setFlashColor("#f00");
      await this.soundPlayer.toggleSong();
    }
  }

  stop() {
    if (this.ws) {
      this.closed = true;
      this.ws.close();
    }
  }
}

export default MoodController;
