import Sidebar from "@/components/sidebar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block" />
      <div className="flex-1 !overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}