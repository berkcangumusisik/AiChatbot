import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

const BASE_URL = "http://localhost:3002";
function App() {
  const [ollamaResponse, setOllamaResponse] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const handleButtonClick = async () => {

    try {
      const response = await axios.post(`${BASE_URL}/generate`,{prompt});

      const message = response.data.message;

        setOllamaResponse(message);

    } catch (error) {
      console.error(error);
    }


  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type="text" value={prompt} onInput={(event) => setPrompt(event.target.value)}/>
        <button onClick={handleButtonClick}>
          Prompt'u gönder
        </button>
        <p>
         <code>{ollamaResponse}</code>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
