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
import VisitorPackStep2 from "./pages/packs/VisitorPackStep2";
import StaticPackStep2 from "./pages/packs/StaticPackStep2";
import PistePackStep2 from "./pages/packs/PistePackStep2";
import NSXPackStep2 from "./pages/packs/NSXPackStep2";
import Checkout from "./pages/Checkout";

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
            <Route path="/pack/visiteur/step2" element={<VisitorPackStep2 />} />
            <Route path="/pack/statique/step2" element={<StaticPackStep2 />} />
            <Route path="/pack/piste/step2" element={<PistePackStep2 />} />
            <Route path="/pack/nsx/step2" element={<NSXPackStep2 />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
