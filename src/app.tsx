import './app.css';
import { Canvas } from '@react-three/fiber';
import { Plane } from './components/plane';
import { Creeper } from './components/creeper';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useContext } from 'react';
import { SceneContext, SceneProvider } from './context/scene';
import { Light } from './components/light';
import { Background } from './components/backgroud';

const Scene = () => {
	const { camera: cameraRef } = useContext(SceneContext);
	return (
		<Canvas
			shadows={{
				enabled: true,
				type: 2,
			}}
		>
			<PerspectiveCamera
				makeDefault
				ref={cameraRef}
				position={[50, 50, 50]}
				fov={60}
				aspect={window.innerWidth / window.innerHeight}
				near={0.1}
				far={1000}
			/>
			<Background />
			<OrbitControls enableDamping dampingFactor={0.25} />
			<Light />
			<Creeper isScaleBody />
			<Plane position={[0, -7, 0]} rotateX={-0.5 * Math.PI} />
			<axesHelper args={[20]} />
		</Canvas>
	);
};

function App() {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<SceneProvider>
				<Scene />
			</SceneProvider>
		</div>
	);
}

export default App;
