"use client";
import { ComponentProps, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { BiCommand } from "react-icons/bi";
import { routes, RouteType } from "../sidebar";
import {
  CommandDialog,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useRouter } from "next/navigation";

export default function Search({ className, ...props }: ComponentProps<"div">) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [autoComplete, setAutoComplete] = useState<RouteType[]>(routes);
  const router = useRouter();
  function handleChange(e) {
    const currentValue = e.target.value;
    setValue(currentValue);
    setAutoComplete(
      routes.filter(
        (val) =>
          val.name.includes(currentValue) ||
          val.name.toLowerCase().includes(currentValue) ||
          val.name.toUpperCase().includes(currentValue)
      )
    );
  }

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

  useEffect(() => {}, [value]);

  return (
    <>
      {open && (
        <CommandDialog defaultOpen onOpenChange={setOpen}>
          <Input
            className=""
            onChange={handleChange}
            placeholder={`Search documentation`}
          />
          <CommandList className="p-2">
            <CommandEmpty>No results found.</CommandEmpty>
            {autoComplete.map((val, index) => (
              <CommandItem
                onSelect={() => {
                  router.push(val.path);
                  setOpen(pre => !pre)
                  setAutoComplete(routes)
                }}
                className="opacity-75 hover:opacity-100"
                key={index}
              >
                {val.name}
              </CommandItem>
            ))}
          </CommandList>
        </CommandDialog>
      )}
      <div
        className="flex items-center gap-2 border-2 rounded-md opacity-75 hover:opacity-100 p-1 cursor-pointer select-none"
        onClick={() => setOpen((pre) => !pre)}
        {...props}
      >
        <p className="text-sm">Search documentation</p>
        <div className="flex items-center gap-1 bg-secondary w-fit p-1 px-2 rounded-md text-xs ">
          <BiCommand />
          <p>K</p>
        </div>
      </div>
    </>
  );
}
