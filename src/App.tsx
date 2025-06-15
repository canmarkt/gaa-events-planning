
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
import AdminDashboard from "./pages/AdminDashboard";
import AdminSetup from "./pages/AdminSetup";
import PendingApproval from "./pages/PendingApproval";
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
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Role-based Route Component
const RoleBasedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { profile, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Loading profile...</p>
      </div>
    </div>;
  }
  
  console.log('RoleBasedRoute - User role:', profile.role, 'Allowed roles:', allowedRoles);
  
  if (!allowedRoles.includes(profile.role)) {
    // Redirect to appropriate dashboard based on role
    console.log('Redirecting user with role:', profile.role);
    if (profile.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (profile.role === 'vendor') {
      return <Navigate to={profile.is_approved ? "/vendor-dashboard" : "/pending-approval"} replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

// Approval Required Route Component
const ApprovalRequiredRoute = ({ children }: { children: React.ReactNode }) => {
  const { profile, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (profile?.role === 'vendor' && !profile.is_approved) {
    return <Navigate to="/pending-approval" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, profile, isLoading } = useAuth();

  console.log('AppRoutes - isAuthenticated:', isAuthenticated, 'profile:', profile, 'isLoading:', isLoading);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={
        isAuthenticated ? (
          // Redirect authenticated users to their appropriate dashboard
          profile?.role === 'admin' ? <Navigate to="/admin" replace /> :
          profile?.role === 'vendor' && !profile.is_approved ? <Navigate to="/pending-approval" replace /> :
          profile?.role === 'vendor' && profile.is_approved ? <Navigate to="/vendor-dashboard" replace /> :
          profile?.role === 'couple' ? <Navigate to="/dashboard" replace /> :
          <Navigate to="/dashboard" replace />
        ) : <Auth />
      } />
      <Route path="/admin-setup" element={<AdminSetup />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleBasedRoute>
        </ProtectedRoute>
      } />
      
      {/* Couple Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={['couple']}>
            <Dashboard />
          </RoleBasedRoute>
        </ProtectedRoute>
      } />
      
      {/* Vendor Routes */}
      <Route path="/vendor-dashboard" element={
        <ProtectedRoute>
          <ApprovalRequiredRoute>
            <RoleBasedRoute allowedRoles={['vendor']}>
              <VendorDashboard />
            </RoleBasedRoute>
          </ApprovalRequiredRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/pending-approval" element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={['vendor']}>
            <PendingApproval />
          </RoleBasedRoute>
        </ProtectedRoute>
      } />
      
      {/* Other protected routes */}
      <Route path="/booking" element={
        <ProtectedRoute>
          <ApprovalRequiredRoute>
            <BookingManager />
          </ApprovalRequiredRoute>
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
