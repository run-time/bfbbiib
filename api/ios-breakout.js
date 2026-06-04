export default function handler(req, res) {
  // Get the host domain dynamically from the request headers
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const rootUrl = `${protocol}://${host}`;

  // 1. Force response headers that mimic an unrenderable payload
  // This causes the Facebook WebView wrapper to fail and hand the URL to iOS Safari
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="app_launcher.html"',
  );

  // 2. The script context inside the payload instantly forces the Safari frame to your home url
  const redirectHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>Redirecting...</title>
    <meta charset="utf-8">
  </head>
  <body>
    <script>
      window.location.href = "${rootUrl}";
    <\/script>
  </body>
</html>`;

  return res.status(200).send(redirectHtml);
}
