import { useState } from "react";
import "./App.css";
import { Canvas } from "./components/Canvas/Canvas";
import { getRandomIntInclusive } from "./utils/Random";

const TRIANGLE = [
  { x: 250, y: 20 },
  { x: 20, y: 480 },
  { x: 480, y: 480 },
];

function App() {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  function valueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (value > 0) {
      setIsDrawing(!isDrawing);
    }
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
        setValue={setValue}
        point={point}
        setPoint={setPoint}
        isActive={isActive}
        setIsActive={setIsActive}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
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
