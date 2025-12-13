import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    avatar: "SJ",
    rating: 5,
    content: "DevAgency transformed our online presence completely. Their PHP expertise and attention to detail resulted in a 300% increase in our conversion rates.",
    service: "PHP Development",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    avatar: "MC",
    rating: 5,
    content: "The digital marketing team is exceptional. They understood our brand and delivered campaigns that exceeded all expectations. Highly recommended!",
    service: "Digital Marketing",
  },
  {
    name: "Emily Roberts",
    role: "Founder, StyleHouse",
    avatar: "ER",
    rating: 5,
    content: "Our WordPress site is now faster, more beautiful, and easier to manage. The team's creativity and technical skills are unmatched.",
    service: "WordPress Development",
  },
  {
    name: "David Thompson",
    role: "CTO, DataFlow Systems",
    avatar: "DT",
    rating: 5,
    content: "Outstanding SEO results! We went from page 5 to top 3 for our main keywords within 6 months. Their strategy is data-driven and effective.",
    service: "SEO Services",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
            Loved by <span className="gradient-text">500+ Clients</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 hover-zoom"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                "{testimonial.content}"
              </p>

              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {testimonial.service}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="font-heading font-bold text-xl">4.9</span>
            <span className="text-muted-foreground">Average Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
