import { For, createEffect, onMount } from 'solid-js';
import { useI18n } from '../../shared/i18n/index.js';
import { initIcons } from '../../shared/components/ui/icons.js';

const controls = [
  {
    id: 'exit-watch-mode-btn',
    icon: 'x',
    labelKey: 'media.exit_watch',
    handlerKey: 'onExitWatchMode',
    class: 'hidden',
  },
  {
    id: 'call-btn',
    icon: 'phone',
    labelKey: 'call.start',
    handlerKey: 'onStartCall',
    visible: ({ callState }) => !callState.isInCall(),
  },
  {
    id: 'camera-btn',
    labelKey: 'a11y.camera_toggle',
    handlerKey: 'onToggleCamera',
    icon: ({ mediaState }) =>
      mediaState.cameraEnabled() ? 'video' : 'video-off',
    visible: ({ callState }) => callState.isInCall(),
    disabled: ({ mediaState }) => !mediaState.hasLocalMedia(),
  },
  {
    id: 'switch-camera-btn',
    icon: 'refresh-cw',
    labelKey: 'a11y.camera_switch',
    handlerKey: 'onSwitchCamera',
    visible: ({ callState, mediaState }) =>
      callState.isInCall() && mediaState.canSwitchCamera(),
    disabled: ({ mediaState }) => !mediaState.hasLocalMedia(),
  },
  {
    id: 'mic-btn',
    labelKey: 'a11y.mic_toggle',
    handlerKey: 'onToggleMic',
    icon: ({ mediaState }) => (mediaState.micMuted() ? 'mic-off' : 'mic'),
    visible: ({ callState }) => callState.isInCall(),
    disabled: ({ mediaState }) => !mediaState.hasLocalMedia(),
  },
  {
    id: 'mute-btn',
    labelKey: 'a11y.partner_mute',
    handlerKey: 'onToggleRemoteMute',
    icon: ({ mediaState }) =>
      mediaState.remoteMuted() ? 'volume-x' : 'volume-2',
    visible: ({ callState }) => callState.isInCall(),
    disabled: ({ mediaState }) => !mediaState.remoteControlsEnabled(),
  },
  {
    id: 'fullscreen-partner-btn',
    icon: 'maximize',
    labelKey: 'a11y.fullscreen',
    handlerKey: 'onFullscreenRemote',
    visible: () => false,
  },
  {
    id: 'hang-up-btn',
    icon: 'phone-off',
    labelKey: 'call.hang_up',
    handlerKey: 'onHangUp',
    visible: ({ callState }) => callState.isInCall(),
  },
];

const defaultCallState = {
  isInCall: () => false,
};

function readControlValue(value, controlState, fallback) {
  if (typeof value === 'function') return value(controlState);
  return value ?? fallback;
}

export default function ChatControls(props) {
  const { t } = useI18n();
  let rootEl;

  onMount(() => {
    initIcons(rootEl);
  });

  createEffect(() => {
    props.callState?.isInCall();
    props.mediaState?.micMuted();
    props.mediaState?.cameraEnabled();
    props.mediaState?.remoteMuted();
    queueMicrotask(() => rootEl && initIcons(rootEl));
  });

  return (
    <div ref={rootEl} id='chat-controls' class='hidden chat-controls bottom'>
      <For each={controls}>
        {(control) => {
          const controlState = () => ({
            callState: props.callState ?? defaultCallState,
            mediaState: props.mediaState,
          });
          const label = () => t(control.labelKey);
          const icon = () =>
            readControlValue(control.icon, controlState(), control.icon);
          const isVisible = () =>
            readControlValue(control.visible, controlState(), true);
          const isDisabled = () =>
            readControlValue(control.disabled, controlState(), false);
          const className = () =>
            `chat-btn${control.class ? ` ${control.class}` : ''}${
              isVisible() ? '' : ' hidden'
            }`;

          return (
            <button
              type='button'
              class={className()}
              id={control.id}
              title={label()}
              aria-label={label()}
              disabled={isDisabled()}
              onClick={(event) => {
                const handler = props[control.handlerKey];
                if (!handler) return;

                void Promise.resolve(handler(event)).catch((error) => {
                  console.error(
                    '[ChatControls] action failed:',
                    control.id,
                    error,
                  );
                });
              }}
            >
              <i data-lucide={icon()} />
            </button>
          );
        }}
      </For>
    </div>
  );
}
