import React, { useState } from "react";

type ViewportSize = "desktop" | "tablet" | "mobile";

interface DemoFrameProps {
  children: React.ReactNode;
}

const DemoFrame: React.FC<DemoFrameProps> = ({ children }) => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const viewportLabels = {
    desktop: "Desktop",
    tablet: "Tablet", 
    mobile: "Mobile",
  };

  const viewportIcons = {
    desktop: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tablet: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    mobile: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-neutral-900 text-neutral-100' 
        : 'bg-neutral-50 text-neutral-900'
    }`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-neutral-800 border-neutral-700' 
          : 'bg-white border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                <span className="hidden min-[520px]:block">Typography Demo</span><span className="block min-[520px]:hidden">Demo</span>
              </h1>
              <div className="hidden lg:block w-px h-6 bg-neutral-300 dark:bg-neutral-600" />
              <p className={`text-sm hidden lg:block ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Interactive preview with responsive controls
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Viewport Size Controls */}
              <div className={`flex rounded-lg p-1 ${
                isDarkMode 
                  ? 'bg-neutral-700' 
                  : 'bg-neutral-100'
              }`}>
                {(["desktop", "tablet", "mobile"] as ViewportSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setViewportSize(size)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewportSize === size
                        ? isDarkMode
                          ? 'bg-neutral-600 text-white shadow-sm'
                          : 'bg-white text-neutral-900 shadow-sm'
                        : isDarkMode
                        ? 'text-neutral-300 hover:text-white hover:bg-neutral-600'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                    }`}
                  >
                    {viewportIcons[size]}
                    <span className="hidden sm:inline">{viewportLabels[size]}</span>
                  </button>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-neutral-700 hover:bg-neutral-600 text-yellow-400'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                }`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Container */}
          <div className="flex justify-center">
            <div className={`transition-all duration-500 ease-in-out ${
              viewportSize === "mobile" ? "w-full max-w-sm" :
              viewportSize === "tablet" ? "w-full max-w-2xl" :
              "w-full max-w-6xl"
            }`}>
              {/* Frame */}
              <div className={`relative rounded-lg shadow-2xl overflow-hidden border-2 transition-all duration-300 ${
                isDarkMode 
                  ? 'border-neutral-600 bg-neutral-800' 
                  : 'border-neutral-300 bg-white'
              }`}>
                {/* Frame Header */}
                <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-neutral-700 border-neutral-600' 
                    : 'bg-neutral-100 border-neutral-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {/* Window Controls */}
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className={`text-xs font-medium ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      {viewportLabels[viewportSize]} Preview
                    </span>
                  </div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {viewportSize === "mobile" && "375px"}
                    {viewportSize === "tablet" && "768px"}
                    {viewportSize === "desktop" && "1200px"}
                  </div>
                </div>

                {/* Content Area */}
                <div className={`transition-colors duration-300 ${
                  isDarkMode ? 'bg-neutral-900' : 'bg-white'
                }`}>
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
                <p className={`text-sm ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  <span className="font-medium">Current viewport:</span> {viewportLabels[viewportSize]} 
                  {viewportSize === "mobile" && " (375px width)"}
                  {viewportSize === "tablet" && " (768px width)"}
                  {viewportSize === "desktop" && " (1200px width)"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoFrame; 