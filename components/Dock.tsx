'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DockItem = ({
  href,
  icon: Icon,
  label,
  isActive,
  external = false,
}: {
  href: string;
  icon?: React.ComponentType<{ size: number; className: string }>;
  label: string;
  isActive: boolean;
  external?: boolean;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const content = (
    <motion.button
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-250 ease"
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`absolute inset-0 rounded-full transition-all duration-250 ${
          showTooltip ? 'shadow-glow-soft' : ''
        }`}
      />
      {Icon && (
        <Icon
          size={20}
          className={`relative z-10 transition-colors duration-250 ${
            showTooltip || isActive
              ? 'text-text-primary'
              : 'text-text-muted'
          }`}
        />
      )}

      {isActive && (
        <motion.div
          className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-accent"
          layoutId="dockIndicator"
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        />
      )}

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: -32 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 200 }}
            className="absolute bottom-full mb-2 px-2 py-1 bg-surface rounded-small border border-border text-micro font-mono text-text-primary whitespace-nowrap pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
};

export default function Dock() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  // Simplified mobile menu: Home, Work, Contact, Menu
  const mobileItems = [
    { href: '/', label: 'home', icon: null },
    { href: '/work', label: 'work', icon: null },
    { href: '/contact', label: 'contact', icon: null },
  ];

  const desktopItems = [
    { href: '/', label: 'home', icon: null },
    { href: '/work', label: 'work', icon: null },
    { href: '/writing', label: 'writing', icon: null },
    { href: '/about', label: 'about', icon: null },
    { href: '/contact', label: 'contact', icon: null },
    { href: 'mailto:hello@example.com', label: 'email', icon: Mail, external: true },
    { href: 'https://github.com', label: 'github', icon: Github, external: true },
  ];

  const itemsToShow = isMobile ? mobileItems : desktopItems;

  return (
    <>
      {/* Desktop Dock */}
      <motion.div
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 gap-2 px-3 py-3 bg-surface/80 backdrop-blur-16 border border-border rounded-pill"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 400, ease: 'easeOut' }}
      >
        {itemsToShow.map((item) => (
          <DockItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.href)}
            external={item.external}
          />
        ))}
      </motion.div>

      {/* Mobile Dock */}
      <motion.div
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 gap-2 px-3 py-3 bg-surface/80 backdrop-blur-16 border border-border rounded-pill flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 400, ease: 'easeOut' }}
      >
        {mobileItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.button
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-250 text-micro font-mono text-text-muted hover:text-text-primary"
              onClick={() => setMobileMenuOpen(false)}
              whileTap={{ scale: 0.98 }}
            >
              {item.label[0].toUpperCase()}
              {isActive(item.href) && (
                <motion.div
                  className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-accent"
                  layoutId="mobileIndicator"
                />
              )}
            </motion.button>
          </Link>
        ))}

        {/* Mobile menu button */}
        <motion.button
          className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-250 text-micro font-mono text-text-muted hover:text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.98 }}
        >
          ≡
        </motion.button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {desktopItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-micro font-mono text-text-primary hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-left wordmark */}
      <motion.div
        className="fixed top-4 left-4 z-40 md:top-6 md:left-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 200 }}
      >
        <Link
          href="/"
          className="text-small font-mono text-text-muted hover:text-text-primary transition-colors"
          title="Return to home"
        >
          EB
        </Link>
      </motion.div>
    </>
  );
}
