/**
 * Lightweight HTTP health response for the deployed functions bundle.
 */
function handleHealthCheck(_req, res) {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'hangvidu-web-push-functions',
  });
}

module.exports = {
  handleHealthCheck,
};
