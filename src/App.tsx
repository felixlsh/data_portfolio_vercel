import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import { MotionProvider } from "@/lib/motion";
import { ScrollProgress } from "./components/ScrollProgress.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { ScrollToTopButton } from "./components/ScrollToTopButton.tsx";
import { GlassReflection } from "./components/GlassReflection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlassReflection />
        <ScrollProgress />
        <ScrollToTop />
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </MotionProvider>
  </QueryClientProvider>
);

export default App;
