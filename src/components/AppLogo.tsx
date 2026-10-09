import AppReloadButton from './AppReloadButton';

export default function AppLogo() {
  return (
    <h1
      id='app-title-h1'
      class="app-title m-0 hidden select-none text-[1.8rem] font-medium tracking-[-0.15em] whitespace-nowrap [font-family:Futura,'Trebuchet_MS',sans-serif] min-[37.5625rem]:block"
    >
      <AppReloadButton
        id='app-title-button'
        class='border-b-2 border-transparent pr-[0.15em] text-[length:inherit] leading-none tracking-[inherit] text-primary hover:border-current hover:[text-shadow:0_0_5px_#00000033]'
      >
        HvU
      </AppReloadButton>
    </h1>
  );
}
