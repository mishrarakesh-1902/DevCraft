import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Star, Code2, Globe, TrendingUp, Wrench, Search } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const services = [
  {
    icon: Code2,
    title: "PHP Development",
    slug: "php-development",
    packages: [
      { name: "Starter", price: 999, features: ["Basic PHP website", "Up to 5 pages", "Contact form", "1 month support"] },
      { name: "Professional", price: 2499, features: ["Custom PHP application", "Database integration", "API development", "3 months support"], popular: true },
      { name: "Enterprise", price: 4999, features: ["Complex web application", "Custom CMS", "Third-party integrations", "6 months support"] },
    ],
  },
  {
    icon: Globe,
    title: "WordPress Development",
    slug: "wordpress-development",
    packages: [
      { name: "Basic", price: 799, features: ["Theme customization", "5 pages", "Contact form", "SEO basics"] },
      { name: "Business", price: 1999, features: ["Custom theme", "E-commerce ready", "Premium plugins", "3 months support"], popular: true },
      { name: "Premium", price: 3999, features: ["Custom development", "Multisite setup", "Advanced security", "6 months support"] },
    ],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    slug: "digital-marketing",
    packages: [
      { name: "Starter", price: 499, features: ["Social media setup", "Basic content plan", "Monthly reports", "1 platform"], period: "/mo" },
      { name: "Growth", price: 999, features: ["Multi-platform strategy", "Content creation", "Paid ads management", "Weekly reports"], popular: true, period: "/mo" },
      { name: "Scale", price: 1999, features: ["Full-service marketing", "Video content", "Influencer outreach", "Daily optimization"], period: "/mo" },
    ],
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    slug: "website-maintenance",
    packages: [
      { name: "Essential", price: 99, features: ["Security updates", "Weekly backups", "Uptime monitoring", "Email support"], period: "/mo" },
      { name: "Standard", price: 199, features: ["All Essential features", "Performance optimization", "Content updates", "Priority support"], popular: true, period: "/mo" },
      { name: "Premium", price: 399, features: ["All Standard features", "24/7 monitoring", "Emergency fixes", "Dedicated manager"], period: "/mo" },
    ],
  },
  {
    icon: Search,
    title: "SEO Services",
    slug: "seo",
    packages: [
      { name: "Local", price: 399, features: ["Local SEO audit", "Google Business optimization", "5 keywords", "Monthly reports"], period: "/mo" },
      { name: "National", price: 799, features: ["Full SEO audit", "On-page optimization", "15 keywords", "Link building"], popular: true, period: "/mo" },
      { name: "Enterprise", price: 1499, features: ["Complete SEO strategy", "Technical SEO", "50+ keywords", "Content strategy"], period: "/mo" },
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
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-heading font-bold">${pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period || ""}</span>
                    </div>
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
                      Get Started
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
