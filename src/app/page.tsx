import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full">
      <Spotlight />
      <div className="pb-20 text-center">
      <h1 className="text-6xl">Simple and Effective</h1>
      <h1 className="text-6xl"><span className="font-semibold">Documentation</span> Template</h1>
      </div>
    </div>
  );
}
