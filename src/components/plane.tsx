import {} from '@react-three/fiber';

type PlaneProps = {
	rotateX: number;
	position: [number, number, number];
};

export const Plane = ({ rotateX, position }: PlaneProps) => {
	return (
		<mesh rotation-x={rotateX} position={position} receiveShadow>
			<planeGeometry args={[60, 60]} />
			<meshLambertMaterial color={0xffffff} />
		</mesh>
	);
};
