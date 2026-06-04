export default function handler(req, res) {
  // Hardcode your main production URL here to prevent dynamic header routing errors
  const fallbackUrl = "https://vercel.app"; 

  // Force response headers that mimic a downloadable file stream
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename="app_launcher.html"');

  // The payload script that forces iOS to trigger Safari open
  const redirectHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>Redirecting...</title>
    <meta charset="utf-8">
  </head>
  <body>
    <script>
      window.location.replace("${fallbackUrl}");
    <\/script>
  </body>
</html>`;

  return res.status(200).send(redirectHtml);
}