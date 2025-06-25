import React from "react";
import { cn } from "@/lib/utils";

type ViewportSize = "desktop" | "tablet" | "mobile";

interface DemoViewportFrameProps {
  viewportSize: ViewportSize;
  children: React.ReactNode;
  isDarkMode: boolean;
}

const DemoViewportFrame: React.FC<DemoViewportFrameProps> = ({ 
  viewportSize, 
  children, 
  isDarkMode 
}) => {
  const viewportLabels = {
    desktop: "Desktop",
    tablet: "Tablet", 
    mobile: "Mobile",
  };

  return (
    <div className={cn(
      "transition-all duration-500 ease-in-out",
      viewportSize === "mobile" ? "w-full max-w-sm" :
      viewportSize === "tablet" ? "w-full max-w-2xl" :
      "w-full max-w-6xl"
    )}>
      {/* Frame */}
      <div className="relative rounded-lg shadow-2xl overflow-hidden border bg-card">
        {/* Frame Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div className="flex items-center space-x-2">
            {/* Window Controls */}
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {viewportLabels[viewportSize]} Preview
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {viewportSize === "mobile" && "375px"}
            {viewportSize === "tablet" && "768px"}
            {viewportSize === "desktop" && "1200px"}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-background">
          {/* Add container query context */}
          <div style={{ containerType: 'inline-size', width: '100%' }}>
            <div className={isDarkMode ? 'dark' : ''}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Frame Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Current viewport:</span> {viewportLabels[viewportSize]} 
          {viewportSize === "mobile" && " (375px width)"}
          {viewportSize === "tablet" && " (768px width)"}
          {viewportSize === "desktop" && " (1200px width)"}
        </p>
      </div>
    </div>
  );
};

export default DemoViewportFrame; 