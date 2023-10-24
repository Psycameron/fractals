import React from "react";
import "./App.css";
import { Canvas } from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <h1 className="title">Fractals maker</h1>
      <Canvas />
      <button className="startButton" type="button">
        Create 3 start points
      </button>
    </div>
  );
}

export default App;
