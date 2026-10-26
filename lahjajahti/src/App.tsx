import './App.css'
import { gameText } from './text.ts'

function App() {
  return (
    <div className="esittelyteksti">
      <h1>{gameText.name}</h1>
      <p>{gameText.description}</p>
      <p className="ohje">{gameText.f11}</p>
    </div>
  );
}

export default App;