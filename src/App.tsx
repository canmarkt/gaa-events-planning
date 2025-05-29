
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";
import SeatingPlanner from "./pages/SeatingPlanner";
import GiftRegistry from "./pages/GiftRegistry";
import BudgetTracker from "./pages/BudgetTracker";
import VendorManagement from "./pages/VendorManagement";
import VirtualTryOn from "./pages/VirtualTryOn";
import Forum from "./pages/Forum";
import BookingManager from "./pages/BookingManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Role-based Route Component
const RoleBasedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Auth />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          {user?.userType === 'vendor' ? <Navigate to="/vendor-dashboard" replace /> : <Dashboard />}
        </ProtectedRoute>
      } />
      
      <Route path="/vendor-dashboard" element={
        <RoleBasedRoute allowedRoles={['vendor']}>
          <VendorDashboard />
        </RoleBasedRoute>
      } />
      
      <Route path="/booking" element={
        <ProtectedRoute>
          <BookingManager />
        </ProtectedRoute>
      } />
      
      <Route path="/seating" element={
        <ProtectedRoute>
          <SeatingPlanner />
        </ProtectedRoute>
      } />
      
      <Route path="/registry" element={
        <ProtectedRoute>
          <GiftRegistry />
        </ProtectedRoute>
      } />
      
      <Route path="/budget" element={
        <ProtectedRoute>
          <BudgetTracker />
        </ProtectedRoute>
      } />
      
      <Route path="/vendors" element={<VendorManagement />} />
      <Route path="/tryon" element={<VirtualTryOn />} />
      <Route path="/forum" element={<Forum />} />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
