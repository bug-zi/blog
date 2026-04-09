import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new NextResponse(
      `<html><body>
        <h2>OAuth Configuration Missing</h2>
        <p>Please set <b>GITHUB_CLIENT_ID</b> and <b>GITHUB_CLIENT_SECRET</b> in Vercel Environment Variables.</p>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (!code) {
    // Step 1: Redirect to GitHub OAuth
    const redirectUri = `${req.nextUrl.origin}/api/auth`;
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: redirectUri,
      scope: "repo,user",
    });
    return NextResponse.redirect(
      `https://github.com/login/oauth/authorize?${params.toString()}`
    );
  }

  // Step 2: Exchange code for access token
  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error || !tokenData.access_token) {
      const errContent = JSON.stringify({ message: tokenData.error_description || tokenData.error || "Token exchange failed" });
      const html = `<!DOCTYPE html><html><body>
        <h2>OAuth Error</h2>
        <p>${tokenData.error_description || tokenData.error || "Token exchange failed"}</p>
        <script>
        (function() {
          var receiveMessage = function(message) {
            window.opener.postMessage(
              'authorization:github:error:' + ${JSON.stringify(JSON.stringify({ message: tokenData.error || "unknown" }))},
              message.origin
            );
            window.removeEventListener("message", receiveMessage, false);
          };
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
        </script>
      </body></html>`;
      return new NextResponse(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Step 3: Send token back to Decap CMS via handshake protocol
    const token = tokenData.access_token;
    const html = `<!DOCTYPE html>
<html>
<head><title>Logging in...</title></head>
<body>
<p>Logging in...</p>
<script>
(function() {
  var tokenData = ${JSON.stringify({ token, provider: "github" })};
  var receiveMessage = function(message) {
    window.opener.postMessage(
      'authorization:github:success:' + JSON.stringify(tokenData),
      message.origin
    );
    window.removeEventListener("message", receiveMessage, false);
    setTimeout(function() { window.close(); }, 500);
  };
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(
      `<html><body><h2>Error</h2><p>${message}</p></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
