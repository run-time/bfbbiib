export default function handler(req, res) {
  res.removeHeader('Content-Disposition');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Hardcoded production URL
  const targetUrl = "https://vercel.app";

  // Convert the URL to the iOS Google Chrome system scheme
  const chromeProtocolUrl = targetUrl.replace(/^https?:\/\//, "googlechrome://");

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
        // 1. Force the system to offer an external application handoff
        window.location.href = "${chromeProtocolUrl}";

        // 2. Safe Fallback: If Chrome isn't present, this timer ensures Safari opens the https link instead
        setTimeout(function() {
            window.location.replace("${targetUrl}");
        }, 800);
    </script>
</body>
</html>`;

  return res.status(200).send(htmlPayload);
}
