import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const RideokeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    {/* Main R shape */}
    <path
      d="M7 4C7 4 12 4 14 4C16.2091 4 18 5.79086 18 8C18 10.2091 16.2091 12 14 12H7V4Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M7 12H14L18 20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* Musical note elements */}
    <circle cx="14" cy="8" r="2" fill="currentColor" />
    <path
      d="M14 10V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Sound wave elements */}
    <path
      d="M11 6C11 6 12 7 12 8C12 9 11 10 11 10"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M9 7C9 7 10 8 10 9C10 10 9 11 9 11"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        : 'bg-background'
    } border-b border-border/40`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <RideokeIcon />
              Rideoke
            </Link>
            <div className="hidden md:flex gap-6">
              <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="/fleet" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Fleet
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/plan">
              <Button variant="outline" size="sm">
                Start Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}