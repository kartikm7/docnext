import React from 'react';
import { File, Folder, Tree } from "@/components/magicui/file-tree";

export function FileTreeDemo() {
  return (
    <div className="relative flex h-[300px] w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Tree
        className="p-2 overflow-hidden rounded-md bg-background"
        initialSelectedId="18"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18"
        ]}
        elements={ELEMENTS}
      >
        <Folder element="src" value="1">
          <Folder value="2" element="app">
            <Folder value="3" element="docs">
              <File value="4">
                <p>layout.tsx</p>
              </File>
              <File value="5">
                <p>page.mdx</p>
              </File>
              <Folder className='text-yellow-300' value="17" element="practice">
                <File value="18" className='text-yellow-300'><p>page.mdx</p></File>
              </Folder>
              <Folder value="6" element="first-change">
                <File value="7">
                  <p>page.mdx</p>
                </File>
              </Folder>
              <Folder value="8" element="quick-setup">
                <File value="9">
                  <p>page.mdx</p>
                </File>
              </Folder>
            </Folder>
            <File value="10">
              <p>layout.tsx</p>
            </File>
            <File value="11">
              <p>page.tsx</p>
            </File>
          </Folder>
          <Folder value="12" element="components">
            <File value="13">
              <p>header.tsx</p>
            </File>
            <File value="14">
              <p>footer.tsx</p>
            </File>
          </Folder>
          <Folder value="15" element="lib">
            <File value="16">
              <p>utils.ts</p>
            </File>
          </Folder>
        </Folder>
      </Tree>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "3",
    isSelectable: true,
    name: "docs",
    children: [
      {
        id: "4",
        isSelectable: true,
        name: "layout.tsx",
      },
      {
        id: "5",
        isSelectable: true,
        name: "page.mdx",
      },
      {
        id: "6",
        isSelectable: true,
        name: "first-change",
        children: [
          {
            id: "7",
            isSelectable: true,
            name: "page.mdx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "quick-setup",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "page.mdx",
          },
        ],
      },
    ],
  },
];