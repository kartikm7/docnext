import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen overflow-hidden">
      <Spotlight />
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="pb-20 text-2xl md:text-6xl text-center">
      <h1 className="">Simple and Effective</h1>
      <h1 className=""><span className="font-semibold">Documentation</span> Template</h1>
      </div>
    </div>
  );
}
