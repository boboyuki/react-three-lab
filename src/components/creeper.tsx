import { Vector3 } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

type FootProps = {
	position: Vector3;
};

// 定義材質包
const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

const headMap = new THREE.TextureLoader().load(
	'https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png',
);
// 苦力怕皮膚貼圖
const skinMap = new THREE.TextureLoader().load(
	'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png',
);

const skinMat = new THREE.MeshStandardMaterial({
	roughness: 0.3, // 粗糙度
	metalness: 0.8, // 金屬感
	transparent: true, // 透明與否
	opacity: 0.9, // 透明度
	side: THREE.DoubleSide, // 雙面材質
	map: skinMap, // 皮膚貼圖
});

const Head = () => {
	const headMaterials = [];
	for (let i = 0; i < 6; i++) {
		let map;

		if (i === 4) map = headMap;
		else map = skinMap;

		headMaterials.push(new THREE.MeshStandardMaterial({ map: map }));
	}

	return (
		<mesh material={headMaterials} position={[0, 6, 0]} rotation-y={0.5}>
			<boxGeometry args={[4, 4, 4]}></boxGeometry>
		</mesh>
	);
};

const Body = () => {
	return (
		<mesh material={skinMat} position={[0, 0, 0]}>
			<boxGeometry args={[4, 8, 2]}></boxGeometry>
		</mesh>
	);
};

const Foot = ({ position }: FootProps) => {
	return (
		<mesh material={skinMat} position={position}>
			<boxGeometry args={[2, 3, 2]}></boxGeometry>
		</mesh>
	);
};

export const Creeper = () => {
	const group = useRef<THREE.Group>(null);

	return (
		<group ref={group}>
			<Head />
			<Body />
			<Foot position={[-1, -5.5, 2]} />
			<Foot position={[-1, -5.5, -2]} />
			<Foot position={[1, -5.5, 2]} />
			<Foot position={[1, -5.5, -2]} />
		</group>
	);
};
