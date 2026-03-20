﻿const SHEET_NAME = "registrations";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = getSheet_();

    sheet.appendRow([
      new Date(),
      payload.audience || "",
      payload.name || "",
      payload.phone || "",
      payload.email || "",
      payload.school || "",
      payload.note || "",
      payload.submittedAt || ""
    ]);

    return jsonOutput_({
      ok: true,
      message: "資料已寫入 Google Sheet"
    });
  } catch (error) {
    return jsonOutput_({
      ok: false,
      message: error.message
    });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "timestamp",
      "audience",
      "name",
      "phone",
      "email",
      "school",
      "note",
      "submittedAt"
    ]);
  }

  return sheet;
}

function jsonOutput_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
