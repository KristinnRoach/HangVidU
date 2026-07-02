interface DialogFrameProps {
  backdropClass?: string;
  class?: string;
  titleId: string;
  descriptionId?: string;
  tone?: string;
  title: string;
  subtitle?: string;
  badge?: any;
  children?: any;
  actions?: any;
}

function joinClasses(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export default function DialogFrame(props: DialogFrameProps) {
  return (
    <div
      class={joinClasses('dialog-backdrop', props.backdropClass)}
      role="presentation"
    >
      <section
        class={joinClasses('dialog-card', props.class)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={props.titleId}
        aria-describedby={props.subtitle ? props.descriptionId : undefined}
        data-tone={props.tone || 'neutral'}
      >
        {props.badge ? <div class="dialog-badge">{props.badge}</div> : null}

        <header class="dialog-header">
          <h2 id={props.titleId} class="dialog-title">
            {props.title}
          </h2>
          {props.subtitle ? (
            <p id={props.descriptionId} class="dialog-subtitle">
              {props.subtitle}
            </p>
          ) : null}
        </header>

        {props.children ? (
          <div class="dialog-body">{props.children}</div>
        ) : null}

        {props.actions ? (
          <div class="dialog-actions">{props.actions}</div>
        ) : null}
      </section>
    </div>
  );
}
