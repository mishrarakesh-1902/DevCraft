// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { 
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { 
//   Mail, Phone, MapPin, MessageCircle, Send, Clock, Globe, 
//   Linkedin, Twitter, Github, Facebook
// } from "lucide-react";
// import { toast } from "sonner";

// const services = [
//   "PHP Development",
//   "WordPress Development",
//   "Digital Marketing",
//   "Website Maintenance",
//   "SEO Services",
//   "Other",
// ];

// const socials = [
//   { icon: Linkedin, href: "#", label: "LinkedIn" },
//   { icon: Twitter, href: "#", label: "Twitter" },
//   { icon: Github, href: "#", label: "GitHub" },
//   { icon: Facebook, href: "#", label: "Facebook" },
// ];

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     budget: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Thank you! We'll get back to you within 24 hours.");
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       service: "",
//       budget: "",
//       message: "",
//     });
//   };

//   const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent("Hi, I'm interested in your services. I'd like to discuss a project.")}`;

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative py-24 overflow-hidden">
//         <div className="absolute inset-0 bg-grid-pattern opacity-20" />
//         <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <span className="text-primary font-medium text-sm uppercase tracking-wider">Contact Us</span>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mt-4 mb-6">
//               Let's Build Something <span className="gradient-text">Amazing</span>
//             </h1>
//             <p className="text-lg text-muted-foreground">
//               Ready to start your project? Get in touch and let's discuss how we can help you achieve your goals.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-24">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
//             {/* Contact Form */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
              
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Full Name *</label>
//                     <Input
//                       placeholder="John Doe"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       required
//                       className="bg-card"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Email Address *</label>
//                     <Input
//                       type="email"
//                       placeholder="john@example.com"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       required
//                       className="bg-card"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Phone Number</label>
//                     <Input
//                       type="tel"
//                       placeholder="+1 (234) 567-890"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       className="bg-card"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Service Interested In *</label>
//                     <Select
//                       value={formData.service}
//                       onValueChange={(value) => setFormData({ ...formData, service: value })}
//                     >
//                       <SelectTrigger className="bg-card">
//                         <SelectValue placeholder="Select a service" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {services.map((service) => (
//                           <SelectItem key={service} value={service}>
//                             {service}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Budget Range</label>
//                   <Select
//                     value={formData.budget}
//                     onValueChange={(value) => setFormData({ ...formData, budget: value })}
//                   >
//                     <SelectTrigger className="bg-card">
//                       <SelectValue placeholder="Select your budget" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="<1000">Less than $1,000</SelectItem>
//                       <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
//                       <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
//                       <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
//                       <SelectItem value=">25000">More than $25,000</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Tell Us About Your Project *</label>
//                   <Textarea
//                     placeholder="Describe your project, goals, and any specific requirements..."
//                     value={formData.message}
//                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                     required
//                     rows={5}
//                     className="bg-card"
//                   />
//                 </div>

//                 <Button type="submit" variant="hero" size="lg" className="w-full">
//                   <Send className="w-4 h-4" />
//                   Send Message
//                 </Button>
//               </form>
//             </motion.div>

//             {/* Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-8"
//             >
//               <div>
//                 <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
//                 <p className="text-muted-foreground mb-8">
//                   Prefer a different way to reach us? We're available through multiple channels.
//                 </p>
//               </div>

//               {/* Contact Cards */}
//               <div className="space-y-4">
//                 <div className="glass-card p-6 flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <Mail className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Email Us</h3>
//                     <a href="mailto:hello@devagency.com" className="text-muted-foreground hover:text-primary transition-colors">
//                       hello@devagency.com
//                     </a>
//                   </div>
//                 </div>

//                 <div className="glass-card p-6 flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <Phone className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Call Us</h3>
//                     <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
//                       +1 (234) 567-890
//                     </a>
//                   </div>
//                 </div>

//                 <div className="glass-card p-6 flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <MapPin className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Visit Us</h3>
//                     <p className="text-muted-foreground">
//                       123 Tech Street, Suite 456<br />
//                       Digital City, DC 12345
//                     </p>
//                   </div>
//                 </div>

//                 <div className="glass-card p-6 flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
//                     <Clock className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Business Hours</h3>
//                     <p className="text-muted-foreground">
//                       Mon - Fri: 9:00 AM - 6:00 PM<br />
//                       Sat - Sun: Closed
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* WhatsApp Button */}
//               <div className="glass-card p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
//                     <MessageCircle className="w-6 h-6 text-green-500" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">WhatsApp</h3>
//                     <p className="text-sm text-muted-foreground">Quick response within 1 hour</p>
//                   </div>
//                 </div>
//                 <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
//                   <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                     <MessageCircle className="w-4 h-4" />
//                     Chat on WhatsApp
//                   </a>
//                 </Button>
//               </div>

