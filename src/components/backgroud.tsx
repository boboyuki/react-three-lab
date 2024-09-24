import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const particlesCount = 15000;
const snowUrl = 'https://i.postimg.cc/d0SHZk3J/snow.png';
const snowTexture = new THREE.TextureLoader().load(snowUrl);

export const Background = () => {
	const pointsRef = useRef<THREE.Points>(null);
	const range = 250;
	const snowsVertices = useMemo(() => {
		const velocitys = [];
		const vertices = [];
		// 粒子分佈範圍
		for (let i = 0; i < particlesCount; i++) {
			const x = THREE.MathUtils.randInt(-range, range);
			const y = THREE.MathUtils.randInt(-range, range);
			const z = THREE.MathUtils.randInt(-range, range);

			const v = THREE.MathUtils.randFloat(-0.16, 0.16);
			vertices.push(x, y, z);
			velocitys.push(v);
		}
		return { vertices, velocitys };
	}, []);

	useFrame(() => {
		if (pointsRef.current) {
			pointsRef.current.geometry.attributes.position.array.forEach((_, i, positions) => {
				if (i % 3 == 0) {
					positions[i] = positions[i] - snowsVertices.velocitys[Math.floor(i / 3)];
					if (positions[i] < -range || positions[i] > range) {
						snowsVertices.velocitys[Math.floor(i / 3)] =
							-1 * snowsVertices.velocitys[Math.floor(i / 3)];
					}
				}
				// 改變 y 軸位置
				else if (i % 3 == 1) {
					positions[i] = positions[i] - THREE.MathUtils.randFloat(0.1, 0.2);
					if (positions[i] < -range) positions[i] = range;
				}
			});
			pointsRef.current.geometry.attributes.position.needsUpdate = true;
		}
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach='attributes-position'
					array={new Float32Array(snowsVertices.vertices)}
					itemSize={3}
					count={particlesCount}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={5}
				map={snowTexture}
				sizeAttenuation={true}
				alphaTest={0.5}
				transparent={true}
			/>
		</points>
	);
};
