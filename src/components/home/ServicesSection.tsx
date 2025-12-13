import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Globe, TrendingUp, Wrench, Search, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "PHP Development",
    description: "Custom PHP solutions built with modern frameworks. Scalable, secure, and high-performance applications tailored to your needs.",
    href: "/services/php-development",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Globe,
    title: "WordPress Development",
    description: "Beautiful, fast WordPress sites with custom themes and plugins. From blogs to enterprise solutions.",
    href: "/services/wordpress-development",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that grow your audience and convert leads into loyal customers.",
    href: "/services/digital-marketing",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    description: "Keep your site secure, updated, and performing at its best with our comprehensive maintenance plans.",
    href: "/services/website-maintenance",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Dominate search rankings with proven SEO strategies. Technical optimization, content, and link building.",
    href: "/services/seo",
    color: "from-pink-500 to-rose-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
            Solutions That <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive digital services designed to elevate your business and maximize your online potential.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group ${index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}`}
            >
              <Link
                to={service.href}
                className="block h-full glass-card p-8 hover-zoom group-hover:border-primary/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
