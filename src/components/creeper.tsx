import { useFrame, Vector3 } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

type FootProps = {
	position: Vector3;
	calculateRotate: (walkOffset: number) => number;
};

const headMap = new THREE.TextureLoader().load(
	'https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png',
);
// 苦力怕皮膚貼圖
const skinMap = new THREE.TextureLoader().load(
	'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png',
);

const skinMat = new THREE.MeshStandardMaterial({
	map: skinMap, // 皮膚貼圖
});

const getHeadMaterials = () => {
	const headMaterials = [];
	for (let i = 0; i < 6; i++) {
		let map;
		if (i === 4) map = headMap;
		else map = skinMap;
		headMaterials.push(new THREE.MeshStandardMaterial({ map: map }));
	}
	return headMaterials;
};

const Head = () => {
	const ref = useRef<THREE.Mesh>(null);
	const headMaterials = getHeadMaterials();
	let rotateHeadOffset = 0;
	useFrame(() => {
		rotateHeadOffset += 0.04;
		if (rotateHeadOffset && ref.current) {
			ref.current.rotation.y = Math.sin(rotateHeadOffset);
		}
	});

	return (
		<mesh
			ref={ref}
			castShadow
			receiveShadow
			material={headMaterials}
			position={[0, 6, 0]}
			rotation-y={0.5}
		>
			<boxGeometry args={[4, 4, 4]}></boxGeometry>
		</mesh>
	);
};

const Body = () => {
	return (
		<mesh castShadow receiveShadow material={skinMat} position={[0, 0, 0]}>
			<boxGeometry args={[4, 8, 2]}></boxGeometry>
		</mesh>
	);
};

const Foot = ({ position, calculateRotate }: FootProps) => {
	const ref = useRef<THREE.Mesh>(null);
	let walkOffset = 0;
	useFrame(() => {
		walkOffset += 0.04;
		if (ref.current) {
			ref.current.rotation.x = calculateRotate(walkOffset);
		}
	});
	return (
		<mesh ref={ref} castShadow receiveShadow material={skinMat} position={position}>
			<boxGeometry args={[2, 3, 2]}></boxGeometry>
		</mesh>
	);
};

export type CreeperProps = {
	isScaleBody?: boolean;
};

export const Creeper = ({ isScaleBody }: CreeperProps) => {
	const group = useRef<THREE.Group>(null);

	let scaleHeadOffset = 0;

	useFrame(() => {
		scaleHeadOffset += 0.04;
		if (group.current && isScaleBody) {
			const scaleRate = Math.abs(Math.sin(scaleHeadOffset)) / 16 + 1;
			group.current.scale.set(scaleRate, scaleRate, scaleRate);
		}
	});

	return (
		<group ref={group}>
			<Head />
			<Body />
			<Foot
				position={[-1, -5.5, 2]}
				calculateRotate={(walkOffset: number) => {
					return Math.sin(walkOffset) / 4;
				}}
			/>
			<Foot
				position={[-1, -5.5, -2]}
				calculateRotate={(walkOffset: number) => {
					return -Math.sin(walkOffset) / 4;
				}}
			/>
			<Foot
				position={[1, -5.5, 2]}
				calculateRotate={(walkOffset: number) => {
					return -Math.sin(walkOffset) / 4;
				}}
			/>
			<Foot
				position={[1, -5.5, -2]}
				calculateRotate={(walkOffset: number) => {
					return Math.sin(walkOffset) / 4;
				}}
			/>
		</group>
	);
};
