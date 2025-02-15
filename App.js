// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;







import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !prompt) return alert("Please upload an image and enter a prompt.");

        const formData = new FormData();
        formData.append("image", image);
        formData.append("prompt", prompt);
        
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setDescription(response.data.description);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to generate description. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Gemini Landmark Description App</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" required />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" value={prompt} onChange={handlePromptChange} placeholder="Enter a brief prompt" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Generating..." : "Generate Description"}
                </button>
            </form>
            {description && (
                <div className="mt-4 p-3 border rounded bg-light">
                    <h4>Generated Description:</h4>
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
}

export default App;

