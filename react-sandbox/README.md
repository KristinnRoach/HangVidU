React sandbox to verify integration between vanElla Web Components and React.

Run (from repository root or inside react-sandbox):

# install deps for sandbox

cd react-sandbox
pnpm install

# start dev server

pnpm dev

Open http://localhost:5174

Notes:

- The sandbox imports the web components from `src/utils/dom/wip-van-components/web-components.js` so ensure those files are present and registered.
- The wrapper factory used is `src/utils/dom/wip-interop/react/wrapWebComponent.js` in the main repo.
- This sandbox is intentionally minimal and isolated; it does not modify the main app.
