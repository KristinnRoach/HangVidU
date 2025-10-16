# Misc TODO's:

Bugfixes:

    Youtube sync:
        [] Ensure sync works both ways - all callers can pause, play, seek and others will sync
        [] Make sync robust - test and optimize

UI / UX:

    [] Detect and handle the case when connection is established but remoteVideo is blank/black - not streaming actual video (check if streams video track is muted, check readyState, dimensions, etc.. )

    [] Handle page reload during call

    [] Ensure robust fallbacks for maximum compatibility
        - see src/utils/fallback/

Core features:

    [] User uploaded video in Watch Mode
        - Need to sync playback position
        - Free file transfer + storage options:
            [] Easiest: GitHub CDN ?
            [] Better and still free: RTC transfer + IDB storage

    [] Support conference calls, more than two people on the same call.

    [] Support other platforms? (Currently just Youtube and direct video urls)

Standalone:

    PWA:
        [] Add install button
        [] Test core functionality
        [] Assess core benefits and create a plan

Fun / Extra:

    [] Video effects / filters / shaders

# Thoughts for later:

Things to consider / research: - Stremio support ? - Electron ? - Is server.go useful ?

IF using server.go:

    [] fix paths in all scripts and server.go files
