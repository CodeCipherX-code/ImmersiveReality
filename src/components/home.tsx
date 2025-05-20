import React, { useEffect, useState } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Users,
  Building2,
  TrendingUp,
  Home as HomeIcon,
  Cog,
  BarChart4,
  Building,
  MapPin,
  Briefcase,
  Heart,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useStats } from "@/hooks/useStats";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedGradientBackground from "./ui/animated-gradient-background";
import FeatureCard from "./FeatureCard";
import StatsCard from "./StatsCard";
import { Button } from "./ui/button";
import { useInView } from "framer-motion";
import HeroSection from "./HeroSection";
import BlogSection from "./BlogSection";
import MemeSection from "./MemeSection";

interface HomeProps {
  initialProperties?: Array<{
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrl: string;
  }>;
}

const defaultProperties = [
  {
    id: "1",
    title: "Luxury Villa in Ahmedabad",
    price: 35000000,
    location: "Bodakdev, Ahmedabad",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: "2",
    title: "Modern Apartment in Surat",
    price: 25000000,
    location: "Vesu, Surat",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "3",
    title: "Penthouse in Vadodara",
    price: 45000000,
    location: "Alkapuri, Vadodara",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
];

const Home = ({ initialProperties = defaultProperties }: HomeProps) => {
  const stats = useStats();
  const { showNotification, showRandomNotification } = useNotification();
  const ref = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("buy");

  useEffect(() => {
    // Show welcome notification with a delay to ensure app is loaded
    const welcomeTimer = setTimeout(() => {
      try {
        showNotification(
          "🏠 Welcome to EstateVista! Where we find you a home before your lease expires (hopefully)!",
          "success",
          8000,
        );
      } catch (error) {
        console.error("Error showing welcome notification:", error);
      }
    }, 2000);

    // Show random notifications periodically
    const interval = setInterval(() => {
      try {
        showRandomNotification(Math.random() > 0.7 ? "success" : "info");
      } catch (error) {
        console.error("Error showing random notification:", error);
      }
    }, 60000); // Every 60 seconds

    return () => {
      clearTimeout(welcomeTimer);
      clearInterval(interval);
    };
  }, [showNotification, showRandomNotification]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Properties */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                Featured Properties
              </h2>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 flex items-center"
                onClick={() => (window.location.href = "/properties")}
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  onClick={() =>
                    (window.location.href = `/property/${property.id}`)
                  }
                  onViewTour={() => {
                    if (property.tour360) {
                      window.location.href = `/property-tour?id=${property.id}&tourUrl=${encodeURIComponent(property.tour360)}`;
                    }
                  }}
                >
                  <div className="relative">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                      For Sale
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 truncate">
                      {property.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {property.location}
                    </p>
                    <p className="text-green-600 font-bold text-xl mb-3">
                      ₹{(property.price / 100000).toFixed(1)}L
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                      <span>{property.sqft} sq.ft</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Explore Property Types
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: HomeIcon, label: "Apartments", count: 1245 },
                { icon: Building, label: "Villas", count: 873 },
                { icon: Building2, label: "Bungalows", count: 562 },
                { icon: MapPin, label: "Plots", count: 1089 },
                { icon: Briefcase, label: "Commercial", count: 734 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => (window.location.href = "/properties")}
                >
                  <div className="bg-green-100 p-3 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-3">
                    <item.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.label}</h3>
                  <p className="text-sm text-gray-500">
                    {item.count} Properties
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="py-16 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Mobile app"
                  className="rounded-lg shadow-xl mx-auto max-w-md w-full"
                />
              </motion.div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Strategy integrating
                  <br />
                  multiple property
                  <br />
                  types
                </h2>
                <p className="text-gray-600 mb-8">
                  We deliver a seamless client experience through a
                  comprehensive strategy based on thorough market research.
                </p>

                <div className="space-y-4">
                  <FeatureCard
                    icon={Search}
                    title="Smart Search"
                    description="Find your dream property with our advanced search filters"
                    index={1}
                  />
                  <FeatureCard
                    icon={Eye}
                    title="Virtual Tours"
                    description="Experience properties in 360° before visiting"
                    index={2}
                  />
                  <FeatureCard
                    icon={Users}
                    title="Expert Agents"
                    description="Get guidance from our experienced real estate agents"
                    index={3}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Popular Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Ahmedabad",
                  image:
                    "https://images.unsplash.com/photo-1599940824399-b87987ceb969?w=800&q=80",
                  properties: 1245,
                },
                {
                  name: "Surat",
                  image:
                    "https://images.unsplash.com/photo-1572508588813-77abd219e994?w=800&q=80",
                  properties: 873,
                },
                {
                  name: "Vadodara",
                  image:
                    "https://images.unsplash.com/photo-1580558606307-50d51681045c?w=800&q=80",
                  properties: 562,
                },
                {
                  name: "Rajkot",
                  image:
                    "https://images.unsplash.com/photo-1582376432754-b63cc6a9b8c3?w=800&q=80",
                  properties: 734,
                },
                {
                  name: "Gandhinagar",
                  image:
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
                  properties: 421,
                },
                {
                  name: "Bhavnagar",
                  image:
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
                  properties: 318,
                },
                {
                  name: "Jamnagar",
                  image:
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
                  properties: 256,
                },
                {
                  name: "Junagadh",
                  image:
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
                  properties: 189,
                },
              ].map((city, index) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (index % 4) }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                  onClick={() =>
                    (window.location.href = `/properties?city=${city.name.toLowerCase()}`)
                  }
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <h3 className="text-xl font-semibold mb-1">
                        {city.name}
                      </h3>
                      <p className="text-sm">{city.properties} Properties</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Driving Success
              </h2>
              <h3 className="text-2xl font-semibold mb-2">
                Through Real Estate
              </h3>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                Empowering investors to reach new heights
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  01
                </motion.div>
                <h3 className="font-semibold mb-4">Efficiency</h3>
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Efficiency"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>

              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  02
                </motion.div>
                <h3 className="font-semibold mb-4">Reliability</h3>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Reliability"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>

              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  03
                </motion.div>
                <h3 className="font-semibold mb-4">
                  Innovation in Real Estate
                </h3>
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Innovation"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>

              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  04
                </motion.div>
                <h3 className="font-semibold mb-4">Scalability</h3>
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
                  alt="Scalability"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Discover the range
                  <br />
                  of services we can
                  <br />
                  provide for your real
                  <br />
                  estate needs.
                </h2>

                <div className="space-y-6 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Market Analysis
                    </h3>
                    <p className="text-gray-600">
                      As a leader in commercial real estate, we empower
                      businesses to find the perfect space for their needs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Commercial Real Estate Services
                    </h3>
                    <p className="text-gray-600">
                      We have extensive experience in commercial real estate,
                      helping clients buy, sell, and lease properties. Explore
                      our portfolio of successful transactions.
                    </p>
                  </div>

                  <Button
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Learn more about our services
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Services"
                  className="rounded-lg shadow-xl mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Download Our Mobile App
                </h2>
                <p className="mb-6">
                  Get the best property deals on the go with our mobile
                  application
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-black hover:bg-gray-800 text-white px-6">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.5,2H8.5L3,7.5v9L8.5,22h9l5.5-5.5v-9L17.5,2z M12,17.5c-2.75,0-5-2.25-5-5s2.25-5,5-5s5,2.25,5,5S14.75,17.5,12,17.5z" />
                    </svg>
                    Google Play
                  </Button>
                  <Button className="bg-black hover:bg-gray-800 text-white px-6">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16.5,2h-9C5.06,2,3,4.06,3,6.5v11C3,19.94,5.06,22,7.5,22h9c2.44,0,4.5-2.06,4.5-4.5v-11C21,4.06,18.94,2,16.5,2z M12,17.5c-0.28,0-0.5-0.22-0.5-0.5s0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5S12.28,17.5,12,17.5z M14.5,14h-5c-0.28,0-0.5-0.22-0.5-0.5s0.22-0.5,0.5-0.5h5c0.28,0,0.5,0.22,0.5,0.5S14.78,14,14.5,14z" />
                    </svg>
                    App Store
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80"
                  alt="Mobile App"
                  className="max-w-xs rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <BlogSection />

        {/* Meme Section */}
        <MemeSection />

        {/* Trusted References */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Trusted references
                </h2>
                <p className="text-gray-600">We are in good company.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => (window.location.href = "/about")}
                >
                  See our success stories
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-8 md:mt-0">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Amsterdam</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Firenze</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Nairobi</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Madrid</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">KOBE</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Berlin</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Home;