//               {/* Social Links */}
//               <div>
//                 <h3 className="font-semibold mb-4">Follow Us</h3>
//                 <div className="flex items-center gap-3">
//                   {socials.map((social) => (
//                     <a
//                       key={social.label}
//                       href={social.href}
//                       className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
//                       aria-label={social.label}
//                     >
//                       <social.icon className="w-5 h-5" />
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               {/* Map Placeholder */}
//               <div className="glass-card p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Globe className="w-5 h-5 text-primary" />
//                   <h3 className="font-semibold">We Work Globally</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   While based in Digital City, we work with clients worldwide. Our team is equipped to handle projects across all time zones.
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }






// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   MessageCircle,
//   Send,
//   Clock,
//   Globe,
//   Linkedin,
//   Twitter,
//   Github,
//   Facebook,
// } from "lucide-react";
// import { toast } from "sonner";
// import { useForm } from "@formspree/react";

// /* ---------------- DATA ---------------- */

// const services = [
//   "PHP Development",
//   "WordPress Development",
//   "Digital Marketing",
//   "Website Maintenance",
//   "SEO Services",
//   "Other",
// ];

// const socials = [
//   { icon: Linkedin, href: "#", label: "LinkedIn" },
//   { icon: Twitter, href: "#", label: "Twitter" },
//   { icon: Github, href: "#", label: "GitHub" },
//   { icon: Facebook, href: "#", label: "Facebook" },
// ];

// /* ---------------- COMPONENT ---------------- */

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     budget: "",
//     message: "",
//   });

//   // ✅ Formspree hook with your Form ID
//   const [state, handleSubmit] = useForm("mldqzlbz");

//   // ✅ Show success message when email is sent
//   useEffect(() => {
//     if (state.succeeded) {
//       toast.success("Thank you! We'll get back to you within 24 hours.");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         service: "",
//         budget: "",
//         message: "",
//       });
//     }
//   }, [state.succeeded]);

//   const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(
//     "Hi, I'm interested in your services. I'd like to discuss a project."
//   )}`;

//   return (
//     <Layout>
//       {/* ================= HERO ================= */}
//       <section className="relative py-24 overflow-hidden">
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <span className="text-primary font-medium text-sm uppercase tracking-wider">
//               Contact Us
//             </span>
//             <h1 className="text-5xl font-bold mt-4 mb-6">
//               Let's Build Something{" "}
//               <span className="text-primary">Amazing</span>
//             </h1>
//             <p className="text-muted-foreground">
//               Ready to start your project? Get in touch with us.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================= CONTACT ================= */}
//       <section className="py-24">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

//             {/* ========== CONTACT FORM ========== */}
//             <motion.div>
//               <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <Input
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                 />

//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                 />

//                 <Input
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                 />

//                 {/* Service */}
//                 <Select
//                   value={formData.service}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, service: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a service" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {services.map((service) => (
//                       <SelectItem key={service} value={service}>
//                         {service}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <input type="hidden" name="service" value={formData.service} />

//                 {/* Budget */}
//                 <Select
//                   value={formData.budget}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, budget: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select your budget" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="<1000">Less than $1,000</SelectItem>
//                     <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
//                     <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
//                     <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
//                     <SelectItem value=">25000">More than $25,000</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <input type="hidden" name="budget" value={formData.budget} />

