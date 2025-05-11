import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/ui/top-bar";
import { SideBar } from "@/components/ui/side-bar";

export const Route = createRootRoute({
  component: RootComponent,
});

const links = [
  {
    to: "/",
    label: "Home",
  },
];

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-row">
      {/* Mobile Top Bar */}
      <TopBar links={links} />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SideBar links={links} />
      </div>

      {/* Main Content */}
      <main
        className={`
        transition-all duration-300 ease-in-out
        pt-16 md:pt-0
        w-full
      `}
      >
        <Outlet />
      </main>
    </div>
  );
}
