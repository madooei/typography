import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Monitor, Tablet, Smartphone } from "lucide-react";

type ViewportSize = "desktop" | "tablet" | "mobile";

interface DemoHeaderProps {
  viewportSize: ViewportSize;
  onViewportChange: (size: ViewportSize) => void;
}

const DemoHeader: React.FC<DemoHeaderProps> = ({ viewportSize, onViewportChange }) => {
  const viewportLabels = {
    desktop: "Desktop",
    tablet: "Tablet", 
    mobile: "Mobile",
  };

  const viewportIcons = {
    desktop: <Monitor className="w-4 h-4" />,
    tablet: <Tablet className="w-4 h-4" />,
    mobile: <Smartphone className="w-4 h-4" />,
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">
                <span className="hidden min-[520px]:block">Typography Demo</span><span className="block min-[520px]:hidden">Demo</span>
            </h1>
            <div className="hidden lg:block w-px h-6 bg-border" />
            <p className="hidden lg:block text-sm text-muted-foreground">
              Interactive preview with responsive controls
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Viewport Size Controls */}
            <div className="flex rounded-lg bg-muted p-1">
              {(["desktop", "tablet", "mobile"] as ViewportSize[]).map((size) => (
                <Tooltip key={size}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewportSize === size ? "default" : "ghost"}
                      size="sm"
                      onClick={() => onViewportChange(size)}
                      className="flex items-center space-x-2"
                    >
                      {viewportIcons[size]}
                      <span className="hidden sm:inline">{viewportLabels[size]}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch to {viewportLabels[size]} viewport</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader; 