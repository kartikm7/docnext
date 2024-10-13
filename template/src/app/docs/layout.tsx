import Sidebar from "@/components/sidebar";
import TableOfContents from "@/components/table-of-contents";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between">
      <Sidebar className="hidden md:block sticky top-16 overflow-y-auto" />
      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-8 md:px-40">
          {children}
        </div>
      </div>
      <TableOfContents className="sticky top-16 overflow-y-auto" />
    </div>
  );
}