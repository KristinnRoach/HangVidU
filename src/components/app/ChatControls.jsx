import { For, onMount } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import { initIcons } from '../../shared/components/ui/icons.js';
import { runAppUiAction } from '../../shared/components/ui/app-actions.js';

const controls = [
  {
    id: 'exit-watch-mode-btn',
    icon: 'x',
    labelKey: 'media.exit_watch',
    action: 'exitWatchMode',
    class: 'hidden',
  },
  {
    id: 'call-btn',
    icon: 'phone',
    labelKey: 'call.start',
    action: 'startCall',
  },
  {
    id: 'camera-btn',
    icon: 'video',
    labelKey: 'a11y.camera_toggle',
    action: 'toggleCamera',
  },
  {
    id: 'switch-camera-btn',
    icon: 'refresh-cw',
    labelKey: 'a11y.camera_switch',
    action: 'switchCamera',
  },
  {
    id: 'mic-btn',
    icon: 'mic',
    labelKey: 'a11y.mic_toggle',
    action: 'toggleMic',
  },
  {
    id: 'mute-btn',
    icon: 'volume-2',
    labelKey: 'a11y.partner_mute',
    action: 'toggleRemoteMute',
    disabled: true,
  },
  {
    id: 'fullscreen-partner-btn',
    icon: 'maximize',
    labelKey: 'a11y.fullscreen',
    action: 'fullscreenRemote',
    style: 'display: none',
  },
  {
    id: 'remote-pip-btn',
    icon: 'copy',
    labelKey: 'a11y.pip',
    action: 'toggleRemotePip',
    class: 'hidden',
    disabled: true,
  },
  {
    id: 'hang-up-btn',
    icon: 'phone-off',
    labelKey: 'call.hang_up',
    action: 'hangUp',
    disabled: true,
  },
];

export default function ChatControls() {
  const { t } = useI18n();
  let rootEl;

  onMount(() => {
    initIcons(rootEl);
  });

  return (
    <div ref={rootEl} id='chat-controls' class='hidden chat-controls bottom'>
      <For each={controls}>
        {(control) => (
          <button
            type='button'
            class={`chat-btn${control.class ? ` ${control.class}` : ''}`}
            id={control.id}
            title={t(control.labelKey)}
            aria-label={t(control.labelKey)}
            disabled={control.disabled}
            style={control.style}
            onClick={(event) => runAppUiAction(control.action, event)}
          >
            <i data-lucide={control.icon} />
          </button>
        )}
      </For>
    </div>
  );
}

