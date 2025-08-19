import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Hijaiyah from "./pages/Hijaiyah";
import Dhikr from "./pages/Dhikr";
import Quran from "./pages/Quran";
import QuranSurah from "./pages/QuranSurah";
import Quiz from "./pages/Quiz";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMessages from "./pages/admin/Messages";
import HijaiyahAdmin from "./pages/admin/HijaiyahAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/hijaiyah" element={<Hijaiyah />} />
            <Route path="/dhikr" element={<Dhikr />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/quran/surah/:id" element={<QuranSurah />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:categoryId" element={<Quiz />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="hijaiyah" element={<HijaiyahAdmin />} />
              {/* More admin routes will be added here */}
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
