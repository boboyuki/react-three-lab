import { useFrame, Vector3 } from '@react-three/fiber';
import { forwardRef, useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group, Mesh } from 'three';
import { Easing, Tween } from '@tweenjs/tween.js';
import { SceneContext } from '../context/scene';

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

const Head = forwardRef<Mesh>((_, ref) => {
	const headRef = useRef<Mesh>(null);
	const headMaterials = getHeadMaterials();
	let rotateHeadOffset = 0;
	useFrame(() => {
		rotateHeadOffset += 0.04;
		if (rotateHeadOffset && headRef.current) {
			headRef.current.rotation.y = Math.sin(rotateHeadOffset);
		}
	});

	return (
		<mesh
			ref={ref || headRef}
			castShadow
			receiveShadow
			material={headMaterials}
			position={[0, 6, 0]}
			rotation-y={0.5}
		>
			<boxGeometry args={[4, 4, 4]}></boxGeometry>
		</mesh>
	);
});

const Body = forwardRef<Mesh>((_, ref) => {
	const bodyRef = useRef<Mesh>(null);
	return (
		<mesh ref={ref || bodyRef} castShadow receiveShadow material={skinMat} position={[0, 0, 0]}>
			<boxGeometry args={[4, 8, 2]}></boxGeometry>
		</mesh>
	);
});

const Foot = forwardRef<Mesh, FootProps>(({ position, calculateRotate }, ref) => {
	const footRef = useRef<Mesh>(null);
	let walkOffset = 0;
	useFrame(() => {
		walkOffset += 0.04;
		if (footRef.current) {
			footRef.current.rotation.x = calculateRotate(walkOffset);
		}
	});
	return (
		<mesh ref={ref} castShadow receiveShadow material={skinMat} position={position}>
			<boxGeometry args={[2, 3, 2]}></boxGeometry>
		</mesh>
	);
});

export type CreeperProps = {
	isScaleBody?: boolean;
};

export const Creeper = ({ isScaleBody }: CreeperProps) => {
	const { camera } = useContext(SceneContext);
	const offsetRef = useRef({ x: 0, z: 0, rotateY: 0 });
	const targetRef = useRef({ x: 20, z: 20, rotateY: 0.7853981633974484 });
	const tweenRef = useRef<Tween>(new Tween(offsetRef.current));
	const tweenBackRef = useRef<Tween>(new Tween(offsetRef.current));
	const invertRef = useRef(1);
	const creeperRef = useRef<Group>(null);
	const headRef = useRef<THREE.Mesh>(null);
	const bodyRef = useRef<THREE.Mesh>(null);
	const feetRef = useRef<Group>(null);
	const feet1Ref = useRef<THREE.Mesh>(null);
	const feet2Ref = useRef<THREE.Mesh>(null);
	const feet3Ref = useRef<THREE.Mesh>(null);
	const feet4Ref = useRef<THREE.Mesh>(null);

	let scaleHeadOffset = 0;
	const handleTween = () => {
		const onUpdate = () => {
			if (!creeperRef.current) return;
			// 移動
			creeperRef.current.position.x = offsetRef.current.x;
			creeperRef.current.position.z = offsetRef.current.z;

			// 轉身
			if (targetRef.current.x > 0) {
				creeperRef.current.rotation.y = offsetRef.current.rotateY;
			} else {
				creeperRef.current.rotation.y = -offsetRef.current.rotateY;
			}
		};

		// 計算新的目標值
		const handleNewTarget = () => {
			if (!camera.current) return;
			// 限制苦力怕走路邊界
			if (camera.current.position.x > 30) targetRef.current.x = 20;
			else if (camera.current.position.x < -30) targetRef.current.x = -20;
			else targetRef.current.x = camera.current.position.x;
			if (camera.current.position.z > 30) targetRef.current.z = 20;
			else if (camera.current.position.z < -30) targetRef.current.z = -20;
			else targetRef.current.z = camera.current.position.z;

			const v1 = new THREE.Vector2(0, 1); // 原點面向方向
			const v2 = new THREE.Vector2(targetRef.current.x, targetRef.current.z); // 苦力怕面向新相機方向

			// 內積除以純量得兩向量 cos 值
			let cosValue = v1.dot(v2) / (v1.length() * v2.length());

			// 防呆，cos 值區間為（-1, 1）
			if (cosValue > 1) cosValue = 1;
			else if (cosValue < -1) cosValue = -1;
			// cos 值求轉身角度
			targetRef.current.rotateY = Math.acos(cosValue);
		};

		// 朝相機移動
		tweenRef.current
			.to(targetRef.current, 3000)
			.easing(Easing.Quadratic.Out)
			.onUpdate(onUpdate)
			.onComplete(() => {
				invertRef.current = -1;
				tweenBackRef.current?.start();
			});

		// 回原點
		tweenBackRef.current
			.to({ x: 0, z: 0, rotateY: 0 }, 3000)
			.easing(Easing.Quadratic.Out)
			.onUpdate(onUpdate)
			.onComplete(() => {
				handleNewTarget(); // 計算新的目標值
				invertRef.current = 1;
				tweenRef.current.start();
			});
	};

	useFrame(() => {
		scaleHeadOffset += 0.04;
		if (creeperRef.current && isScaleBody) {
			const scaleRate = Math.abs(Math.sin(scaleHeadOffset)) / 16 + 1;
			creeperRef.current.scale.set(scaleRate, scaleRate, scaleRate);
		}
		if (tweenRef.current && tweenBackRef.current && invertRef.current !== null && camera.current) {
			tweenRef.current.update();
			tweenBackRef.current.update();
		}
	});

	useEffect(() => {
		handleTween();
		if (invertRef.current > 0) {
			tweenRef.current.start();
		} else {
			tweenBackRef.current.start();
		}
	}, []);
	return (
		<group ref={creeperRef} castShadow receiveShadow>
			<Head ref={headRef} />
			<Body ref={bodyRef} />
			<group ref={feetRef}>
				<Foot
					ref={feet1Ref}
					position={[-1, -5.5, 2]}
					calculateRotate={(walkOffset: number) => Math.sin(walkOffset) / 4}
				/>
				<Foot
					ref={feet2Ref}
					position={[-1, -5.5, -2]}
					calculateRotate={(walkOffset: number) => -Math.sin(walkOffset) / 4}
				/>
				<Foot
					ref={feet3Ref}
					position={[1, -5.5, 2]}
					calculateRotate={(walkOffset: number) => -Math.sin(walkOffset) / 4}
				/>
				<Foot
					ref={feet4Ref}
					position={[1, -5.5, -2]}
					calculateRotate={(walkOffset: number) => Math.sin(walkOffset) / 4}
				/>
			</group>
		</group>
	);
};
