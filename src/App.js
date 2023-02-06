import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Home from "./components/Home/Home.js";

function App() {
    const [image, setImage] = useState();
    console.log(image);
    return (
        <div>
            <h1>Pixel Art Generator</h1>
            <Home setImage={setImage}></Home>
            <Canvas image={image}></Canvas>
        </div>
    );
}

export default App;
