import VideoStream from './VideoStream';

type Props = {
  stream?: MediaStream;
};

export default function LocalStream(props: Props) {
  return (
    <section class='local-stream-container'>
      <VideoStream class='local-stream' stream={props.stream} muted />
    </section>
  );
}
