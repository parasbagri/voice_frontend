import React, { useState } from "react";
import axios from "axios";
import './App.css'
function App() {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);

  const handleSynthesize = async () => {
    try {
       // Clear the existing audio before generating a new one
       setAudio(null);
       
      const response = await axios.post("http://localhost:5000/synthesize", { text }, {
        responseType: "blob", 
      });
      const audioUrl = URL.createObjectURL(response.data);
      setAudio(audioUrl);
      // setAudio(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Text To Speech Converter</h1>
      <textarea
        rows="3"
        cols="50"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSynthesize}>Convert to Audio</button>
      {audio && (
        <div>
          <h2>Generated Audio:</h2>
          <audio controls>
            <source src={audio} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;
