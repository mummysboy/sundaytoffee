/**
 * Sunday Toffee - Google Apps Script
 *
 * HOW TO DEPLOY:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this entire file into the editor (replace any existing code)
 * 3. Click Deploy > New deployment
 * 4. Select type: "Web app"
 * 5. Set "Execute as" to your Google account
 * 6. Set "Who has access" to "Anyone"
 * 7. Click Deploy and authorize when prompted
 * 8. Copy the Web App URL
 * 9. Paste that URL into order.html where it says APPS_SCRIPT_URL
 *
 * The script will automatically create a "Sunday Toffee Orders" sheet
 * if one doesn't exist, with the correct column headers.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Orders');

    if (!sheet) {
      sheet = ss.insertSheet('Orders');
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        '8oz Qty',
        '4oz Qty',
        'Total',
        'Pickup Window',
        'Payment Method',
        'Notes'
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.qty8oz || 0,
      data.qty4oz || 0,
      data.total || '$0',
      data.pickupWindow || '',
      data.paymentMethod || '',
      data.notes || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Sunday Toffee order endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
