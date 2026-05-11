import VideoStream from '../media/VideoStream';

type Props = {
  stream: MediaStream;
  memberId?: string; // use as key / id if needed
  class?: string;
};

export default function RemoteStream(props: Props) {
  return (
    <section class={props.class || 'remote-stream-container'}>
      <VideoStream class='remote-stream' stream={props.stream} />
    </section>
  );
}
