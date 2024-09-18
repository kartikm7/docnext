import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

export const FooterLayout = ({
  className,
  children,
  ...props
}: ComponentProps<"footer">) => {
  return (
    <footer className={twMerge("w-screen", className)} {...props}>
      {children}
    </footer>
  );
};

export const Footer = () => {
  return (
    <FooterLayout className="flex flex-col w-full ">
      <div className="flex border-t p-5 justify-between items-center px-10">
        <div className="text-xs">
          <h1 className="font-semibold md:text-xl opacity-75 hover:opacity-100 transition-all cursor-pointer">
            docnext.in
          </h1>
          <h1>
            brought you by <br className="block md:hidden"/>
            <Link href={"https://twitter.com/codewithkt"} target="_parent">
              <span className="font-semibold underline">Kartikeya Mishra.</span>
            </Link>
          </h1>
        </div>
        <div className="flex flex-col justify-end items-end gap-1">
          <div className="flex gap-2 text-2xl">
            <Link href={"https://github.com/kartikm7/docnext"}>
              <FaGithub className="opacity-50 hover:opacity-100 hover:scale-95 transition-all" />
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_DISCORD}`} target="_blank">
              <FaDiscord className="opacity-50 hover:opacity-100 hover:scale-95 transition-all" />
            </Link>
          </div>
          <Link href={"https://github.com/kartikm7/docnext"} target="_blank">
            <span className="text-xs flex justify-center items-center opacity-50 hover:opacity-100 hover:scale-95 transition-all">Want to fix something here? <HiOutlineExternalLink className="ml-1" /></span>
          </Link>
        </div>
      </div>
    </FooterLayout>
  );
};
