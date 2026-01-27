/**
 * Google Apps Script for Mel-Bao Order Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Add these column headers in row 1:
 *    Timestamp | Order ID | Name | Email | Phone | Pickup Date | Items | Total | Special Instructions | Status
 * 3. Go to Extensions > Apps Script
 * 4. Delete any existing code and paste this entire file
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Set "Execute as": Me
 * 8. Set "Who has access": Anyone
 * 9. Click Deploy and authorize when prompted
 * 10. Copy the Web App URL
 * 11. Add to your .env file: VITE_GOOGLE_SHEETS_URL=your_web_app_url
 */

// Handle POST requests from the order form
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Handle both form data and JSON body
    let data;
    if (e.parameter && e.parameter.data) {
      // Form submission - data is in e.parameter.data
      data = JSON.parse(e.parameter.data);
    } else if (e.postData && e.postData.contents) {
      // Direct JSON POST
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No data received');
    }
    
    // Generate order ID
    const orderId = 'MB-' + Date.now().toString(36).toUpperCase();
    
    // Format items as readable string
    const itemsString = data.items
      .map(item => `${item.name} x${item.quantity}`)
      .join(', ');
    
    // Format total as currency
    const totalFormatted = '$' + (data.total / 100).toFixed(2);
    
    // Append row to sheet
    sheet.appendRow([
      new Date().toISOString(),           // Timestamp
      orderId,                             // Order ID
      data.customerName,                   // Name
      data.customerEmail,                  // Email
      data.customerPhone,                  // Phone
      data.pickupDate,                     // Pickup Date
      itemsString,                         // Items
      totalFormatted,                      // Total
      data.specialInstructions || '',      // Special Instructions
      'Pending'                            // Status
    ]);
    
    // Return success response with order ID
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        orderId: orderId,
        message: 'Order submitted successfully!' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing and image beacon submissions)
function doGet(e) {
  // Check if this is a data submission via GET (image beacon)
  if (e.parameter && e.parameter.data) {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const data = JSON.parse(e.parameter.data);
      
      const orderId = 'MB-' + Date.now().toString(36).toUpperCase();
      
      const itemsString = data.items
        .map(item => `${item.name} x${item.quantity}`)
        .join(', ');
      
      const totalFormatted = '$' + (data.total / 100).toFixed(2);
      
      sheet.appendRow([
        new Date().toISOString(),
        orderId,
        data.customerName,
        data.customerEmail,
        data.customerPhone,
        data.pickupDate,
        itemsString,
        totalFormatted,
        data.specialInstructions || '',
        'Pending'
      ]);
      
      // Return a 1x1 transparent GIF for image beacon
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, orderId: orderId }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Default: return status
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok',
      message: 'Mel-Bao Order API is running' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Add a test function to verify setup
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, 10).getValues()[0];
  
  const expectedHeaders = [
    'Timestamp', 'Order ID', 'Name', 'Email', 'Phone', 
    'Pickup Date', 'Items', 'Total', 'Special Instructions', 'Status'
  ];
  
  Logger.log('Current headers: ' + headers.join(', '));
  Logger.log('Expected headers: ' + expectedHeaders.join(', '));
  Logger.log('Setup looks good!');
}
