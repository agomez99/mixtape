import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Suspense } from "react";
import { DirectionalLight } from "three";

const Scene = () => {
    const fbx = useLoader(FBXLoader, "BoomBox.fbx");
    const light = new DirectionalLight('white', 8);

    light.position.set(10, 10, 10);
    return <primitive object={fbx}  

    castShadow
    receiveShadow
    position={[0, 0, 0]}
    light={light}
    scale={0.009} 
    zoom={0.009}

    />;
  };
  
export default function Boombox(){
    return (
        <div className="boomscene">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
      );
}