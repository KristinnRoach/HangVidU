# Misc TODO's:

    Youtube:
     - sync:
        [x] Ensure sync works both ways - all callers can pause, play, seek and others will sync
        [] Make sync robust - test and optimize
     - search:
        [x] allow searching for videos without navigating to youtube if possible.

Bugfixes:

    [] Refactor old toggleModeBtn vs title link logic. Should be functionally the same as it is now, but should be separate elements (even though both are in the same place and look the same they serve different purposes)

UI / UX:

    [] Elaborate drafted "Fallback" strategy in utils/fallback/ :
        [] Consider different browser / platform permissions
        [] Which browsers / platforms do we prioritize, which are feasible?
        [] Plan, steering, specs and prioritized implementation roadmap


    [x] Detect and handle the case when connection is established but remoteVideo is blank/black - not streaming actual video (check if streams video track is muted, check readyState, dimensions, etc.. )

    [] Ensure robust fallbacks for maximum compatibility

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
        [] Decide which offline capabilities are most feasible and useful
        [] Plan, steering, specs and prioritized implementation roadmap

Fun / Extra:

    [] Video effects / filters / shaders

# Thoughts for later:

Things to consider / research: - Stremio support ? - Electron ? - Is server.go useful ?

IF using server.go:

    [] fix paths in all scripts and server.go files
