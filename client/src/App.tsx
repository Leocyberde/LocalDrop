import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MarketplaceProvider, useMarketplace } from "./contexts/MarketplaceContext";
import { Sidebar } from "./components/Sidebar";
import RoleSelector from "./pages/RoleSelector";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

function Router() {
  const { userRole } = useMarketplace();

  // Show sidebar only when a role is selected (not on home page)
  const showSidebar = userRole !== 'customer' || window.location.pathname !== '/';

  return (
    <div className="flex h-screen">
      {showSidebar && userRole && (
        <Sidebar />
      )}
      <Switch>
        <Route path={"/"} component={RoleSelector} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/seller"} component={SellerDashboard} />
        <Route path={"/customer"} component={CustomerDashboard} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <MarketplaceProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </MarketplaceProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
