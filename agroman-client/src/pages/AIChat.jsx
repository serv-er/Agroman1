import { useState }
from "react";

import {
  askFarmingQuestion
} from "../services/geminiService";

function AIChat() {

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);
  
    const [isListening, setIsListening] = useState(false);
const [statusText, setStatusText] = useState("Idle");

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        text:
          "Namaste 🌾\nI am AI Mitra.\nAsk me anything about farming.",
      },
    ]);

    const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "hi-IN";
  recognition.interimResults = false;

  setIsListening(true);
  setStatusText("🎤 Sun raha hoon...");

  recognition.start();

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    setIsListening(false);
    setStatusText("Processing...");

    // directly ask AI (no awkward pause)
    handleAsk(transcript);
  };

  recognition.onerror = () => {
    setIsListening(false);
    setStatusText("Mic error");
  };
};
const speakNaturally = (text) => {

  const synth = window.speechSynthesis;

  if (!synth) {
    console.log("Speech not supported");
    return;
  }

  // Ensure voices are loaded
  let voices = synth.getVoices();

  if (voices.length === 0) {
    speechSynthesis.onvoiceschanged = () => {
      speakNaturally(text);
    };
    return;
  }

  // STOP previous speech
  synth.cancel();

  // Try Hindi voice first
  let selectedVoice =
    voices.find(v => v.lang === "hi-IN") ||
    voices.find(v => v.lang.includes("hi")) ||
    voices[0]; // fallback

  // Split into chunks (natural speech)
  const parts =
    text.match(/[^.!?]+[.!?]?/g) || [text];

  parts.forEach((part, index) => {

    const utterance =
      new SpeechSynthesisUtterance(part.trim());

    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;

    utterance.rate = 0.9;
    utterance.pitch = 1;

    // small delay between chunks
    setTimeout(() => {
      synth.speak(utterance);
    }, index * 400);

  });
};

 const handleAsk = async (inputText) => {

  const finalQuestion = inputText || question;

  if (!finalQuestion.trim()) return;

  setMessages((prev) => [
    ...prev,
    { role: "user", text: finalQuestion }
  ]);

  setQuestion("");
  setStatusText("🤖 Soch raha hoon...");

  try {

    setLoading(true);

    const recommendationInput =
      JSON.parse(localStorage.getItem("recommendationInput"));

    const response =
      await askFarmingQuestion(
        finalQuestion,
        recommendationInput
      );

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: response }
    ]);

    speakNaturally(response);

    setStatusText("Idle");

  } catch (error) {

    console.log(error);
    setStatusText("Error");

  } finally {

    setLoading(false);
  }
};

  return (

    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-md mb-6">

        <h1 className="text-4xl font-bold text-green-700 mb-2">
          AI Mitra 🤖🌾
        </h1>

        <p className="text-gray-500">
          Your smart farming assistant
        </p>

      </div>

      {/* Chat Box */}
      <div className="bg-white rounded-3xl shadow-md p-6 h-[600px] flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">

          {messages.map(
            (message, index) => (

              <div
                key={index}
                className={`max-w-[80%] p-4 rounded-3xl whitespace-pre-line ${
                  message.role === "user"
                    ? "ml-auto bg-green-600 text-white"
                    : "bg-green-100 text-gray-800"
                }`}
              >

                {message.text}

              </div>
            )
          )}

          {/* Loading */}
          {loading && (

            <div className="bg-green-100 text-gray-800 p-4 rounded-3xl w-fit">

              AI Mitra is thinking...

            </div>
          )}

        </div>

        {/* Input */}
        {/* <div className="mt-6 flex gap-4">

          <input
            type="text"
            placeholder="Ask farming question..."
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            className="flex-1 border p-4 rounded-2xl"
          />

          <button
            onClick={handleAsk}
            className="bg-green-600 hover:bg-green-700 transition text-white px-8 rounded-2xl"
          >
            Send
          </button>

        </div> */}

        <div className="mt-6 space-y-3">

  {/* STATUS */}
  <div className="text-center text-gray-500 text-sm">
    {statusText}
  </div>

  <div className="flex gap-3 items-center">

    <button
      onClick={startListening}
      className={`px-5 py-3 rounded-2xl text-white text-xl ${
        isListening
          ? "bg-red-600 animate-pulse"
          : "bg-green-600"
      }`}
    >
      🎤
    </button>

    <input
      type="text"
      placeholder="Kuch puchiye..."
      value={question}
      onChange={(e) =>
        setQuestion(e.target.value)
      }
      className="flex-1 border p-4 rounded-2xl"
    />

    <button
      onClick={() => handleAsk()}
      className="bg-green-600 text-white px-6 py-3 rounded-2xl"
    >
      Send
    </button>

  </div>

</div>

      </div>

    </div>
  );
}

export default AIChat;