import { type JSX } from "preact/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import {
  HorizontalVideoProcessor,
  VideoProcessor,
} from "../src/VideoProcessor.ts";
export default function VideoInput(
  { width, height, children }: {
    width: number;
    height: number;
    children?: JSX.Element | JSX.Element[];
  },
) {
  const horizontal = useRef<HTMLCanvasElement>(null);
  const vertical = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [source, setSource] = useState("");

  const handleFileChange = (e: Event) => {
    if (!inputRef.current) {
      console.log("inputRef.current is null");
      return;
    }

    const files = inputRef.current.files as FileList;

    const url = URL.createObjectURL(files[0]);
    setSource(url);
  };

  useEffect(() => {
    if (!videoRef.current) {
      console.log("videoRef.current is null");
      return;
    }

    if (horizontal.current) {
      const hVideoProcessor = new HorizontalVideoProcessor(
        videoRef.current as HTMLVideoElement,
        horizontal.current as HTMLCanvasElement,
      );
      console.log("hVideoProcessor", hVideoProcessor);

      hVideoProcessor.onLoad();
    }

    if (vertical.current) {
      const vVideoProcessor = new VideoProcessor(
        videoRef.current as HTMLVideoElement,
        vertical.current as HTMLCanvasElement,
      );
      console.log("vVideoProcessor", vVideoProcessor);

      vVideoProcessor.onLoad();
    }
  }, [source]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".mov,.mp4"
        onChange={handleFileChange}
      />
      {source && (
        <video
          ref={videoRef}
          width={width}
          height={height}
          controls
          src={source}
        />
      )}
      <canvas class="block" ref={vertical} width={width} height={height} />
      <canvas class="block" ref={horizontal} width={width} height={height} />
    </div>
  );
}