//                 <Textarea
//                   name="message"
//                   placeholder="Tell us about your project..."
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                   rows={5}
//                   required
//                 />

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={state.submitting}
//                 >
//                   <Send className="w-4 h-4 mr-2" />
//                   {state.submitting ? "Sending..." : "Send Message"}
//                 </Button>
//               </form>
//             </motion.div>

//             {/* ========== CONTACT INFO ========== */}
//             <motion.div className="space-y-6">
//               <div className="flex items-center gap-3">
//                 <Mail /> hello@devagency.com
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone /> +1 (234) 567-890
//               </div>
//               <div className="flex items-center gap-3">
//                 <MapPin /> Digital City, DC
//               </div>

//               <Button asChild className="bg-green-500 hover:bg-green-600">
//                 <a
//                   href={whatsappLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <MessageCircle className="w-4 h-4 mr-2" />
//                   Chat on WhatsApp
//                 </a>
//               </Button>

//               <div className="flex gap-3">
//                 {socials.map((s) => (
//                   <a key={s.label} href={s.href} aria-label={s.label}>
//                     <s.icon />
//                   </a>
//                 ))}
//               </div>

//               <div className="glass-card p-6">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Globe className="w-5 h-5 text-primary" />
//                   <h3 className="font-semibold">We Work Globally</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   We work with clients worldwide across all time zones.
//                 </p>
//               </div>
//             </motion.div>

//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }





import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Facebook,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@formspree/react";

/* ---------------- DATA ---------------- */

const services = [
  "PHP Development",
  "WordPress Development",
  "Digital Marketing",
  "Website Maintenance",
  "SEO Services",
  "Other",
];

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

/* ---------------- COMPONENT ---------------- */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  // ✅ Formspree hook (YOUR FORM ID)
  const [state, handleSubmit] = useForm("mldqzlbz");

  // ✅ Success handling
  useEffect(() => {
    if (state.succeeded) {
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
      });
    }
  }, [state.succeeded]);

  const whatsappLink = `https://wa.me/9608651475?text=${encodeURIComponent(
    "Hi, I'm interested in your services. I'd like to discuss a project."
  )}`;

  return (
    <Layout>
      {/* ================= HERO SECTION (UNCHANGED UI) ================= */}
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
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mt-4 mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to start your project? Get in touch and let's discuss how we
              can help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

            {/* ========== CONTACT FORM (SAME UI) ========== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-heading font-bold mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-card"
                  />

                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-card"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="phone"
                    placeholder="+1 (234) 567-890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-card"
                  />

                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <input type="hidden" name="service" value={formData.service} />

                <Select
                  value={formData.budget}
                  onValueChange={(value) =>
                    setFormData({ ...formData, budget: value })
                  }
                >
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1000">Less than $1,000</SelectItem>
                    <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                    <SelectItem value=">25000">More than $25,000</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="budget" value={formData.budget} />

                <Textarea
                  name="message"
                  placeholder="Describe your project, goals, and any specific requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="bg-card"
                />

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={state.submitting}
                >
                  <Send className="w-4 h-4" />
                  {state.submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* ========== CONTACT INFO (UNCHANGED UI) ========== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Prefer a different way to reach us? We're available through
                  multiple channels.
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-4">
                <div className="glass-card p-6 flex gap-4">
                  <Mail className="w-6 h-6 text-primary" />
                  hello@devagency.com
                </div>
                <div className="glass-card p-6 flex gap-4">
                  <Phone className="w-6 h-6 text-primary" />
                  +1 (234) 567-890
                </div>
                <div className="glass-card p-6 flex gap-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  Digital City, DC
                </div>
                <div className="glass-card p-6 flex gap-4">
                  <Clock className="w-6 h-6 text-primary" />
                  Mon – Fri: 9AM – 6PM
                </div>
              </div>

              {/* WhatsApp */}
              <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>

              {/* Socials */}
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label}>
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">We Work Globally</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  While based in Digital City, we work with clients worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
