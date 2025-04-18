
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { useShallow } from "zustand/react/shallow";
import { useConfiguratorStore } from "./store/configuratorStore.js";


function JerseyModel({ colorZones }) {
  const { scene, materials } = useGLTF("/awc_dummy_model.glb");

  Object.keys(colorZones).forEach((zone) => {
    if (materials[zone]) {
      materials[zone].color.set(colorZones[zone]);
    }
  });

  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

function ColorPanel() {
  const [activeZone, setActiveZone] = useState("sleeves");
  const [colors, setColorZone] = useConfiguratorStore(
    useShallow((state) => [state.colors, state.setColorZone])
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Farbauswahl</h2>
      <select
        className="w-full mb-4 p-2 rounded"
        value={activeZone}
        onChange={(e) => setActiveZone(e.target.value)}
      >
        {Object.keys(colors).map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
      <HexColorPicker
        color={colors[activeZone]}
        onChange={(color) => setColorZone(activeZone, color)}
      />
    </div>
  );
}

export default function App() {
  const colors = useConfiguratorStore((state) => state.colors);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <aside className="col-span-1">
        <ColorPanel />
      </aside>
      <main className="col-span-3 h-[80vh] bg-gray-100 rounded-xl">
        <Canvas camera={{ position: [0, 1.5, 3.5] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <JerseyModel colorZones={colors} />
          <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>
      </main>
    </div>
  );
}
