"use client";
import { usePathname } from "next/navigation";
import { motion, MotionConfig, useReducedMotion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import clsx from "clsx";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const Header = ({ invert = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <Container>
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link href={"/"} aria-label="Home" className="flex items-center h-full">
          <Logo invert={invert} className="text-xl sm:text-2xl">XUONGART</Logo>
        </Link>
        <div className="flex items-center gap-x-8 h-full">
          <nav className="hidden md:flex items-center gap-x-6 h-full">
            <Link 
              href="/portfolio" 
              className={clsx(
                "text-sm font-medium transition flex items-center h-full px-2",
                invert ? "text-white hover:text-neutral-200" : "text-neutral-950 hover:text-neutral-700"
              )}
            >
              Dự án
            </Link>
            <Link 
              href="/portfolio/images" 
              className={clsx(
                "text-sm font-medium transition flex items-center h-full px-2",
                invert ? "text-white hover:text-neutral-200" : "text-neutral-950 hover:text-neutral-700"
              )}
            >
              Dự án hình ảnh
            </Link>
            <Link 
              href="/about" 
              className={clsx(
                "text-sm font-medium transition flex items-center h-full px-2",
                invert ? "text-white hover:text-neutral-200" : "text-neutral-950 hover:text-neutral-700"
              )}
            >
              Về chúng tôi
            </Link>
            <Link 
              href="/process" 
              className={clsx(
                "text-sm font-medium transition flex items-center h-full px-2",
                invert ? "text-white hover:text-neutral-200" : "text-neutral-950 hover:text-neutral-700"
              )}
            >
              Quy trình
            </Link>
          </nav>
          <div className="flex items-center h-full gap-x-4">
            <div className="hidden md:block">
              <Button href={"/contact"} invert={invert} className="text-xs sm:text-sm px-3 sm:px-4 py-1.5">
                Liên Hệ Ngay
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={clsx(
                "md:hidden p-2 rounded-md transition-colors",
                invert ? "text-white hover:bg-white/10" : "text-neutral-950 hover:bg-neutral-100"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="mobile-menu-container fixed right-0 top-0 h-full w-[280px] bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link href={"/"} onClick={() => setMobileMenuOpen(false)}>
                    <Logo className="text-2xl">XUONGART</Logo>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-md"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <nav className="flex flex-col gap-4 flex-1">
                  <Link 
                    href="/portfolio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-neutral-950 hover:text-blue-600 py-2 border-b border-neutral-100"
                  >
                    Dự án
                  </Link>
                  <Link 
                    href="/portfolio/images"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-neutral-950 hover:text-blue-600 py-2 border-b border-neutral-100"
                  >
                    Dự án hình ảnh
                  </Link>
                  <Link 
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-neutral-950 hover:text-blue-600 py-2 border-b border-neutral-100"
                  >
                    Về chúng tôi
                  </Link>
                  <Link 
                    href="/process"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-neutral-950 hover:text-blue-600 py-2 border-b border-neutral-100"
                  >
                    Quy trình
                  </Link>
                </nav>
                
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <Button href={"/contact"} className="w-full text-center">
                    Liên Hệ Ngay
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

const RootLayoutInner = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        {/* Noise overlay */}
        <div className="noise-overlay" />
        <div className="absolute left-0 right-0 top-0 z-50">
          {/* Header */}
          <Header />
        </div>
      </header>
      <motion.div
        layout
        className="relative flex flex-auto overflow-hidden bg-white pt-20"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-0"
        >
          <main className="w-full flex-auto">{children}</main>
          {/* Footer */}
          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

const RootLayout = ({ children }) => {
  const pathName = usePathname();
  return <RootLayoutInner key={pathName}>{children}</RootLayoutInner>;
};

export default RootLayout;
