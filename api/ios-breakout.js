export default function handler(req, res) {
  // Clear out file attachment headers to stop triggering the "Page Not Found" screen
  res.removeHeader('Content-Disposition');
  
  // Set content type to standard HTML so Facebook reads it normally
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Hardcode your production SPA link
  const targetUrl = "https://vercel.app";

  // We convert your target URL into an unparseable protocol schema
  const protocolUrl = targetUrl.replace(/^https?:\/\//, "ftp://");

  const htmlPayload = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to Safari...</title>
    <style>
        body { font-family: -apple-system, sans-serif; text-align: center; padding-top: 50px; background: #f4f4f9; color: #333; }
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #0070f3; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="loader"></div>
    <p>Launching native environment...</p>
    
    <script>
        // Trigger the system protocol breakout
        window.location.href = "${protocolUrl}";

        // If the user remains on screen, fallback redirect to let them tap out manually
        setTimeout(function() {
            window.location.replace("${targetUrl}");
        }, 1500);
    </script>
</body>
</html>`;

  return res.status(200).send(htmlPayload);
}
