import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RotateCcw } from "lucide-react";

interface TypographyAdjustmentCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const TypographyAdjustmentCard: React.FC<TypographyAdjustmentCardProps> = ({
  isOpen,
  onClose,
}) => {
  const [fontSize, setFontSize] = useState([100]); // 100% = default, using array for slider
  const [lineLength, setLineLength] = useState([65]); // 65ch = default, using array for slider

  // Apply typography adjustments to CSS variables
  useEffect(() => {
    const typographyElements = document.querySelectorAll('.typography');
    typographyElements.forEach((element) => {
      const typographyEl = element as HTMLElement;
      // Adjust font size (80% to 120% of default 1rem)
      const baseFontSize = fontSize[0] / 100; // Convert percentage to decimal
      typographyEl.style.setProperty('--typography-font-size-base', `${baseFontSize}rem`);
      // Adjust max-width for line length (50ch to 80ch)
      typographyEl.style.maxWidth = `clamp(20rem, ${lineLength[0]}ch, 100%)`;
    });
  }, [fontSize, lineLength]);

  const resetToDefaults = () => {
    setFontSize([100]);
    setLineLength([65]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Typography Settings</DialogTitle>
          <DialogDescription>
            Adjust font size and line length for optimal readability
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Font Size Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size-slider" className="text-sm font-medium">
                Font Size
              </Label>
              <span className="text-sm text-muted-foreground">{fontSize[0]}%</span>
            </div>
            <Slider
              id="font-size-slider"
              min={80}
              max={120}
              step={1}
              value={fontSize}
              onValueChange={setFontSize}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>80%</span>
              <span>120%</span>
            </div>
          </div>

          {/* Line Length Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="line-length-slider" className="text-sm font-medium">
                Line Length
              </Label>
              <span className="text-sm text-muted-foreground">{lineLength[0]} characters</span>
            </div>
            <Slider
              id="line-length-slider"
              min={50}
              max={80}
              step={1}
              value={lineLength}
              onValueChange={setLineLength}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50 chars</span>
              <span>80 chars</span>
            </div>
          </div>

          {/* Info Text */}
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              These settings help optimize readability. Research suggests 50-80 characters per line 
              and font sizes between 80-120% are ideal for most readers.
            </p>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="w-full flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TypographyAdjustmentCard;