import {} from '@react-three/fiber';

type PlaneProps = {
	rotateX: number;
	position: [number, number, number];
};

export const Plane = ({ rotateX, position }: PlaneProps) => {
	return (
		<mesh name='floor' rotation-x={rotateX} position={position} receiveShadow>
			<planeGeometry args={[80, 80]} />
			<meshLambertMaterial color={0xffffff} />
		</mesh>
	);
};
