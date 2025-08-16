import React, { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import DemoHeader from "./demo-header";
import TypographyAdjustmentCard from "./typography-adjustment-card";
import ScrollToTop from "./scroll-to-top";

interface DemoFrameProps {
  children: React.ReactNode;
}

const DemoFrame: React.FC<DemoFrameProps> = ({ children }) => {
  const [isAdjustmentCardOpen, setIsAdjustmentCardOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sticky Header */}
      <DemoHeader 
        onOpenAdjustmentCard={() => setIsAdjustmentCardOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              {/* Add container query context */}
              <div style={{ containerType: 'inline-size', width: '100%' }}>
                <div className={isDarkMode ? 'dark' : ''}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Typography Adjustment Card */}
      <TypographyAdjustmentCard 
        isOpen={isAdjustmentCardOpen}
        onClose={() => setIsAdjustmentCardOpen(false)}
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default DemoFrame; 