import './App.css';
import RoomVisualizer from './RoomVisualizer/RoomVisualizer';
function App() {
  return (
    <div className="App">
      <div id='board'>
      <RoomVisualizer></RoomVisualizer>
      </div>
      <div id='heatmap'>
      <table>
  <tr>
    <th>Sensors (Room)</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>Conference</td>
    <td class='online'>ONLINE</td>
  </tr>
  <tr>
    <td>Computer lab</td>
    <td class='online'>ONLINE</td>
  </tr>
  <tr>
    <td>Hallway</td>
    <td class='online'>ONLINE</td>
  </tr>
  <tr>
    <td>Bathroom</td>
    <td class='online'>ONLINE</td>
  </tr>
  <tr>
    <td>Empty Room #1</td>
    <td class='online'>ONLINE</td>
  </tr>
  <tr>
    <td>Empty Room #2</td>
    <td class='online'>ONLINE</td>
  </tr>
</table>

      </div>
    </div>
  );
}

export default App;
