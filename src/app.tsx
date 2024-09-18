import './app.css';
import { Canvas } from '@react-three/fiber';
import { Plane } from './components/plane';
import { Creeper } from './components/creeper';
import { OrbitControls, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { SpotLight, Object3D, SpotLightHelper, AmbientLight } from 'three';

const Light = () => {
	const spotLightRef = useRef<SpotLight>(null);
	const ambientLightRef = useRef<AmbientLight>(null);
	useHelper(spotLightRef as React.MutableRefObject<Object3D>, SpotLightHelper, 'cyan');
	return (
		<>
			<ambientLight ref={ambientLightRef} />
			<spotLight
				ref={spotLightRef}
				position={[-10, 30, 20]}
				castShadow
				color='white'
				intensity={1}
				angle={0.3}
			/>
		</>
	);
};

function App() {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas
				shadows
				camera={{
					fov: 60,
					aspect: window.innerWidth / window.innerHeight,
					near: 0.1,
					far: 1000,
					position: [50, 50, 50],
				}}
			>
				<OrbitControls enableDamping dampingFactor={0.25} />
				{/* <ambientLight /> */}
				<Light />
				<Creeper isScaleBody />
				<Plane position={[0, -7, 0]} rotateX={-0.5 * Math.PI} />
				<axesHelper args={[20]} />
			</Canvas>
		</div>
	);
}

export default App;
