import { useState } from "react";
import "./App.css";
import { Canvas } from "./components/Canvas/Canvas";

function App() {
  const [point, setPoint] = useState([]);
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function valueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <h1 className="title">Fractals maker</h1>
      {!isActive ? (
        <h2>Draw the first point inside the figure</h2>
      ) : (
        <h2>Select the number of new points to generate</h2>
      )}
      <Canvas
        value={value}
        setPoint={setPoint}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <form onSubmit={handleSubmit}>
        <input type="number" min="0" value={value} onChange={valueChange} />
        <button className="startButton" type="submit" disabled={!isActive}>
          Generate points
        </button>
      </form>
    </div>
  );
}

export default App;
