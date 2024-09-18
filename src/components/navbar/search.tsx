"use client";
import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { BiCommand, BiSearch } from "react-icons/bi";
import { routes, RouteType } from "../sidebar";
import {
  CommandDialog,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useRouter } from "next/navigation";

interface recursiveCommandItemProps extends ComponentProps<"div"> {
  route: RouteType;
  setOpen?: (pre:boolean) => void;
}

function CustomCommandItem({ route, setOpen }: recursiveCommandItemProps) {
  const router = useRouter();
  return route.children ? (
    <>
      <CommandItem
        key={route.path}
        onSelect={() => { 
          router.push(route.path);
          setOpen && setOpen(false)
        }}
      >
        {route.name}
      </CommandItem>
      <div className="border-l-2 ml-4 pl-2">
        {route.children.map((childNode) => (
          <CustomCommandItem route={childNode} key={childNode.path} setOpen={setOpen} />
        ))}
      </div>
    </>
  ) : (
    <CommandItem
      key={route.path}
      onSelect={() => {
        router.push(route.path);
        setOpen && setOpen(false)
      }}
    >
      {route.name}
    </CommandItem>
  );
}

function flattenRoutes(arr: RouteType[]): RouteType[] {
  const flat = arr.reduce((acc: RouteType[], route) => {
    acc.push(route);
    if (route.children) acc.push(...flattenRoutes(route.children));
    return acc;
  }, []);
  return flat;
}

export default function Search({ ...props }: ComponentProps<"div">) {
  const [open, setOpen] = useState(false);
  const [autoComplete, setAutoComplete] = useState<RouteType[]>(routes);
  const [input, setInput] = useState<string>("");
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.value;
    setInput(currentValue);
    setAutoComplete(
      flattenRoutes(routes).filter((val) =>
        val.name.toLowerCase().includes(currentValue.toLowerCase())
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

  return (
    <>
      {open && (
        <CommandDialog
          defaultOpen
          onOpenChange={() => {
            setOpen((pre) => !pre);
            setAutoComplete(routes);
          }}
        >
          <Input
            className=""
            onChange={handleChange}
            placeholder={`Search documentation`}
          />
          <CommandList className="p-2">
            <CommandEmpty>No results found.</CommandEmpty>
            {input.trim().length > 0
              ? autoComplete.map((val, index) => (
                  <CustomCommandItem key={index} route={val} setOpen={setOpen} />
                ))
              : routes.map((val, index) => (
                  <CustomCommandItem key={index} route={val} setOpen={setOpen} />
                ))}
          </CommandList>  
        </CommandDialog>
      )}
      <div
        className="flex items-center gap-2 border-2 rounded-md opacity-75 hover:opacity-100 p-1 cursor-pointer select-none"
        onClick={() => setOpen((pre) => !pre)}
        {...props}
      >
        <p className="text-sm hidden md:block">Search documentation</p>
        <p className="text-sm md:hidden">Search</p>
        <div className="flex items-center gap-1 bg-secondary w-fit p-1 px-2 rounded-md text-xs ">
          <BiCommand className="hidden md:block" />
          <BiSearch className="md:hidden" />
          <p className="hidden md:block">K</p>
        </div>
      </div>
    </>
  );
}
