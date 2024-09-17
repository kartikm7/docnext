"use client";
import { ComponentProps, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { BiCommand } from "react-icons/bi";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SearchIcon } from "lucide-react";

export default function Search({ className, ...props }: ComponentProps<"div">) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      {open && <Dialog defaultOpen onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <Input className="" placeholder={`Search documentation`} />
          </DialogHeader>
        </DialogContent>
      </Dialog>}
      <div className={cn(className, "relative")} {...props}>
        <div className="absolute flex items-center gap-1 bg-secondary w-fit p-1 px-2 rounded-md text-xs top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
          <BiCommand />
          <p>K</p>
        </div>
        <Input className="pr-8" placeholder="Search documentation" />
      </div>
    </>
  );
}
