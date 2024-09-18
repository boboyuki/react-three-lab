import './app.css';
import { Canvas } from '@react-three/fiber';
import { Plane } from './components/plane';
import { Creeper } from './components/creeper';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
function App() {
	const spotLightColor = new THREE.Color(0xffffff);
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas
				camera={{
					fov: 60,
					aspect: window.innerWidth / window.innerHeight,
					near: 0.1,
					far: 1000,
					position: [30, 30, 30],
				}}
			>
				<OrbitControls enableDamping dampingFactor={0.25} />
				<ambientLight intensity={0.5} color={0xeeff00} />
				<spotLight position={[-10, 40, 30]} color={spotLightColor} intensity={10} distance={100} />
				<Creeper />
				<Plane position={[0, -7, 0]} rotateX={-0.5 * Math.PI} />
				<axesHelper args={[20]} />
			</Canvas>
		</div>
	);
}

export default App;
