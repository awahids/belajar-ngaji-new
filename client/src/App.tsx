import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./hooks/useSimpleAdmin";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Hijaiyah from "./pages/Hijaiyah";
import Dhikr from "./pages/Dhikr";
import Quran from "./pages/Quran";
import QuranSurah from "./pages/QuranSurah";
import Quiz from "./pages/Quiz";
import AdminDashboard from "./pages/admin/Dashboard";
import HijaiyahAdmin from "./pages/admin/HijaiyahAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
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
            
            {/* Admin Routes - Simplified without auth */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/hijaiyah" element={<HijaiyahAdmin />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
