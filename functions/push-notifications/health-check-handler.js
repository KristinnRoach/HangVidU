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
