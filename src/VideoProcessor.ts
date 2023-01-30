export class VideoProcessor {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  _currentTick = 0;
  constructor(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
  ) {
    this.video = video;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  onLoad() {
    // const maxDuration = 10;
    // this.video.playbackRate = this.video.duration / maxDuration;

    this.video.addEventListener("play", () => {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      this.tick();
    });
  }

  tick() {
    if (this.video.paused || this.video.ended) {
      return;
    }

    this.computeProgress();

    ++this._currentTick;

    requestAnimationFrame(this.tick.bind(this));
  }

  get progress() {
    return this.video.currentTime / this.duration;
  }

  get duration() {
    const MAX_DURATION = 60 * 60 * 4;
    return Math.min(this.video.duration, MAX_DURATION);
  }

  get position() {
    return this.progress * this.video.videoHeight;
  }

  get size() {
    return Math.abs(this._currentTick - this.position);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.progress * this.video.videoHeight;
  }

  get x() {
    return 0;
  }

  get y() {
    return this.position;
  }

  /**
   * Draw on Y axis
   */
  computeProgress() {
    // Take the row of pixels from the current video progress
    this.ctx.drawImage(
      this.video,
      this.x, // Start copy at left edge
      this.y, // Start at current progress
      this.width, // Take the whole width
      this.size, // Take the height of the current tick
      this.x, // Place at left edge
      this.height, // Place at current progress
      this.width, // Fill the whole width
      this.size,
    );
  }
}

export class HorizontalVideoProcessor extends VideoProcessor {
  constructor(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
    super(video, canvas);
  }

  get position() {
    return this.progress * this.video.videoWidth;
  }

  get width() {
    return this.size;
  }

  get height() {
    return this.canvas.height;
  }

  get x(): number {
    return this.position;
  }

  get y() {
    return 0;
  }

  /**
   * Draw on X axis
   */
  computeProgress() {
    // Take the column of pixels from the current video progress
    this.ctx.drawImage(
      this.video,
      this.position,
      0,
      this.size,
      this.canvas.height,
      Math.ceil(this.progress * this.canvas.width),
      0,
      this.size,
      this.canvas.height,
    );
  }
}
