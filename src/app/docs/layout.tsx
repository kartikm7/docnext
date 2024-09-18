import Sidebar from "@/components/sidebar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block" />
      <div className="w-full !overflow-y-auto">
        <div className="p-8 pb-20 md:px-40">{children}</div>
      </div>
    </div>
  );
}
