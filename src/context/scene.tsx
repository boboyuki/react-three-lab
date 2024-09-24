import { createContext, useRef } from 'react';
import { PerspectiveCamera as PerspectiveCameraType } from 'three';

type SceneContextType = {
	camera: React.RefObject<PerspectiveCameraType>;
};
export const SceneContext = createContext<SceneContextType>({
	camera: { current: null },
});

export const SceneProvider = ({ children }: { children: React.ReactNode }) => {
	const camera = useRef<PerspectiveCameraType>(null);

	return <SceneContext.Provider value={{ camera }}>{children}</SceneContext.Provider>;
};
