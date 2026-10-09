import AppReloadButton from './AppReloadButton';

export default function AppLogo() {
  return (
    <h1 id='app-title-h1' class='app-title'>
      <AppReloadButton
        id='app-title-button'
        class='[font:inherit] tracking-[inherit] text-primary hover:underline hover:[text-shadow:0_0_5px_#00000033]'
      >
        HvU
      </AppReloadButton>
    </h1>
  );
}
