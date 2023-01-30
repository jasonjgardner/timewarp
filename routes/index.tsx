import { Head } from "$fresh/runtime.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import VideoInput from "../islands/VideoInput.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>TIMEWARRRP ⏳</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <VideoInput width={400} height={400} />
      </div>
    </>
  );
}
