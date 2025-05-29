
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SeatingPlanner from "./pages/SeatingPlanner";
import GiftRegistry from "./pages/GiftRegistry";
import BudgetTracker from "./pages/BudgetTracker";
import VendorManagement from "./pages/VendorManagement";
import VirtualTryOn from "./pages/VirtualTryOn";
import Forum from "./pages/Forum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/seating" element={<SeatingPlanner />} />
          <Route path="/registry" element={<GiftRegistry />} />
          <Route path="/budget" element={<BudgetTracker />} />
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/tryon" element={<VirtualTryOn />} />
          <Route path="/forum" element={<Forum />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
