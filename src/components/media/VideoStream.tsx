import { createEffect, onCleanup, Show } from 'solid-js';
import styles from './VideoStream.module.css';

type Props = {
  stream?: MediaStream;
  id?: string;
  muted?: boolean;
  baseClass?: string;
  classList?: Record<string, boolean | undefined>;
  local?: boolean;
  preview?: boolean;
};

export default function VideoStream(props: Props) {
  let video!: HTMLVideoElement;
  const shouldMute = () => props.muted ?? props.local ?? props.preview ?? false;

  createEffect(() => {
    const stream = props.stream;
    if (!video) return;

    video.srcObject = stream ?? null;
    video.muted = shouldMute();
    if (stream) {
      video.play().catch(() => {});
    }

    // set programmatically for Firefox compatibility
    video.setAttribute('playsinline', 'true');

    function debugVideoResize() {
      {
        console.info(
          '[VIDEO RESIZE DEBUG]',
          video.videoWidth,
          video.videoHeight,
          'isLocal:',
          !!props.local,
        );
      }
    }

    import.meta.env.DEV && video.addEventListener('resize', debugVideoResize);

    onCleanup(() => {
      video.srcObject = null;
      import.meta.env.DEV &&
        video.removeEventListener('resize', debugVideoResize);
    });
  });

  return (
    <Show when={props.stream && props.stream.getVideoTracks().length > 0}>
      <video
        id={props.id}
        class={props.baseClass ?? styles.videoStream}
        classList={{
          [styles.local]: props.local,
          [styles.preview]: props.preview,
          ...props.classList,
        }}
        ref={video}
        autoplay
        muted={shouldMute()}
      />
    </Show>
  );
}
