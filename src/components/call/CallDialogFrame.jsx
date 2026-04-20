function joinClasses(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function CallDialogFrame(props) {
  return (
    <div
      class={joinClasses('call-dialog-backdrop', props.backdropClass)}
      role='presentation'
    >
      <section
        class={joinClasses('call-dialog-card', props.class)}
        role='dialog'
        aria-modal='true'
        aria-labelledby={props.titleId}
        aria-describedby={props.descriptionId}
        data-tone={props.tone || 'neutral'}
      >
        {props.badge ? <div class='call-dialog-badge'>{props.badge}</div> : null}

        <header class='call-dialog-header'>
          <h2 id={props.titleId} class='call-dialog-title'>
            {props.title}
          </h2>
          {props.subtitle ? (
            <p id={props.descriptionId} class='call-dialog-subtitle'>
              {props.subtitle}
            </p>
          ) : null}
        </header>

        {props.children ? (
          <div class='call-dialog-body'>{props.children}</div>
        ) : null}

        {props.actions ? <div class='call-dialog-actions'>{props.actions}</div> : null}
      </section>
    </div>
  );
}
