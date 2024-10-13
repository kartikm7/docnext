import { Flower } from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Search from "./navbar/search";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 w-full z-50 flex justify-between py-4 px-8 text-md border-b-2 backdrop-blur-3xl">
      <Link href={"/"} className="flex items-center gap-1 font-semibold">
        <Flower />
        DocNext
      </Link>
      <div className="flex justify-center items-center gap-4">
        <div className="hidden md:flex justify-center items-center gap-4">
        <Link href={"/docs"}>
          <Button
            variant="link"
            className="p-0 opacity-75 hover:opacity-100 transition-all"
          >
            Documentation
          </Button>
        </Link>
        </div>
        <Search />
        <div className="flex justify-center items-center">
          <Link href={'https://github.com/kartikm7/docnext'}>
          <Button size="icon" variant={"ghost"}>
            <FaGithub className="text-2xl" />
          </Button>
          </Link>
          <Link className="hidden md:block" href={`${process.env.NEXT_PUBLIC_DISCORD}`}>
          <Button size="icon" variant={"ghost"}>
            <FaDiscord className="text-2xl" />
          </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
