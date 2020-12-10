import './App.css';
import RoomVisualizer from './RoomVisualizer/RoomVisualizer';
function App() {
  return (
    <div className="App">
      <div id='board'>
      <RoomVisualizer></RoomVisualizer>
      </div>
      <div id='heatmap'>
        <h2>This is the heatmap...kinda</h2>
      </div>
    </div>
  );
}

export default App;
