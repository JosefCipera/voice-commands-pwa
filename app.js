// ✅ 1. Registrace Service Workeru (opravená cesta)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('❌ Service Worker registration failed:', error);
            });
    });
} else {
    console.warn('⚠️ Service Worker není podporován v tomto prohlížeči.');
}

// ✅ 2. Kontrola podpory hlasového rozpoznávání
if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    console.error('❌ Speech Recognition API není podporováno v tomto prohlížeči.');
    const outputElement = document.getElementById('output');
    if (outputElement) {
        outputElement.innerText = "Tento prohlížeč nepodporuje hlasové ovládání.";
    }
} else {
    // ✅ 3. Inicializace rozpoznávání hlasu
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'cs-CZ'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // ✅ 4. Kontrola existence tlačítek a registrace event listenerů
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const outputDiv = document.getElementById('output');
    const iframe = document.getElementById('public-page');

    if (startBtn && stopBtn && outputDiv && iframe) {
        startBtn.addEventListener('click', () => {
            try {
                recognition.start();
                console.log('🎤 Rozpoznávání spuštěno...');
            } catch (error) {
                console.error('❌ Chyba při spouštění rozpoznávání:', error);
            }
        });

        stopBtn.addEventListener('click', () => {
            try {
                recognition.stop();
                console.log('🛑 Rozpoznávání zastaveno.');
            } catch (error) {
                console.error('❌ Chyba při zastavení rozpoznávání:', error);
            }
        });

        // ✅ 5. Zpracování výsledků rozpoznávání
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            outputDiv.innerText = `Rozpoznáno: ${transcript}`;
            console.log(`🎤 Rozpoznaný text: ${transcript}`);

            // ✅ Počkej 5 sekund a přejdi na veřejnou stránku
            // setTimeout(() => {
            //    iframe.src = "https://app.tabidoo.cloud/public-dashboard/xx6481xx7f";
            //    console.log('🔄 Načítání veřejné stránky...');
           // }, 5000);
        };

        recognition.onerror = (event) => {
            console.error('❌ Chyba při rozpoznávání:', event.error);
            outputDiv.innerText = `Chyba: ${event.error}`;
        };
    } else {
        console.error('❌ Jeden nebo více HTML prvků nebylo nalezeno.');
    }
}
