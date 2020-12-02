import './App.css';
import RoomVisualizer from './RoomVisualizer/RoomVisualizer';
function App() {
  return (
    <div className="App">
      <div id='board'>
      <RoomVisualizer></RoomVisualizer>
      </div>
      <div id='heatmap'>
        <p>This is the heatmap...kinda</p>
      </div>
    </div>
  );
}

export default App;
