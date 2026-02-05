import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Star, Code2, Globe, TrendingUp, Wrench, Search, ShoppingCart, Smartphone } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const services = [
  // Website Development Services
  {
    icon: Code2,
    title: "WordPress Development",
    slug: "wordpress",
    packages: [
      { name: "Starter", price: 799, features: ["Basic WordPress setup", "Simple theme customization", "5 pages", "Contact form", "1 month support"] },
      { name: "Business", price: 1999, features: ["Custom theme design", "WooCommerce setup", "Premium plugins", "SEO optimization", "3 months support"], popular: true },
      { name: "Premium", price: 3999, features: ["Full custom development", "Multisite setup", "Advanced security", "Performance optimization", "6 months support"] },
    ],
  },
  {
    icon: Code2,
    title: "PHP/Laravel Development",
    slug: "php-laravel",
    packages: [
      { name: "Starter", price: 1299, features: ["Basic Laravel application", "Simple database", "API endpoints", "Deployment setup", "1 month support"] },
      { name: "Professional", price: 2999, features: ["Custom Laravel application", "Complex database design", "Advanced APIs", "Third-party integrations", "3 months support"], popular: true },
      { name: "Enterprise", price: 5999, features: ["Large-scale application", "Microservices architecture", "Real-time features", "Advanced security", "6 months support"] },
    ],
  },
  {
    icon: Zap,
    title: "MERN Development",
    slug: "mern",
    packages: [
      { name: "Starter", price: 1499, features: ["Basic React app", "Node.js backend", "MongoDB database", "REST API", "Deployment included"] },
      { name: "Professional", price: 3499, features: ["Complex React application", "Advanced backend", "Real-time features", "Authentication & security", "3 months support"], popular: true },
      { name: "Enterprise", price: 6999, features: ["Large-scale MERN stack", "Microservices architecture", "Advanced real-time features", "Performance optimization", "6 months support"] },
    ],
  },
  {
    icon: ShoppingCart,
    title: "Shopify Development",
    slug: "shopify",
    packages: [
      { name: "Basic", price: 999, features: ["Store setup", "Theme customization", "Product setup (up to 100)", "Payment integration", "1 month support"] },
      { name: "Professional", price: 2499, features: ["Custom theme development", "App development", "Advanced customization", "Conversion optimization", "3 months support"], popular: true },
      { name: "Enterprise", price: 4999, features: ["Full custom development", "Multiple integrations", "Advanced features", "24/7 support", "Dedicated manager"] },
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    slug: "ecommerce",
    packages: [
      { name: "Starter", price: 1299, features: ["Basic e-commerce setup", "Product catalog", "Shopping cart", "Payment processing", "Basic analytics"] },
      { name: "Professional", price: 2999, features: ["Custom e-commerce platform", "Inventory management", "Multiple payment methods", "Email marketing integration", "3 months support"], popular: true },
      { name: "Enterprise", price: 5999, features: ["Advanced e-commerce solution", "Subscription management", "Multi-vendor support", "Advanced analytics", "6 months support"] },
    ],
  },

  // Digital Marketing Services
  {
    icon: TrendingUp,
    title: "SEO Services",
    slug: "seo",
    packages: [
      { name: "3 Month", features: ["Complete SEO audit", "On-page optimization", "25 keywords targeted", "Content strategy", "Link building campaign", "Monthly reports"] },
      { name: "6 Month", features: ["Complete SEO audit", "On-page optimization", "40 keywords targeted", "Content creation", "Link building campaign", "Technical SEO", "Bi-weekly reports"], popular: true },
      { name: "12 Month", features: ["Complete SEO strategy", "Technical SEO", "50+ keywords", "Ongoing content creation", "Advanced link building", "Competitor analysis", "Weekly optimization & reporting"] },
    ],
    hidePrice: true,
  },
  {
    icon: Globe,
    title: "SMO (Social Media Optimization)",
    slug: "smo",
    packages: [
      { name: "3 Month", features: ["Multi-platform optimization", "Profile optimization", "Content calendar setup", "Hashtag strategy", "Monthly analysis"] },
      { name: "6 Month", features: ["Complete social optimization", "All platforms", "Advanced analytics", "Competitor analysis", "Growth strategy", "Bi-weekly reports"], popular: true },
      { name: "12 Month", features: ["Complete social optimization", "All platforms", "Advanced analytics", "Competitor analysis", "Growth strategy", "Daily monitoring", "Dedicated account manager"] },
    ],
    hidePrice: true,
  },
  {
    icon: TrendingUp,
    title: "SMM (Social Media Marketing)",
    slug: "smm",
    packages: [
      { name: "3 Month", features: ["Post creation (12/week)", "Multi-platform management", "Community engagement", "Basic analytics", "Monthly reports"] },
      { name: "6 Month", features: ["Daily content creation", "Multi-platform management", "Influencer partnerships", "Paid ads (₹300/mo budget)", "Weekly analytics", "Detailed reporting"], popular: true },
      { name: "12 Month", features: ["Daily content creation", "All platform management", "Influencer collaborations", "Paid ads (₹500/mo budget)", "Daily optimization", "Real-time analytics & reporting"] },
    ],
    hidePrice: true,
  },
  {
    icon: Zap,
    title: "PPC (Pay-Per-Click)",
    slug: "ppc",
    packages: [
      { name: "3 Month", features: ["Campaign setup & management", "Keyword research", "Ad copywriting", "A/B testing", "Weekly optimization", "Monthly reports"] },
      { name: "6 Month", features: ["Multi-campaign management", "A/B testing", "Landing page optimization", "₹1000/mo ad spend budget", "Weekly optimization", "Detailed analytics"], popular: true },
      { name: "12 Month", features: ["Full-service PPC management", "Advanced analytics", "Conversion optimization", "₹2500/mo ad spend budget", "Daily optimization", "Dedicated PPC specialist"] },
    ],
    hidePrice: true,
  },
  {
    icon: TrendingUp,
    title: "Google Ads Management",
    slug: "google-ads",
    packages: [
      { name: "3 Month", features: ["Search ads setup", "Keyword research", "Ad creation", "Campaign optimization", "Monthly reports"] },
      { name: "6 Month", features: ["Search + Display campaigns", "Shopping ads", "YouTube ads", "Remarketing campaigns", "Weekly optimization", "Detailed analytics"], popular: true },
      { name: "12 Month", features: ["Full Google Ads suite", "Multi-campaign management", "Advanced remarketing", "Performance max campaigns", "Daily management", "Dedicated account manager"] },
    ],
    hidePrice: true,
  },

  // Other Services
  {
    icon: Smartphone,
    title: "Mobile App Development",
    slug: "mobile-application-development",
    packages: [
      { name: "MVP", price: 3999, features: ["Basic app functionality", "Single platform (iOS or Android)", "Simple UI/UX", "App store submission", "1 month support"] },
      { name: "Full App", price: 7999, features: ["Complete functionality", "iOS & Android", "Professional UI/UX design", "Backend integration", "3 months support"], popular: true },
      { name: "Enterprise", price: 12999, features: ["Advanced features", "Both platforms optimized", "Advanced animations", "Real-time features", "6 months support"] },
    ],
  },
  {
    icon: Wrench,
    title: "CRM Development",
    slug: "crm-development",
    packages: [
      { name: "Starter", price: 2499, features: ["Basic CRM setup", "Contact management", "Simple workflows", "Basic reporting", "1 month support"] },
      { name: "Professional", price: 4999, features: ["Custom CRM development", "Advanced workflows", "Multiple integrations", "Custom dashboards", "3 months support"], popular: true },
      { name: "Enterprise", price: 9999, features: ["Full-scale CRM system", "Unlimited customization", "Advanced automation", "Custom integrations", "6 months support"] },
    ],
  },
];

export default function Pricing() {
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Transparent Pricing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6">
              Pricing <span className="gradient-text">Plans</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the perfect package for your needs. All plans include our quality guarantee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Sections */}
      {services.map((service, serviceIndex) => (
        <section
          key={service.slug}
          className={`py-24 ${serviceIndex % 2 === 0 ? "" : "bg-card/50"}`}
          id={service.slug}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-12"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold">{service.title}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative glass-card p-8 hover-zoom ${
                    pkg.popular ? "border-primary/50 ring-2 ring-primary/20" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                        <Star className="w-3 h-3 fill-current" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-heading font-semibold mb-2">{pkg.name}</h3>
                    {service.hidePrice ? (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-lg font-medium text-muted-foreground">Contact for pricing</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-heading font-bold">₹{pkg.price}</span>
                        <span className="text-muted-foreground">{pkg.period || ""}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.popular ? "hero" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link to="/contact">
                      {service.hidePrice ? "Request Price" : "Get Started"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8">
              Every business is unique. Let's discuss a tailored package that fits your specific requirements and budget.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Request Custom Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
