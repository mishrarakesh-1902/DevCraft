import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "PHP", "WordPress", "Marketing", "SEO"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "PHP",
    client: "RetailPro Inc.",
    description: "A complete e-commerce solution with inventory management, payment processing, and analytics dashboard.",
    results: ["300% increase in sales", "50% faster load times", "99.9% uptime"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Corporate Website",
    category: "WordPress",
    client: "TechVentures",
    description: "Modern corporate website with custom theme, blog, and lead generation forms.",
    results: ["200% more leads", "45% lower bounce rate", "Top 3 rankings"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    category: "PHP",
    client: "DataFlow Systems",
    description: "Complex SaaS application with real-time analytics, user management, and API integrations.",
    results: ["10,000+ active users", "5-star reviews", "Enterprise clients"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Social Media Campaign",
    category: "Marketing",
    client: "StyleHouse Fashion",
    description: "Multi-platform social media campaign with influencer partnerships and paid advertising.",
    results: ["500K reach", "25% engagement rate", "150% ROI"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "SEO Transformation",
    category: "SEO",
    client: "LegalAdvice Pro",
    description: "Complete SEO overhaul including technical optimization, content strategy, and link building.",
    results: ["#1 for 20 keywords", "400% organic traffic", "50+ quality backlinks"],
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Membership Site",
    category: "WordPress",
    client: "FitLife Academy",
    description: "Premium membership platform with video courses, community features, and subscription billing.",
    results: ["5,000 members", "$100K MRR", "95% retention"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Work</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mt-4 mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of successful projects and see how we've helped businesses achieve their goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="glass-card overflow-hidden hover-zoom">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-lg font-heading font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-3xl w-full glass-card overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur flex items-center justify-center hover:bg-background/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl font-heading font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-muted-foreground mb-2">Client: {selectedProject.client}</p>
                <p className="text-muted-foreground mb-6">{selectedProject.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Key Results</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.results.map((result) => (
                      <span
                        key={result}
                        className="px-3 py-1 rounded-full bg-secondary text-sm"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="hero" asChild>
                  <a href="/contact">
                    Start Similar Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
