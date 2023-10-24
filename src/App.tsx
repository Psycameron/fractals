import { useState } from "react";
import "./App.css";
import { Canvas } from "./components/Canvas/Canvas";

function App() {
  const [value, setValue] = useState(0);

  function valueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <h1 className="title">Fractals maker</h1>
      <Canvas value={value} />
      <form onSubmit={handleSubmit}>
        <input type="number" min="0" value={value} onChange={valueChange} />
        <button className="startButton" type="submit">
          Generate points
        </button>
      </form>
    </div>
  );
}

export default App;
