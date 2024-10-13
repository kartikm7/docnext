"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";

export default function TableOfContents({className, ...props}:ComponentProps<'div'>) {
  const [toc, setToc] = useState<Element[]>();
  const [active, setActive] = useState("")
  const pathName = usePathname();
  const map = new Map();
  map.set("H1", "");
  map.set("H2", "border-l-2 pl-4");
  map.set("H3", " pl-6");
  useEffect(() => {
    let headings = Array.from(document.querySelectorAll("h1,h2,h3"));
    headings = headings.filter((val) => val.id);
    setToc(headings);
    const observer = new IntersectionObserver(
      (entries)=>{
        entries.forEach(entry => {
          if(entry.isIntersecting){
            setActive(entry.target.id)
          }
        })
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 1,
      }
    )
    headings.forEach(val => observer.observe(val))
    return () => observer.disconnect();
  }, [pathName]);
  return (
    <div className={cn(className,"flex flex-col h-screen overflow-y-auto min-w-64 max-w-64 p-8")} {...props}>
      <h1 className="text-sm font-medium">On this page</h1>        
      {toc?.map((val, index) => {
        return (
          <a className={map.get(val.tagName) + " text-sm py-2" + (active == val.id ? " opacity-100 font-medium" : " opacity-50")} key={index} href={`#${val.id}`}>
            {val.textContent}
          </a>
        );
      })}
    </div>
  );
}
