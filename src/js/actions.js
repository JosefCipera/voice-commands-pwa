export async function fetchCommands() {
    try {
        console.log("📡 Načítám povely z Make...");

        const response = await fetch("https://hook.eu1.make.com/17gn7hrtmnfgsykl52dcn2ekx15nvh1f");
        if (!response.ok) throw new Error(`HTTP chyba! Status: ${response.status}`);

        const data = await response.json();
        console.log("📜 Přijatá data:", data);

        // Převod do formátu commandList, pokud Make posílá pouze jedno "url"
        if (data.url) {
            commandList = {
                "vytížení kapacit": data.url  // Změň podle skutečného příkazu
            };
        } else {
            commandList = data;
        }

        console.log("✅ Načtené povely do commandList:", commandList);

        if (Object.keys(commandList).length === 0) {
            console.warn("⚠️ Seznam povelů je prázdný!");
        }

    } catch (error) {
        console.error("❌ Chyba při načítání povelů:", error);
    }
}
