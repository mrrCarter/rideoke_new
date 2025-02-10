import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth-context";
import Home from "@/pages/home";
import Plan from "@/pages/plan";
import Booking from "@/pages/booking";
import Services from "@/pages/services";
import Fleet from "@/pages/fleet";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/plan" component={Plan} />
      <Route path="/booking" component={Booking} />
      <Route path="/services" component={Services} />
      <Route path="/fleet" component={Fleet} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
        <Analytics />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;