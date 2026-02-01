import { Html, useProgress } from "@react-three/drei";

const ModelLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center text-white bg-black/80 p-4 rounded-md shadow-lg">
        <p className="text-lg">Loading... {progress.toFixed(0)}%</p>
        <div className="w-40 h-2 bg-gray-600 rounded overflow-hidden mt-2">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
};

export default ModelLoader;
