import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DemoComputer = ({ texture, ...props }) => {
  const group = useRef();
  const { scene } = useGLTF('/models/computer.glb');

  const videoRef = useRef(document.createElement('video'));
  const videoTexture = useRef(new THREE.VideoTexture(videoRef.current));

  useEffect(() => {
    const video = videoRef.current;
    video.src = texture;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});

    const tex = videoTexture.current;
    tex.flipY = false;
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        if (name.includes('screen') || name.includes('monitor') || name.includes('display')) {
          child.material = new THREE.MeshBasicMaterial({ map: videoTexture.current });
        }
      }
    });
  }, [scene, texture]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/computer.glb');

export default DemoComputer;
