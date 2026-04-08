import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  // Validate env vars
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new NextResponse(
      `<html><body>
        <h2>OAuth Configuration Missing</h2>
        <p>Please set <b>GITHUB_CLIENT_ID</b> and <b>GITHUB_CLIENT_SECRET</b> in Vercel Environment Variables.</p>
        <p>Then redeploy the project.</p>
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
    const errorHtml = `
<!DOCTYPE html>
<html><body>
<h2>OAuth Error</h2>
<p>${tokenData.error_description || tokenData.error || "Unknown error"}</p>
<p>Check that your GitHub OAuth App callback URL is set to: <code>${req.nextUrl.origin}/api/auth</code></p>
</body></html>`;
    return new NextResponse(errorHtml, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Step 3: Return HTML that posts token back to Decap CMS popup
  const html = `
<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<p>Logging in...</p>
<script>
(function() {
  var data = {
    type: "authorization",
    authorization: {
      code: "${tokenData.access_token}",
      provider: "github"
    }
  };
  if (window.opener) {
    window.opener.postMessage(data, "*");
  }
  setTimeout(function() { window.close(); }, 300);
})();
</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
