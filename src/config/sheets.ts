// Google Sheets configuration
// To set up:
// 1. Create a Google Sheet with columns: Timestamp, Name, Email, Phone, Pickup Date, Items, Total, Special Instructions
// 2. Go to Extensions > Apps Script
// 3. Paste the code from google-apps-script.js in this repo
// 4. Deploy as Web App (Execute as: Me, Who has access: Anyone)
// 5. Copy the Web App URL and paste it below

// Hardcoded for now (env var not loading correctly)
export const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzVodOVEGiGcGBEXOrF3gZ7qyBqFqThORrHYFjBvHyTPN7DuDHNoI8l8H-qNFYA4rqJ/exec";

// Set to true to enable Google Sheets integration
export const SHEETS_ENABLED = !!GOOGLE_SHEETS_URL;
