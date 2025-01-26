const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const output = document.getElementById('output');

let recognition;

// Zkontroluj, zda je podporováno Web Speech API
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'cs-CZ'; // Nastav jazyk na češtinu
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // Zahájení záznamu
  startButton.addEventListener('click', () => {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
    output.textContent = 'Poslouchám...';
  });

  // Zastavení záznamu
  stopButton.addEventListener('click', () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  });

  // Když je záznam ukončen
  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = `Rozpoznaný text: "${transcript}"`;

    // Příklad akce na základě hlasového povelu
    if (transcript.toLowerCase().includes('ahoj')) {
      alert('Zdravím vás!');
    }
  });

  // Když dojde k chybě
  recognition.addEventListener('error', (event) => {
    output.textContent = `Chyba: ${event.error}`;
    startButton.disabled = false;
    stopButton.disabled = true;
  });
} else {
  output.textContent = 'Váš prohlížeč nepodporuje Web Speech API.';
  startButton.disabled = true;
}
