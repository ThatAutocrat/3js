import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DemoComputer = ({ texture, ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/computer.glb');

  const videoRef = useRef(document.createElement('video'));

  useEffect(() => {
    const video = videoRef.current;
    video.src = texture;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.play();
  }, [texture]);

  const videoTexture = new THREE.VideoTexture(videoRef.current);
  videoTexture.flipY = false;
  videoTexture.minFilter = THREE.NearestFilter;
  videoTexture.magFilter = THREE.NearestFilter;
  videoTexture.generateMipmaps = false;
  videoTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="screen" geometry={nodes['monitor_screen_0']?.geometry} material={materials['screen'] || materials[Object.keys(materials)[0]]}>
          <meshBasicMaterial map={videoTexture} />
        </mesh>
        {Object.keys(nodes)
          .filter((key) => key !== 'Scene' && key !== 'monitor_screen_0')
          .map((key) =>
            nodes[key].isMesh ? (
              <mesh
                key={key}
                castShadow
                receiveShadow
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                position={nodes[key].position}
                rotation={nodes[key].rotation}
                scale={nodes[key].scale}
              />
            ) : null,
          )}
      </group>
    </group>
  );
};

useGLTF.preload('/models/computer.glb');

export default DemoComputer;
