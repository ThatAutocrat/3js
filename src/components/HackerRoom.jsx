import { useGLTF } from '@react-three/drei';

export function HackerRoom(props) {
  const { scene } = useGLTF('/models/hacker-room.glb');

  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/hacker-room.glb');
