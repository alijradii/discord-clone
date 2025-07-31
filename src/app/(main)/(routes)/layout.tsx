import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 overflow-hidden">
        <NavigationSidebar />
      </div>

      <main className="md:pl-[72px] h-full w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
