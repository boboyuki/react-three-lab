import { Vector3 } from '@react-three/fiber';
import * as THREE from 'three';

type FootProps = {
	position: Vector3;
};

// 定義材質包
const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

const Head = () => {
	return (
		<mesh material={creeperMat} position={[0, 6, 0]}>
			<boxGeometry args={[4, 4, 4]}></boxGeometry>
		</mesh>
	);
};

const Body = () => {
	return (
		<mesh material={creeperMat} position={[0, 0, 0]}>
			<boxGeometry args={[4, 8, 2]}></boxGeometry>
		</mesh>
	);
};

const Foot = ({ position }: FootProps) => {
	return (
		<mesh material={creeperMat} position={position}>
			<boxGeometry args={[2, 3, 2]}></boxGeometry>
		</mesh>
	);
};

export const Creeper = () => {
	return (
		<group>
			<Head />
			<Body />
			<Foot position={[-1, -5.5, 2]} />
			<Foot position={[-1, -5.5, -2]} />
			<Foot position={[1, -5.5, 2]} />
			<Foot position={[1, -5.5, -2]} />
		</group>
	);
};
