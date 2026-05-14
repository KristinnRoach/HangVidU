import { createEffect, onCleanup, splitProps, type JSX } from 'solid-js';

type VideoSource = string | Blob | null | undefined;

type VideoPlayerProps = Omit<
  JSX.VideoHTMLAttributes<HTMLVideoElement>,
  'ref' | 'src'
> & {
  source?: VideoSource;
  fit?: 'contain' | 'cover';
  onElement?: (element: HTMLVideoElement) => void;
};

export default function VideoPlayer(props: VideoPlayerProps) {
  let video!: HTMLVideoElement;
  const [local, videoProps] = splitProps(props, [
    'source',
    'fit',
    'onElement',
    'style',
  ]);

  createEffect(() => {
    if (!video) return;
    local.onElement?.(video);
  });

  createEffect(() => {
    const source = local.source;
    if (!video) return;

    let objectUrl: string | undefined;
    const nextSrc =
      source instanceof Blob
        ? (objectUrl = URL.createObjectURL(source))
        : source;

    if (nextSrc) {
      video.src = nextSrc;
      video.load();
    } else {
      video.removeAttribute('src');
      video.load();
    }

    onCleanup(() => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    });
  });

  const mergedStyle = () => ({
    width: '100%',
    height: '100%',
    'object-fit': local.fit ?? 'contain',
    'object-position': 'center center',
    ...(typeof local.style === 'object' ? local.style : {}),
  });

  return (
    <video
      {...videoProps}
      ref={video}
      style={mergedStyle()}
      playsinline
    />
  );
}
