import { GOOGLE_SHEETS_API_KEY, spreadsheetId, SHEET_NAME } from "./config.js"; // ✅ Opravený import
import { getAccessToken } from "./auth.js"; // ✅ Import správné funkce pro token
import { updateRange } from "./config.js"; // ✅ Import rozsahu z config.js

export async function updateSheetData(updatedData) {
    console.log("🔄 Aktualizuji Google Sheet...", updatedData);

    const accessToken = getAccessToken(); // ✅ Získání aktuálního tokenu
    if (!accessToken) {
        console.error("❌ Chyba: Přístupový token není dostupný.");
        return;
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${updateRange}?valueInputOption=RAW`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}` // ✅ Správně použijeme token
        },
        body: JSON.stringify({ values: updatedData })
    });

    const result = await response.json();
    console.log("✅ Výsledek aktualizace:", result);
}

export async function fetchSheetData(spreadsheetId, range) {
    console.log("📥 Načítám data z Google Sheets...", spreadsheetId, range);
    console.log("📌 API požadavek:", `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`);

    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();
    console.log("📊 API odpověď:", data);

    if (data.error) {
        console.error("❌ Chyba při načítání dat:", data.error);
    }

    return data;
}


