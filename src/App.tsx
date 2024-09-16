import './App.css';
import { Canvas } from '@react-three/fiber';
import { Plane } from './components/plane';
import { Creeper } from './components/creeper';

function App() {
	return (
		<div>
			{/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
			<Canvas>
				<Plane position={[0, -7, 0]} rotateX={-0.5 * Math.PI}></Plane>
				<Creeper></Creeper>
			</Canvas>
		</div>
	);
}

export default App;
