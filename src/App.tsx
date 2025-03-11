import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TrackPack from "./pages/packs/TrackPack";
import NSXClubPack from "./pages/packs/NSXClubPack";
import StaticPack from "./pages/packs/StaticPack";
import VisitorPack from "./pages/packs/VisitorPack";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pack/piste" element={<TrackPack />} />
            <Route path="/pack/nsx-club" element={<NSXClubPack />} />
            <Route path="/pack/statique" element={<StaticPack />} />
            <Route path="/pack/visiteur" element={<VisitorPack />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
