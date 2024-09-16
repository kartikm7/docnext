import { Flower } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex justify-between py-4 px-8 text-md border-b-2 bg-opacity-50 backdrop-blur-3xl">
      <div className="flex items-center gap-1 font-semibold">
        <Flower />
        DocNext
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button variant='link' className="p-0 opacity-75 hover:opacity-100 transition-all">Documentation</Button>
        <div className="flex justify-center items-center">
        <Button size="icon" variant={'ghost'}><FaGithub className="text-2xl" /></Button>
        <ModeToggle />
        </div>
      </div>
    </div>
  );
}
