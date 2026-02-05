import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

import { 
  Code2, Globe, TrendingUp, Wrench, Search, ArrowRight, Star, Smartphone, Server,
  Check, MessageCircle, ChevronDown, Send, Zap, ShoppingCart
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
  "website-development": {
    icon: Code2,
    title: "Website Development",
    tagline: "Full-Stack Web Development",
    description: "We build fast, secure, and beautiful websites—from dynamic web apps to high-converting CMS and e-commerce platforms.",
    features: [
      "Custom Web Applications",
      "CMS (WordPress) & E-Commerce",
      "API Development & Integrations",
      "Performance Optimization",
      "Security & Maintenance",
      "Responsive & Accessible Design",
    ],
    benefits: [
      "Scalable, maintainable codebase",
      "Optimized for speed and SEO",
      "Tailored UX for your users",
      "Full development lifecycle support",
    ],
    faqs: [
      { question: "Do you handle migrations?", answer: "Yes — we can migrate websites and data with zero downtime when planned appropriately." },
      { question: "Which platforms do you build for?", answer: "We build custom web apps, WordPress sites, and headless CMS solutions depending on needs." },
      { question: "Do you provide hosting recommendations?", answer: "Yes, we can recommend and configure hosting suited to your traffic and budget." },
    ],
    reviews: [
      { name: "Olivia Martin", role: "Founder, BrightCo", rating: 5, content: "Their full-stack team delivered a beautiful and fast website that doubled our conversion rate." },
      { name: "David Wilson", role: "CTO, TechStart", rating: 5, content: "Great architecture and solid execution. Highly recommended for complex web apps." },
    ],
  },
  "wordpress": {
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
  "php-laravel": {
    icon: Code2,
    title: "PHP/Laravel Development",
    tagline: "Robust Backend Solutions",
    description: "Build powerful and scalable web applications using modern PHP frameworks like Laravel, with clean code and best practices.",
    features: [
      "Laravel Framework Expertise",
      "RESTful API Development",
      "Database Design & Optimization",
      "Custom Business Logic",
      "Scalable Architecture",
      "Security Hardening",
    ],
    benefits: [
      "Fast development with Laravel conventions",
      "Clean, maintainable codebase",
      "Excellent for rapid prototyping",
      "Great testing capabilities",
    ],
    faqs: [
      { question: "Why choose Laravel?", answer: "Laravel offers elegant syntax, excellent documentation, and a rich ecosystem of packages that accelerates development." },
      { question: "Do you handle API development?", answer: "Yes, we specialize in building RESTful and GraphQL APIs with Laravel for seamless integrations." },
      { question: "Can you migrate legacy PHP code?", answer: "Absolutely! We modernize legacy PHP applications to Laravel standards with zero downtime migrations." },
    ],
    reviews: [
      { name: "Alex Kumar", role: "CTO, CloudTech", rating: 5, content: "Their Laravel expertise delivered our complex system perfectly. Clean code and great documentation." },
      { name: "Rachel Thompson", role: "Founder, DataSync", rating: 5, content: "Fast development, excellent API design, and wonderful support throughout the project." },
    ],
  },
  "mern": {
    icon: Zap,
    title: "MERN Development",
    tagline: "Full-Stack JavaScript Solutions",
    description: "Modern full-stack applications using MongoDB, Express, React, and Node.js. Build fast, scalable, and interactive web experiences.",
    features: [
      "React Component Architecture",
      "Node.js Backend Services",
      "MongoDB Database Design",
      "Real-Time Features",
      "Progressive Web Apps",
      "Cloud Deployment",
    ],
    benefits: [
      "JavaScript across the entire stack",
      "Faster development cycles",
      "Real-time user interactions",
      "Scalable NoSQL databases",
    ],
    faqs: [
      { question: "Why MERN stack?", answer: "MERN allows full-stack JavaScript development, reduces context switching, and offers excellent scalability for modern applications." },
      { question: "Can you build real-time features?", answer: "Yes! We implement WebSockets, Socket.io, and other technologies for real-time functionality." },
      { question: "Do you deploy to the cloud?", answer: "Absolutely! We deploy MERN applications to AWS, Azure, Heroku, and other cloud platforms." },
    ],
    reviews: [
      { name: "Jordan Blake", role: "Product Manager, StreamApp", rating: 5, content: "Fantastic MERN development team. They built our real-time collaboration tool flawlessly." },
      { name: "Priya Sharma", role: "Founder, TechNova", rating: 5, content: "Impressive React components and smooth backend integration. Delivered ahead of schedule!" },
    ],
  },
  "shopify": {
    icon: ShoppingCart,
    title: "Shopify Development",
    tagline: "E-Commerce Excellence",
    description: "Custom Shopify stores optimized for conversions, featuring stunning designs, seamless checkout, and powerful integrations.",
    features: [
      "Shopify Store Setup & Migration",
      "Custom Theme Development",
      "Shopify App Development",
      "Payment & Shipping Integration",
      "Conversion Rate Optimization",
      "SEO Optimization",
    ],
    benefits: [
      "PCI Compliant payment processing",
      "Built-in inventory management",
      "Extensive app ecosystem",
      "Powerful analytics & reporting",
    ],
    faqs: [
      { question: "Can you migrate from another platform?", answer: "Yes! We handle seamless migrations from WooCommerce, Magento, BigCommerce, and other platforms with zero data loss." },
      { question: "Do you build custom Shopify apps?", answer: "Absolutely! We develop custom Shopify apps for unique functionality using Shopify's API." },
      { question: "How do you optimize for conversions?", answer: "We implement A/B testing, optimize checkout flow, improve page load speed, and create compelling product experiences." },
    ],
    reviews: [
      { name: "Monica Chen", role: "E-Commerce Manager, FashionHub", rating: 5, content: "Their Shopify store increased our conversions by 45%. Excellent design and functionality!" },
      { name: "Robert Walsh", role: "Owner, NaturalGoods", rating: 5, content: "Professional migration from WooCommerce and amazing custom features. Highly recommend!" },
    ],
  },
  "ecommerce": {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    tagline: "Custom Online Stores",
    description: "Bespoke e-commerce solutions tailored to your business model, built with the latest technologies and optimized for growth.",
    features: [
      "Shopping Cart System Design",
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Fulfillment Automation",
      "Analytics & Reporting",
      "Subscription Management",
    ],
    benefits: [
      "Fully customizable experience",
      "Advanced inventory control",
      "Multiple payment methods",
      "Scalable architecture",
    ],
    faqs: [
      { question: "Which platforms do you use?", answer: "We can build on any platform: custom solutions, WooCommerce, Shopify, Magento, or BigCommerce depending on your needs." },
      { question: "Do you handle payment processing?", answer: "Yes, we integrate with Stripe, PayPal, Square, and other payment gateways securely." },
      { question: "Can you set up subscription models?", answer: "Absolutely! We implement recurring billing, subscription management, and flexible pricing models." },
    ],
    reviews: [
      { name: "Sarah Johnson", role: "Founder, DigitalGoods", rating: 5, content: "Custom e-commerce platform that perfectly fits our subscription model. Excellent work!" },
      { name: "Michael Park", role: "Director, RetailCorp", rating: 5, content: "Integrated complex inventory system with their e-commerce platform. Outstanding execution!" },
    ],
  },
  "mobile-application-development": {
    icon: Smartphone,
    title: "Mobile Application Development",
    tagline: "Native & Cross-Platform Mobile Apps",
    description: "Build performant and user-friendly mobile apps for iOS and Android. We focus on product-market fit, UX, and maintainability.",
    features: [
      "React Native & Native iOS/Android",
      "Cross-platform code sharing",
      "App Store & Play Store submission",
      "Offline & Syncing Support",
      "Push Notifications & Analytics",
    ],
    benefits: [
      "Faster time to market",
      "Consistent UX across platforms",
      "Robust and maintainable codebase",
    ],
    faqs: [
      { question: "Which frameworks do you use?", answer: "We use React Native for cross-platform and native Swift/Kotlin when needed for performance-critical apps." },
      { question: "Do you handle store submissions?", answer: "Yes, we manage the entire app submission and review process." },
    ],
    reviews: [
      { name: "Hannah Lee", role: "Product Manager", rating: 5, content: "Our app launch was flawless thanks to their experienced mobile team." },
    ],
  },
  "crm-development": {
    icon: Server,
    title: "CRM Development",
    tagline: "Custom CRM & Automation",
    description: "Custom CRM systems tailored to your sales and service workflows, with integrations to your existing tools.",
    features: [
      "Custom Entities & Workflows",
      "Third-party Integrations",
      "Reporting & Dashboards",
      "Automation & Notifications",
      "Security & Access Controls",
    ],
    benefits: [
      "Streamlined sales & service processes",
      "Improved data visibility",
      "Automation that saves time",
    ],
    faqs: [
      { question: "Can you integrate with existing tools?", answer: "Yes, we integrate with CRMs, email providers, payment gateways, and more via APIs." },
      { question: "Do you offer training?", answer: "Yes, we provide admin and user training as part of the delivery." },
    ],
    reviews: [
      { name: "Samuel Park", role: "Head of Sales", rating: 5, content: "The custom CRM they built reduced our manual work by 70%." },
    ],
  },
  "seo": {
    icon: TrendingUp,
    title: "SEO (Search Engine Optimization)",
    tagline: "Rank Higher, Get More Traffic",
    description: "Strategic SEO services to boost your online visibility and drive qualified organic traffic to your website.",
    features: [
      "Keyword Research & Analysis",
      "On-Page SEO Optimization",
      "Technical SEO Audits",
      "Link Building Strategy",
      "Content Optimization",
      "Monthly Reporting & Analytics",
    ],
    benefits: [
      "Increased organic traffic",
      "Higher search engine rankings",
      "Cost-effective long-term growth",
      "Improved user experience",
    ],
    faqs: [
      { question: "How long does SEO take?", answer: "SEO is a long-term strategy. You can typically see noticeable improvements in 3-6 months, with stronger results over 6-12 months." },
      { question: "Which search engines do you optimize for?", answer: "We primarily optimize for Google, but our strategies benefit all major search engines including Bing and Yahoo." },
      { question: "Do you guarantee rankings?", answer: "No legitimate SEO agency can guarantee specific rankings. We focus on best practices that improve your chances." },
    ],
    reviews: [
      { name: "Amanda Foster", role: "Marketing Manager, TechBiz", rating: 5, content: "Our organic traffic tripled in 6 months. Outstanding SEO work!" },
      { name: "David Chen", role: "Owner, LocalServices", rating: 5, content: "Professional SEO strategy that actually works. Highly recommend!" },
    ],
  },
  "smo": {
    icon: Globe,
    title: "SMO (Social Media Optimization)",
    tagline: "Optimize Your Social Presence",
    description: "Enhance your social media profiles and strategy to increase engagement, reach, and brand awareness.",
    features: [
      "Profile Optimization",
      "Content Strategy Development",
      "Hashtag Research & Strategy",
      "Bio & Description Optimization",
      "Platform-Specific Optimization",
      "Community Guidelines Compliance",
    ],
    benefits: [
      "Improved profile visibility",
      "Higher engagement rates",
      "Better audience targeting",
      "Consistent brand messaging",
    ],
    faqs: [
      { question: "Which platforms do you optimize for?", answer: "We optimize for all major platforms: Facebook, Instagram, LinkedIn, Twitter, TikTok, and YouTube." },
      { question: "Does SMO increase followers?", answer: "SMO improves visibility and engagement, which naturally attracts followers through better optimization and discoverability." },
      { question: "How is SMO different from SMM?", answer: "SMO focuses on optimizing profiles and content strategy, while SMM includes paid promotion and community management." },
    ],
    reviews: [
      { name: "Sarah Williams", role: "Brand Manager, FashionCo", rating: 5, content: "Our social profiles look professional now and engagement increased significantly!" },
      { name: "Marcus Johnson", role: "CEO, StartupHub", rating: 5, content: "Great SMO strategy that aligned perfectly with our brand." },
    ],
  },
  "smm": {
    icon: TrendingUp,
    title: "SMM (Social Media Marketing)",
    tagline: "Grow Your Social Audience",
    description: "Data-driven social media marketing campaigns that build community, boost engagement, and drive conversions.",
    features: [
      "Content Calendar Management",
      "Post Creation & Scheduling",
      "Community Engagement",
      "Influencer Partnerships",
      "Paid Social Campaigns",
      "Analytics & Reporting",
    ],
    benefits: [
      "Increased brand awareness",
      "Higher engagement rates",
      "Community growth",
      "Improved customer loyalty",
    ],
    faqs: [
      { question: "Which social platforms should I focus on?", answer: "We recommend focusing on platforms where your target audience spends time. We can help identify the best channels for your business." },
      { question: "How often should we post?", answer: "Posting frequency depends on your platform and audience. We typically recommend 1-3 posts per day for optimal engagement." },
      { question: "Do you handle community management?", answer: "Yes, we manage comments, messages, and community interactions to build strong relationships with your followers." },
    ],
    reviews: [
      { name: "Jessica Lee", role: "Founder, DesignStudio", rating: 5, content: "Our follower count and engagement grew exponentially with their SMM campaigns!" },
      { name: "Robert Martinez", role: "Director, EventCorp", rating: 5, content: "Professional social media marketing that delivered real business results." },
    ],
  },
  "ppc": {
    icon: Zap,
    title: "PPC (Pay-Per-Click Advertising)",
    tagline: "Instant Traffic, Measurable Results",
    description: "Strategic PPC campaigns across Google, Bing, and social platforms to drive immediate traffic and qualified leads.",
    features: [
      "Keyword Research & Selection",
      "Ad Copy Creation",
      "Landing Page Optimization",
      "Bid Management",
      "A/B Testing",
      "Conversion Tracking & Analytics",
    ],
    benefits: [
      "Immediate targeted traffic",
      "Complete campaign control",
      "Measurable ROI",
      "Flexible budget management",
    ],
    faqs: [
      { question: "What's a good PPC budget to start with?", answer: "There's no minimum, but we recommend starting with $500-1000/month to gather meaningful data and optimize campaigns." },
      { question: "How quickly will I see results?", answer: "PPC campaigns go live immediately. You can see clicks and impressions within hours, though optimization takes a few weeks." },
      { question: "Which platforms should I advertise on?", answer: "Google Ads is best for search intent, while Facebook/Instagram are great for visual products. LinkedIn works well for B2B." },
    ],
    reviews: [
      { name: "Thomas Anderson", role: "E-Commerce Manager, ShopHub", rating: 5, content: "Their PPC campaigns increased our sales by 250%. Excellent ROI!" },
      { name: "Linda Robinson", role: "Owner, ServiceBiz", rating: 5, content: "Professional PPC management that consistently delivers high-quality leads." },
    ],
  },
  "google-ads": {
    icon: TrendingUp,
    title: "Google Ads Management",
    tagline: "Master Google's Advertising Platform",
    description: "Expert Google Ads management for Search, Display, Shopping, and YouTube to maximize your advertising ROI.",
    features: [
      "Search Ads Campaign Setup",
      "Display Network Campaigns",
      "Shopping Ads Optimization",
      "YouTube Advertising",
      "Remarketing Campaigns",
      "Budget Optimization & Scaling",
    ],
    benefits: [
      "Higher quality scores",
      "Lower cost per click",
      "Better ad placements",
      "Maximum ROI",
    ],
    faqs: [
      { question: "What's the difference between Search and Display ads?", answer: "Search ads appear in Google search results for relevant keywords. Display ads appear on websites across the Google Display Network." },
      { question: "How much should I spend on Google Ads?", answer: "Budget depends on your industry and goals. We'll help you determine the right spend to achieve your objectives cost-effectively." },
      { question: "How do you improve Quality Score?", answer: "We improve Quality Score through keyword optimization, better ad copy, landing page improvements, and account structure." },
    ],
    reviews: [
      { name: "Michael Chang", role: "Marketing Director, TechCorp", rating: 5, content: "Best Google Ads management we've worked with. Great results and excellent communication!" },
      { name: "Patricia Evans", role: "Founder, HealthWellness", rating: 5, content: "Our Quality Score and CTR improved dramatically. Highly professional team!" },
    ],
  },
};

// Website Development Types
const websiteDevelopmentTypes = [
  { slug: "wordpress", title: "WordPress Development" },
  { slug: "php-laravel", title: "PHP/Laravel Development" },
  { slug: "mern", title: "MERN Development" },
  { slug: "shopify", title: "Shopify Development" },
  { slug: "ecommerce", title: "E-Commerce Development" },
];

// Digital Marketing Types
const digitalMarketingTypes = [
  { slug: "seo", title: "SEO" },
  { slug: "smo", title: "SMO" },
  { slug: "smm", title: "SMM" },
  { slug: "ppc", title: "PPC" },
  { slug: "google-ads", title: "Google Ads" },
];

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

      {/* Website Development Type Selector */}
      {websiteDevelopmentTypes.some(type => type.slug === slug) && (
        <section className="py-6 bg-card/30 border-b border-primary/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 max-w-3xl mx-auto flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Explore other solutions:</span>
              <div className="flex flex-wrap gap-2">
                {websiteDevelopmentTypes.map((type) => (
                  <motion.div key={type.slug} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={`/services/${type.slug}`}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        slug === type.slug
                          ? "bg-primary text-primary-foreground"
                          : "glass-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {type.title.split(' ').slice(0, -1).join(' ')}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Digital Marketing Type Selector */}
      {digitalMarketingTypes.some(type => type.slug === slug) && (
        <section className="py-6 bg-card/30 border-b border-primary/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 max-w-3xl mx-auto flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Explore other solutions:</span>
              <div className="flex flex-wrap gap-2">
                {digitalMarketingTypes.map((type) => (
                  <motion.div key={type.slug} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={`/services/${type.slug}`}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        slug === type.slug
                          ? "bg-primary text-primary-foreground"
                          : "glass-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {type.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
