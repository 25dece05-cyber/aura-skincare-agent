const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");

const statusText = document.getElementById("statusText");
const voiceText = document.getElementById("voiceText");
const voiceIcon = document.getElementById("voiceIcon");

const transcript = document.getElementById("transcript");

startBtn.addEventListener("click", async () => {

  try {

    // Ask for microphone permission
    await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    statusText.textContent = "Listening";
    voiceText.textContent = "Listening...";
    voiceIcon.textContent = "🎙️";

    startBtn.disabled = true;
    endBtn.disabled = false;

    transcript.innerHTML = `
      <div>
        <strong>Aria:</strong>
        Hi! Welcome to Aura Skincare. How can I help you today?
      </div>
    `;

  } catch (error) {

    console.error(error);

    statusText.textContent = "Microphone blocked";
    voiceText.textContent = "Please allow microphone access.";

  }

});

endBtn.addEventListener("click", () => {

  statusText.textContent = "Ready";
  voiceText.textContent = "Call ended";
  voiceIcon.textContent = "🔴";

  startBtn.disabled = false;
  endBtn.disabled = true;

});