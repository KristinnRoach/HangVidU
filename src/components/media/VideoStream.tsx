import { createEffect, onCleanup, Show } from 'solid-js';
import styles from './VideoStream.module.css';

type Props = {
  stream?: MediaStream;
  muted?: boolean;
  class?: string;
  id?: string;
};

export default function VideoStream(props: Props) {
  let video!: HTMLVideoElement;

  createEffect(() => {
    const stream = props.stream;
    if (!video) return;

    video.srcObject = stream ?? null;
    if (stream) {
      video.play().catch(() => {});
    }

    // set programmatically for Firefox compatibility
    video.setAttribute('playsinline', 'true');

    onCleanup(() => {
      video.srcObject = null;
    });
  });

  return (
    <Show when={props.stream && props.stream.getVideoTracks().length > 0}>
      <video
        class={props.class || styles.videoStream}
        ref={video}
        autoplay
        muted={props.muted}
      />
    </Show>
  );
}
