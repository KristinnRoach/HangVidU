import VideoStream from './VideoStream';

type Props = {
  stream: MediaStream;
  memberId?: string; // TODO: use as id? Why is this required in p2p RemoteMemberStream type?
  class?: string;
};

export default function RemoteStream(props: Props) {
  return (
    <section class={props.class || 'remote-stream-container'}>
      <VideoStream class='remote-stream' stream={props.stream} />
    </section>
  );
}
