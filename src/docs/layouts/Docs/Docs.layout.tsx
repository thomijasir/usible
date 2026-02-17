import { createSignal, onMount, onCleanup } from "solid-js";
import type { DocsLayoutProps } from "./Docs.interface";
import { MobileNav, Sidebar } from "../../components";

export function DocsLayout(props: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [isMobile, setIsMobile] = createSignal(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  onMount(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    onCleanup(() => window.removeEventListener("resize", checkMobile));
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen());

  return (
    <div class="min-h-screen bg-white dark:bg-gray-900">
      <MobileNav onMenuClick={toggleSidebar} />

      <div class="flex">
        <Sidebar
          open={sidebarOpen()}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile()}
        />

        <main class="flex-1 lg:ml-64 pt-16 min-w-0">
          <div class="max-w-4xl mx-auto px-6 py-8">{props.children}</div>
        </main>
      </div>
    </div>
  );
}
