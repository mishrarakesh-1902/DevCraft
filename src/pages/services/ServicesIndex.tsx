import { Layout } from "@/components/layout/Layout";
import { ServicesSection } from "@/components/home/ServicesSection";
import { motion } from "framer-motion";

export default function ServicesIndex() {
  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-4xl font-heading font-bold mb-4">Our Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Explore our core service offerings. Click a service to learn more or get in touch with us for custom solutions.</p>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
    </Layout>
  );
}