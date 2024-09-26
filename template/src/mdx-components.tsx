import React from 'react';
import type { MDXComponents } from "mdx/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import NextImage, { ImageProps } from "next/image";
import { CopyButton } from "./components/copy-button";
import { BiLink } from "react-icons/bi";
import { FaTerminal } from "react-icons/fa";
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-3">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="text-lg font-medium mb-2">{children}</h3>,
    p: ({ children }) => <p className="text-base mb-2">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
    li: ({ children }) => <li className="mb-2">{children}</li>,
    a: ({ href, children }) => (
      <a href={href} className="flex items-center gap-1 hover:underline">
        {children}
        <BiLink />
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 mb-4 opacity-75">
        {children}
      </blockquote>
    ),
    code: ({ className, children }) => {
      const language = className ? className.replace(/language-/, "") : "";
      return language ? (
        <div className="w-full overflow-hidden font-mono border-2 rounded-lg">
          <div className="flex justify-between items-center gap-5 border-b-2 px-2 py-1">
            <div className="flex items-center gap-2">
              <FaTerminal />
              <p>{language}</p>
            </div>
            <CopyButton text={children as string} />
          </div>
          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                fontSize: "0.875rem",
                background: 'transparent',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {children as string}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <code className="px-2 py-1 bg-secondary rounded-md text-sm">
          {children}
        </code>
      );
    },
    pre: ({ children }) => <pre className="mb-4">{children}</pre>,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {children}
      </td>
    ),
    hr: () => <hr className="border-t-2 my-8" />,
    img: (props) => (
      <div className="relative left-0 h-64 my-4">
        <NextImage
          {...(props as ImageProps)}
          layout="fill"
          objectFit="contain"
          className=""
        />
      </div>
    ),
    ...components,
  };
}
