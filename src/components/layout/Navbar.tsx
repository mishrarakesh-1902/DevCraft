import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Code2, TrendingUp, Smartphone, Server, Globe, Zap, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const services = [
  { 
    name: "Website Development", 
    href: "/services/website-development", 
    icon: Code2,
    submenu: [
      { name: "WordPress", href: "/services/wordpress", icon: Globe },
      { name: "PHP/Laravel", href: "/services/php-laravel", icon: Code2 },
      { name: "MERN", href: "/services/mern", icon: Zap },
      { name: "Shopify", href: "/services/shopify", icon: ShoppingCart },
      { name: "E-Commerce", href: "/services/ecommerce", icon: ShoppingCart },
    ]
  },
  { 
    name: "Digital Marketing", 
    href: "/contact?service=digital-marketing", 
    icon: TrendingUp,
    submenu: [
      { name: "SEO", href: "/services/seo", icon: TrendingUp },
      { name: "SMO", href: "/services/smo", icon: Globe },
      { name: "SMM", href: "/services/smm", icon: TrendingUp },
      { name: "PPC", href: "/services/ppc", icon: Zap },
      { name: "Google Ads", href: "/services/google-ads", icon: TrendingUp },
    ]
  },
  { name: "Mobile App Development", href: "/services/mobile-application-development", icon: Smartphone },
  { name: "CRM Development", href: "/services/crm-development", icon: Server },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-10 h-10" />
            <span className="font-heading font-bold text-xl hidden sm:block">PinakiTechLive</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith("/services")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 glass-card p-2"
                  >
                    {services.map((service) => (
                      <div key={service.name}>
                        {service.submenu ? (
                          // Service with submenu
                          <div className="group relative">
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors">
                              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <service.icon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium flex-1 text-left">{service.name}</span>
                              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                            </button>
                            
                            {/* Invisible bridge to submenu */}
                            <div className="absolute left-full top-0 w-2 h-full hidden group-hover:block" />
                            
                            {/* Submenu - opens on right */}
                            <div className="absolute left-full top-0 ml-0 w-56 glass-card p-2 rounded-lg hidden group-hover:block z-50">
                              {service.submenu.map((sub) => (
                                <Link
                                  key={sub.href}
                                  to={sub.href}
                                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors group/sub text-sm"
                                >
                                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center group-hover/sub:bg-primary/20 transition-colors">
                                    <sub.icon className="w-3 h-3 text-primary" />
                                  </div>
                                  <span className="font-medium">{sub.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          // Regular service link
                          <Link
                            to={service.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <service.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{service.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg font-medium ${
                  isActive("/") ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Services */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Services</div>
                {services.map((service) => (
                  <div key={service.name}>
                    {service.submenu ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => setSubmenuOpen(submenuOpen === service.name ? null : service.name)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-sm"
                        >
                          <service.icon className="w-4 h-4 text-primary" />
                          <span>{service.name}</span>
                          <ChevronDown className={`w-3 h-3 ml-auto transition-transform ${submenuOpen === service.name ? "rotate-180" : ""}`} />
                        </button>
                        
                        {submenuOpen === service.name && (
                          <div className="pl-4 space-y-1">
                            {service.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                to={sub.href}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setSubmenuOpen(null);
                                }}
                              >
                                <sub.icon className="w-3 h-3 text-primary" />
                                <span>{sub.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={service.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        <service.icon className="w-4 h-4 text-primary" />
                        <span>{service.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-lg font-medium ${
                    isActive(link.href) ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
