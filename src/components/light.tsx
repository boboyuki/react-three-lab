import { useHelper } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import {
	AmbientLight,
	Mesh,
	Object3D,
	PointLight,
	PointLightHelper,
	SpotLight,
	SpotLightHelper,
} from 'three';

export const Light = () => {
	const spotLightRef = useRef<SpotLight>(null);
	const ambientLightRef = useRef<AmbientLight>(null);
	const pointLightRef = useRef<PointLight>(null);
	const sphereLightMesh = useRef<Mesh>(null);
	const [rotateAngle, setRotateAngle] = useState(0);
	useHelper(spotLightRef as React.MutableRefObject<Object3D>, SpotLightHelper, 'cyan');
	useHelper(pointLightRef as React.MutableRefObject<Object3D>, PointLightHelper);
	useFrame(() => {
		if (rotateAngle > 2 * Math.PI) {
			setRotateAngle(0); // 超過 360 度後歸零
		} else {
			setRotateAngle(rotateAngle + 0.03); // 遞增角度
		}
		if (sphereLightMesh.current && pointLightRef.current) {
			sphereLightMesh.current.position.x = 8 * Math.cos(rotateAngle);
			sphereLightMesh.current.position.z = 4 * Math.sin(rotateAngle);
			pointLightRef.current.position.copy(sphereLightMesh.current.position);
		}
	});

	return (
		<>
			<ambientLight ref={ambientLightRef} color={0xffffff} intensity={0.5} />
			<pointLight castShadow ref={pointLightRef} color={0xccffcc} intensity={1} distance={100} />
			<mesh ref={sphereLightMesh} castShadow receiveShadow position={[0, 16, 0]}>
				<sphereGeometry args={[0.3, 32, 32]} />
				<meshBasicMaterial color={0xccffcc} />
			</mesh>
			<spotLight
				ref={spotLightRef}
				position={[-10, 30, 20]}
				castShadow
				distance={100}
				color={0xf0f0f0}
				intensity={1}
				angle={0.3}
			/>
		</>
	);
};
