import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

import { 
  Code2, Globe, TrendingUp, Wrench, Search, ArrowRight, Star,
  Check, MessageCircle, ChevronDown, Send
} from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const servicesData: Record<string, {
  icon: typeof Code2;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  reviews: { name: string; role: string; rating: number; content: string }[];
}> = {
  "php-development": {
    icon: Code2,
    title: "PHP Development",
    tagline: "Powerful, Scalable PHP Solutions",
    description: "Build robust web applications with our expert PHP development services. From custom CMS to complex enterprise systems, we deliver solutions that scale.",
    features: [
      "Custom PHP Application Development",
      "Laravel & Symfony Frameworks",
      "API Development & Integration",
      "Database Design & Optimization",
      "Legacy Code Modernization",
      "Security Hardening",
    ],
    benefits: [
      "Scalable architecture for growing businesses",
      "Clean, maintainable codebase",
      "Optimized performance and speed",
      "Secure by design approach",
    ],
    faqs: [
      { question: "What PHP frameworks do you use?", answer: "We primarily work with Laravel, Symfony, and CodeIgniter. We choose the best framework based on your project requirements." },
      { question: "Can you modernize legacy PHP code?", answer: "Absolutely! We specialize in refactoring and modernizing legacy PHP applications to current standards." },
      { question: "Do you provide ongoing support?", answer: "Yes, all our projects include support packages ranging from 1 to 12 months depending on the plan." },
    ],
    reviews: [
      { name: "David Wilson", role: "CTO, TechStart", rating: 5, content: "Exceptional PHP development. They delivered a complex system on time and within budget." },
      { name: "Sarah Lee", role: "Product Manager, DataCorp", rating: 5, content: "Their Laravel expertise is outstanding. The code quality exceeded our expectations." },
      { name: "Mike Johnson", role: "Founder, AppVentures", rating: 5, content: "Professional team, excellent communication, and top-notch PHP development." },
    ],
  },
  "wordpress-development": {
    icon: Globe,
    title: "WordPress Development",
    tagline: "Beautiful, Powerful WordPress Sites",
    description: "From stunning themes to powerful plugins, we create WordPress experiences that captivate your audience and drive conversions.",
    features: [
      "Custom Theme Development",
      "Plugin Development & Customization",
      "E-Commerce (WooCommerce)",
      "Multisite Setup & Management",
      "Performance Optimization",
      "Security Hardening",
    ],
    benefits: [
      "Easy content management",
      "SEO-friendly structure",
      "Mobile-responsive designs",
      "Scalable solutions",
    ],
    faqs: [
      { question: "Can you customize existing themes?", answer: "Yes, we can customize any WordPress theme to match your brand and requirements." },
      { question: "Do you develop custom plugins?", answer: "Absolutely! We create custom plugins tailored to your specific functionality needs." },
      { question: "Is WordPress secure?", answer: "With proper security measures that we implement, WordPress is very secure. We follow best practices for hardening." },
    ],
    reviews: [
      { name: "Emily Chen", role: "Marketing Director, StyleCo", rating: 5, content: "Our new WordPress site is stunning and so easy to manage. Highly recommend!" },
      { name: "James Brown", role: "Owner, LocalBiz", rating: 5, content: "They transformed our outdated site into a modern, fast WordPress website." },
      { name: "Lisa Park", role: "Founder, EcoShop", rating: 5, content: "The WooCommerce store they built has increased our sales by 200%!" },
    ],
  },
  "digital-marketing": {
    icon: TrendingUp,
    title: "Digital Marketing",
    tagline: "Data-Driven Marketing That Converts",
    description: "Amplify your brand's reach with strategic digital marketing. From social media to PPC, we create campaigns that deliver measurable results.",
    features: [
      "Social Media Marketing",
      "Content Marketing Strategy",
      "PPC & Paid Advertising",
      "Email Marketing Campaigns",
      "Influencer Partnerships",
      "Analytics & Reporting",
    ],
    benefits: [
      "Increased brand awareness",
      "Higher conversion rates",
      "Measurable ROI",
      "Targeted audience reach",
    ],
    faqs: [
      { question: "What platforms do you manage?", answer: "We manage all major platforms including Facebook, Instagram, LinkedIn, Twitter, TikTok, and YouTube." },
      { question: "How do you measure success?", answer: "We track KPIs like engagement, reach, conversions, and ROI. You'll receive detailed monthly reports." },
      { question: "Can you manage paid advertising?", answer: "Yes, we manage PPC campaigns across Google Ads, Facebook Ads, and other platforms." },
    ],
    reviews: [
      { name: "Tom Anderson", role: "CEO, GrowthCo", rating: 5, content: "Our social media presence has exploded since working with them. 500% engagement increase!" },
      { name: "Anna White", role: "Brand Manager, LuxuryBrand", rating: 5, content: "Strategic, creative, and results-driven. Best marketing team we've worked with." },
      { name: "Chris Davis", role: "Founder, StartupX", rating: 5, content: "They helped us go viral! Amazing understanding of digital marketing trends." },
    ],
  },
  "website-maintenance": {
    icon: Wrench,
    title: "Website Maintenance",
    tagline: "Keep Your Site Running Smoothly",
    description: "Ensure your website stays secure, fast, and up-to-date with our comprehensive maintenance services. Focus on your business while we handle the tech.",
    features: [
      "Security Updates & Patches",
      "Regular Backups",
      "Performance Monitoring",
      "Uptime Monitoring",
      "Content Updates",
      "Bug Fixes & Support",
    ],
    benefits: [
      "Peace of mind security",
      "Optimal performance",
      "Reduced downtime",
      "Expert support on demand",
    ],
    faqs: [
      { question: "How often do you perform updates?", answer: "We perform security updates weekly and core updates as needed, always with testing first." },
      { question: "What if my site goes down?", answer: "Our premium plans include 24/7 monitoring with immediate response to any downtime." },
      { question: "Can you update content for me?", answer: "Yes, our Standard and Premium plans include content updates as part of the service." },
    ],
    reviews: [
      { name: "Robert Smith", role: "IT Director, CorpInc", rating: 5, content: "Finally, a maintenance team we can rely on. Zero downtime in 12 months!" },
      { name: "Jennifer Lee", role: "Owner, BoutiqueStore", rating: 5, content: "They handle everything so I can focus on my business. Worth every penny." },
      { name: "Mark Thompson", role: "Manager, AgencyPro", rating: 5, content: "Fast response times and proactive maintenance. Couldn't ask for more." },
    ],
  },
  "seo": {
    icon: Search,
    title: "SEO Services",
    tagline: "Dominate Search Rankings",
    description: "Climb to the top of search results with our proven SEO strategies. We combine technical expertise with creative content to boost your organic visibility.",
    features: [
      "Technical SEO Audit",
      "On-Page Optimization",
      "Content Strategy",
      "Link Building",
      "Local SEO",
      "Monthly Reporting",
    ],
    benefits: [
      "Increased organic traffic",
      "Higher search rankings",
      "Better user experience",
      "Long-term ROI",
    ],
    faqs: [
      { question: "How long until I see results?", answer: "SEO is a long-term strategy. Most clients see significant improvements within 3-6 months." },
      { question: "Do you guarantee #1 rankings?", answer: "We don't guarantee specific rankings as search algorithms change, but we guarantee our proven process and effort." },
      { question: "What's included in technical SEO?", answer: "Site speed optimization, mobile-friendliness, structured data, crawlability, and more." },
    ],
    reviews: [
      { name: "Alex Turner", role: "Marketing Lead, SaaSCo", rating: 5, content: "From page 5 to page 1 for our main keywords in 4 months. Incredible results!" },
      { name: "Patricia Moore", role: "Owner, LocalService", rating: 5, content: "Our local SEO is now bringing in 3x more calls than before. Thank you!" },
      { name: "Kevin Brown", role: "Director, MediaAgency", rating: 5, content: "The most thorough SEO team we've ever worked with. Highly data-driven." },
    ],
  },
};

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);  
  const service = servicesData[slug || ""];

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    message: "",
  });

  if (!service) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold mb-4">Service Not Found</h1>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your review! It will be published after moderation.");
    setReviewForm({ name: "", email: "", rating: 5, title: "", message: "" });
  };

  const averageRating = (service.reviews.reduce((acc, r) => acc + r.rating, 0) / service.reviews.length).toFixed(1);
  const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(`Hi, I'm interested in your ${service.title} services.`)}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5 mb-6">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <service.icon className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-primary font-medium mb-4">{service.tagline}</p>
            <p className="text-lg text-muted-foreground mb-8">{service.description}</p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="font-bold">{averageRating}</span>
              <span className="text-muted-foreground">({service.reviews.length} reviews)</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to={`/pricing#${slug}`}>
                  View Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold mb-6">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold mb-6">Key Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={benefit} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">Client Reviews</h2>
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="font-bold text-xl ml-2">{averageRating}/5</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {service.reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.content}"</p>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto glass-card p-8"
          >
            <h3 className="text-xl font-heading font-bold mb-6 text-center">Leave a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={reviewForm.email}
                  onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          rating <= reviewForm.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <Input
                placeholder="Review Title"
                value={reviewForm.title}
                onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                required
                className="bg-background/50"
              />
              <Textarea
                placeholder="Your Review"
                value={reviewForm.message}
                onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                required
                rows={4}
                className="bg-background/50"
              />
              <Button type="submit" variant="hero" className="w-full">
                <Send className="w-4 h-4" />
                Submit Review
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="glass-card px-6">
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Contact us today for a free consultation and custom quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Request Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
