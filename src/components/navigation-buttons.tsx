import React from 'react';
import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Navigation extends ComponentProps<'div'> {
  previous?: string;
  next?: string;
}

export default function Navigation({  
  previous,
  next,
  className,
  ...props
}: Navigation ) {
  return (
    <div className={cn(className,"w-full flex justify-between items-center my-5")} {...props}>
      {previous ? <Link className="self-start opacity-75 hover:underline hover:opacity-100 transition-all" href={previous}>Previous</Link> : <div></div>}
      {next ? <Link className="self-end opacity-75 hover:underline hover:opacity-100 transition-all" href={next}>Next</Link> : <div></div>}
    </div>
  );
}
