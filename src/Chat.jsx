import React, { useState } from "react";
import ReactMarkdown from 'react-markdown'
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chat = () => {
  const styles = {
    button: {
      backgroundColor: "rgb(198, 180, 250)",
      padding: "10px 20px",
      borderRadius: "10px",
      cursor: "pointer",
    },
    container: {
      padding: "10px",
      fontFamily: "Arial, sans-serif",
    },
    responseContainer: {
      marginTop: "20px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
    },
  };

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_AI_API_KEY;

  // Initialize the generative AI model
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Function to run the generative AI call
  const aiRun = async () => {
    setLoading(true);
    try {
      const prompt = `${input} show me step by step`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setLoading(false);
      setResponse(text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  const handleLearn = () => {
    aiRun();
  };

  return (
    <div style={styles.container}>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt"
          style={{
            padding: "50px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            width: "100px",
            marginRight: "10px",
          }}
        />
        <button style={styles.button} onClick={handleLearn}>
          Send
        </button>
      </div>
      <div style={styles.responseContainer}>
       <h3>Response:</h3>
        {loading && <p>Loading...</p>}
        <ReactMarkdown>{response}</ReactMarkdown>
        {/* <p>{response}</p> */}
      </div>
    </div>
  );
};

export default Chat;
