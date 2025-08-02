import { Suspense, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignInPage from "./components/SignInPage";
import WelcomePage from "./components/WelcomePage.tsx";
import routes from "tempo-routes";

function App() {
  const [currentView, setCurrentView] = useState<"welcome" | "signin" | "home">(
    "welcome",
  );
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  const handleGetStarted = () => {
    setCurrentView("signin");
  };

  const handleSignIn = (userData: { name: string; email: string }) => {
    setUser(userData);
    setCurrentView("home");
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentView("welcome");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "welcome":
        return <WelcomePage onGetStarted={handleGetStarted} />;
      case "signin":
        return <SignInPage onSignIn={handleSignIn} />;
      case "home":
        return <Home user={user} onSignOut={handleSignOut} />;
      default:
        return <WelcomePage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={renderCurrentView()} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
