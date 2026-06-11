# Gemini setup

Create `D:\Web Development\Shakti\my-app\.env.local` and add:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
```

`gemini-2.5-flash-lite` is used by default because it is a current lightweight model. If you still see a 429 response, the API key/project has hit Google's free-tier rate or daily quota. Wait for the quota window to reset, check the active rate limits in AI Studio, or change `GEMINI_MODEL` to another free-tier model available in your Google AI Studio account.
