const { google } = require('googleapis');
const readline = require('readline');

const oAuth2Client = new google.auth.OAuth2(
  "1087708809474-k19tsdmvd6u0uhrl9csdcroo4nq1ouh9.apps.googleusercontent.com",
  "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",
  "http://localhost:5000/auth/calendar"
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar'],
  prompt: 'consent',
});

console.log("🔗 Visit this URL to authorize the app:\n", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\n📋 Paste the code from the URL here: ", async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code.trim());
    console.log("\n✅ TOKENS:\n", tokens);
    console.log("\n🔐 Copy the `refresh_token` and paste it in your `.env` file like this:");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  } catch (err) {
    console.error("❌ Error getting token:", err.message);
  } finally {
    rl.close();
  }
});
