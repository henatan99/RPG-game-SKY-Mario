export default class Model {
  constructor() {
    this.soundon = true;
    this.musicon = true;
    this.bgmusicPlaying = false;
  }

  set musicOn(value) {
    this.musicon = value;
  }

  get musicOn() {
    return this.musicon;
  }

  set soundOn(value) {
    this.soundon = value;
  }

  get soundOn() {
    return this.soundon;
  }

  set bgMusicPlaying(value) {
    this.bgmusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.bgmusicPlaying;
  }
}
