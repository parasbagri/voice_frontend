import React, { useState } from "react";
import axios from "axios";
import './App.css'
function App() {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);
  const [voice, setVoice] = useState("female");

  const handleSynthesize = async () => {
    try {
       // Clear the existing audio before generating a new one
       setAudio(null);
       
      const response = await axios.post("https://voice-backend-3.onrender.com/synthesize", { text }, {
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
      {/* <div>
      <label>
          <input 
          type="radio"
          name="voice"
          value="male"
          checked={voice === "male"}
          onChange={(e)=> setVoice(e.target.value)}
          />
          Male
        </label>


        <label>
          <input type="radio"
          name="voice"
          value="female"
          checked={voice === "female"}
          onChange={(e)=> setVoice(e.target.value)}
          />
          Female
        </label>
      </div> */}

      <button onClick={handleSynthesize}>Convert to Audio</button>
      {audio && (
        <div>
          <h2>Generated Audio</h2>
          <audio controls autoPlay>
            <source src={audio} type="audio/mpeg" />
          </audio>
        </div>
      )}
      {/* <div>
        <label htmlFor="male" name="voice">Male</label>
        <input type="radio" />
      </div>
      <div>
        <label htmlFor="female"name="voice">Female</label>
        <input type="radio" />
      </div> */}
    </div>
  );
}

export default App;
