import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerRegister from "./pages/SellerRegister";
import About from "./pages/About";
import Sellers from "./pages/Sellers";
import SellerStore from "./pages/SellerStore";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout component to conditionally show footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showFooter = location.pathname === "/";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard routes without Navbar/Footer */}
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      
      {/* Regular routes with Navbar, Footer only on home */}
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/seller/register" element={<Layout><SellerRegister /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/sellers" element={<Layout><Sellers /></Layout>} />
      <Route path="/seller/:id" element={<Layout><SellerStore /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/orders" element={<Layout><Orders /></Layout>} />
      <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
      <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />
      <Route path="/terms" element={<Layout><Terms /></Layout>} />
      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
