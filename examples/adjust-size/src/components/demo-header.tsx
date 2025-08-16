import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Type } from "lucide-react";

interface DemoHeaderProps {
  onOpenAdjustmentCard: () => void;
}

const DemoHeader: React.FC<DemoHeaderProps> = ({ onOpenAdjustmentCard }) => {
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
              Interactive preview with typography controls
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Typography Adjustment Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenAdjustmentCard}
                  className="flex items-center space-x-2"
                >
                  <Type className="w-4 h-4" />
                  <span className="hidden sm:inline">Adjust Typography</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adjust font size and line length for optimal readability</p>
              </TooltipContent>
            </Tooltip>

            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader; 