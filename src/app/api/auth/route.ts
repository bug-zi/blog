import { NextRequest, NextResponse } from "next/server";

// GitHub OAuth configuration
// Set these in Vercel Environment Variables:
// GITHUB_CLIENT_ID
// GITHUB_CLIENT_SECRET
const CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    // Step 1: Redirect to GitHub OAuth
    const redirectUri = `${req.nextUrl.origin}/api/auth`;
    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
    githubAuthUrl.searchParams.set("client_id", CLIENT_ID);
    githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
    githubAuthUrl.searchParams.set("scope", "repo,user");
    return NextResponse.redirect(githubAuthUrl.toString());
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

  if (tokenData.error) {
    return NextResponse.json(
      { error: tokenData.error },
      { status: 400 }
    );
  }

  // Step 3: Return HTML that posts the token to the CMS window
  const html = `
<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
  (function() {
    // Send token back to Decap CMS
    const token = "${tokenData.access_token}";
    if (window.opener) {
      window.opener.postMessage(
        { type: "authorization", code: token },
        "*"
      );
    }
    window.close();
  })();
</script>
<p>Authentication successful. You can close this window.</p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
