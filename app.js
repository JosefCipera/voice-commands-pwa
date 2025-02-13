<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hlasové povely</title>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <h1>Hlasové povely</h1>
  <button id="start-btn">Povolit záznam</button>
  <button id="stop-btn">Zastavit záznam</button>
  <div id="output"></div>

  <h2>Veřejný dashboard</h2>
  <!-- Zobrazení public stránky v iframe -->
  <iframe 
    id="public-page"
    style="width: 100%; height: 500px; border: none;"
    title="Public Dashboard"
    src="https://app.tabidoo.cloud/public-dashboard/xx6481xx7f"></iframe>

  <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }

    // Inicializace rozpoznávání hlasu
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'cs-CZ'; // Nastavení češtiny
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Události pro tlačítka
    document.getElementById('start-btn').addEventListener('click', () => {
      recognition.start();
      console.log('Rozpoznávání spuštěno...');
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
      recognition.stop();
      console.log('Rozpoznávání zastaveno.');
    });

    // Zpracování výsledků rozpoznávání
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('output').innerText = `Rozpoznáno: ${transcript}`;
      console.log(`Rozpoznaný text: ${transcript}`);

      // Počkej 5 sekund a přejdi na veřejnou stránku
      setTimeout(() => {
        document.getElementById('public-page').src = "https://app.tabidoo.cloud/public-dashboard/xx6481xx7f";
        console.log('Načítání veřejné stránky...');
      }, 5000);
    };

    recognition.onerror = (event) => {
      console.error('Chyba při rozpoznávání:', event.error);
      document.getElementById('output').innerText = `Chyba: ${event.error}`;
    };
  </script>
</body>
</html>
