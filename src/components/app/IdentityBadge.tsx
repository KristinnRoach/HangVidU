import { Show, createEffect, createMemo, createSignal } from 'solid-js';

function smartTruncateName(fullName: string, maxLength = 10): string {
  if (!fullName || fullName.length <= maxLength) {
    return fullName;
  }

  const firstName = fullName.split(' ')[0];
  if (firstName.length <= maxLength) {
    return firstName;
  }

  return `${firstName.slice(0, maxLength - 3)}...`;
}

interface IdentityBadgeProps {
  name: string;
  photoUrl?: string | null;
}

/** Presentational name + avatar chip. Pure props; no auth or
 *  conversation knowledge — the layout owner decides whose identity
 *  it shows. */
export default function IdentityBadge(props: IdentityBadgeProps) {
  const [avatarFailed, setAvatarFailed] = createSignal(false);

  const displayName = createMemo(() => smartTruncateName(props.name));
  const avatarInitial = createMemo(() =>
    props.name.trim().slice(0, 1).toUpperCase(),
  );

  createEffect(() => {
    props.photoUrl;
    setAvatarFailed(false);
  });

  return (
    <div class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-neutral-300 transition duration-300 starting:translate-x-2.5 starting:opacity-0">
      <Show
        when={props.photoUrl && !avatarFailed()}
        fallback={
          <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-xl">
            {avatarInitial()}
          </span>
        }
      >
        <img
          src={props.photoUrl!}
          alt={displayName()}
          class="size-9 rounded-full object-cover"
          referrerpolicy="no-referrer"
          onError={() => setAvatarFailed(true)}
        />
      </Show>

      <span class="overflow-hidden text-ellipsis whitespace-nowrap">
        {displayName()}
      </span>
    </div>
  );
}
