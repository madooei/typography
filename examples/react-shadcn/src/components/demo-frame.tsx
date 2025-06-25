import React, { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import DemoHeader from "./demo-header";
import DemoViewportFrame from "./demo-viewport-frame";
import ScrollToTop from "./scroll-to-top";

type ViewportSize = "desktop" | "tablet" | "mobile";

interface DemoFrameProps {
  children: React.ReactNode;
}

const DemoFrame: React.FC<DemoFrameProps> = ({ children }) => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sticky Header */}
      <DemoHeader 
        viewportSize={viewportSize}
        onViewportChange={setViewportSize}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Container */}
          <div className="flex justify-center">
            <DemoViewportFrame 
              viewportSize={viewportSize}
              isDarkMode={isDarkMode}
            >
              {children}
            </DemoViewportFrame>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default DemoFrame; 