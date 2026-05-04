import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

// Eager (hot path)
import Home from "./pages/Home";

// Lazy
const AchievementDetail = lazy(() => import("./pages/AchievementDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const UserUnlock = lazy(() => import("./pages/UserUnlock"));
const StoryThread = lazy(() => import("./pages/StoryThread"));
const Crear = lazy(() => import("./pages/Crear"));
const Admin = lazy(() => import("./pages/Admin"));
const Descubrir = lazy(() => import("./pages/Descubrir"));
const Legal = lazy(() => import("./pages/Legal"));
const Login = lazy(() => import("./pages/Login"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-muted text-sm uppercase tracking-widest animate-pulse">
        Cargando...
      </p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Sonner position="top-center" theme="dark" richColors />
        <BrowserRouter>
          <ScrollToTop />
          <AnalyticsTracker />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/l/:slug" element={<AchievementDetail />} />
                <Route path="/h/:id" element={<StoryThread />} />
                <Route path="/u/:username" element={<Profile />} />
                <Route path="/u/:username/:slug" element={<UserUnlock />} />
                <Route
                  path="/descubrir"
                  element={
                    <ProtectedRoute>
                      <Descubrir />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/crear"
                  element={
                    <ProtectedRoute>
                      <Crear />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
