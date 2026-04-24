export default function VideoStage() {
  return (
    <div id='videos'>
      <div id='local-video-box' class='hidden box video-box local-video-box'>
        <video id='local-video-el' autoplay playsinline muted />
      </div>

      <div id='remote-video-box' class='hidden box video-box remote-video-box'>
        <video id='remote-video-el' autoplay playsinline />
      </div>

      <div id='shared-video-box' class='box video-box shared-video-box hidden'>
        <video id='shared-video-el' controls playsinline />
      </div>

      <div id='yt-video-box' class='box video-box yt-video-box hidden' />
    </div>
  );
}

