
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Boombox.glb");
  return (
    <group ref={group} {...props} dispose={null}>

    </group>
  );
}

useGLTF.preload("/model.glb");