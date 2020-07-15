import pianoHorror from './assets/mixkit-piano-horror-671.mp3';
import upbeatSong from './assets/terrors-vennart.mp3';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const SOUND_MAP = {
  spooky: pianoHorror,
  upbeat: upbeatSong,
};

class SoundPlayer {
  constructor(audioModule) {
    this.audioModule = audioModule;
    this._sounds = {};
  }

  async init() {
    await this.audioModule.setAudioModeAsync(
      {
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      },
    );

    for (let [name, soundFile] of Object.entries(SOUND_MAP)) {
      const sound = new this.audioModule.Sound();
      await sound.loadAsync(soundFile);
      await sound.setVolumeAsync(0);
      await sound.setIsLoopingAsync(true);
      this._sounds[name] = sound;

      if (!this.currentSound) {
        this.currentSound = sound;
      }
    }
  }

  async _fadeIn() {
    let { volume } = await this.currentSound.getStatusAsync();

    while (volume < 1) {
      await this.currentSound.setVolumeAsync(Math.min(1, volume + 0.1));
      volume += 0.1
      await sleep(250);
    }
  }

  async start() {
    await this.currentSound.playAsync();
    await this._fadeIn();
  }

  _setCurrentSong(name) {
    this.currentSound = this._sounds[name];
  }

  async toggleSong() {
    await this.pause();
    const nextSong = (this.currentSound == this._sounds.spooky) ? 'upbeat' : 'spooky';
    this._setCurrentSong(nextSong);
    await this.start();
  }

  async _fadeOut() {
    let { volume } = await this.currentSound.getStatusAsync();

    while (volume > 0) {
      await this.currentSound.setVolumeAsync(Math.max(0, volume - 0.1));
      volume -= 0.1
      await sleep(250);
    }
  }

  async pause() {
    await this._fadeOut();
    await this.currentSound.pauseAsync();
  }

  async stop() {
    await this._fadeOut();
    await this.currentSound.stopAsync();
  }
}

export default SoundPlayer;
