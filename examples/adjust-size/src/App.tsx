import { useEffect } from "react";
import { applyThemeScriptString } from "./stores/theme-store";
import TypographyPage from "./pages/typography-page";
import DemoFrame from "./components/demo-frame";

function App() {
  useEffect(() => {
    // Inject theme script for FOUC prevention
    const themeScript = document.getElementById("theme-script");
    if (themeScript) {
      themeScript.innerHTML = applyThemeScriptString;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <DemoFrame>
        <TypographyPage />
      </DemoFrame>
    </div>
  );
}

export default App;
