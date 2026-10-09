import AppReloadButton from './AppReloadButton';

export default function AppLogo() {
  return (
    <h1 class="block select-none text-[1.8rem] font-medium tracking-[-0.15em] whitespace-nowrap font-[Futura,'Trebuchet_MS',sans-serif] max-sm:hidden">
      <AppReloadButton class='border-b-2 border-transparent pr-[0.15em] text-[length:inherit] leading-none tracking-[inherit] text-primary hover:border-current hover:[text-shadow:0_0_5px_#00000033]'>
        HvU
      </AppReloadButton>
    </h1>
  );
}
