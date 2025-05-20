import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import {
  Search,
  Home,
  TrendingUp,
  Users,
  Building,
  Building2,
  MapPin,
  Briefcase,
  Heart,
} from "lucide-react";

interface HeroSectionProps {
  featuredProperties?: Array<{
    id: string;
    imageUrl: string;
    title: string;
  }>;
  stats?: {
    totalProperties?: number;
    averagePrice?: number;
    activeUsers?: number;
  };
}

const images = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    title: "Luxury Villa in Ahmedabad",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    title: "Modern Apartment in Surat",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    title: "Penthouse in Vadodara",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    title: "Luxury Home",
  },
  {
    id: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    title: "Modern Villa",
  },
];

const propertyTypes = [
  { id: "buy", label: "Buy", icon: Home },
  { id: "rent", label: "Rent", icon: Building },
  { id: "commercial", label: "Commercial", icon: Building2 },
  { id: "pg", label: "PG/Co-living", icon: Users },
  { id: "plots", label: "Plots", icon: MapPin },
];

const HeroSection = ({
  featuredProperties = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      title: "Luxury Villa in Ahmedabad",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      title: "Modern Apartment in Surat",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      title: "Penthouse in Vadodara",
    },
  ],
  stats = {
    totalProperties: 5000,
    averagePrice: 7500000,
    activeUsers: 10000,
  },
}: HeroSectionProps) => {
  const [activeTab, setActiveTab] = useState("buy");
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden h-[500px]">
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-6 mt-8"
        >
          Discover Your Dream Property in Gujarat
        </motion.h1>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mt-8"
        >
          {/* Property Type Tabs */}
          <div className="flex border-b">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                className={`flex-1 py-4 px-2 flex flex-col items-center justify-center transition-all ${activeTab === type.id ? "text-green-600 border-b-2 border-green-600 font-medium" : "text-gray-500 hover:text-green-600"}`}
                onClick={() => setActiveTab(type.id)}
              >
                <type.icon
                  className={`h-5 w-5 mb-1 ${activeTab === type.id ? "text-green-600" : "text-gray-500"}`}
                />
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="p-6">
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="ahmedabad">
                <SelectTrigger className="w-full md:w-[200px] bg-white border border-gray-300">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                  <SelectItem value="surat">Surat</SelectItem>
                  <SelectItem value="vadodara">Vadodara</SelectItem>
                  <SelectItem value="rajkot">Rajkot</SelectItem>
                  <SelectItem value="bhavnagar">Bhavnagar</SelectItem>
                  <SelectItem value="jamnagar">Jamnagar</SelectItem>
                  <SelectItem value="junagadh">Junagadh</SelectItem>
                  <SelectItem value="gandhinagar">Gandhinagar</SelectItem>
                  <SelectItem value="anand">Anand</SelectItem>
                  <SelectItem value="navsari">Navsari</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px] bg-white border border-gray-300">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                  <SelectItem value="Bungalow">Bungalow</SelectItem>
                  <SelectItem value="Farmhouse">Farmhouse</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px] bg-white border border-gray-300">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Price Ranges</SelectItem>
                  <SelectItem value="student">Student Rentals</SelectItem>
                  <SelectItem value="affordable">Middle Class</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1 min-w-[200px]">
                <Input
                  type="text"
                  placeholder="Search by location or property name"
                  className="w-full bg-white border border-gray-300"
                />
              </div>

              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 min-w-[120px]"
                onClick={() => (window.location.href = "/properties")}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            {/* Advanced Options Toggle */}
            <div className="mt-4">
              <button
                className="text-green-600 text-sm font-medium flex items-center"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? "Hide" : "Show"} Advanced Options
                <motion.span
                  animate={{ rotate: showAdvanced ? 180 : 0 }}
                  className="ml-1"
                >
                  ▼
                </motion.span>
              </button>
            </div>

            {/* Advanced Options */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <Select defaultValue="any">
                      <SelectTrigger className="w-full bg-white border border-gray-300">
                        <SelectValue placeholder="Bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Bedrooms</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="any">
                      <SelectTrigger className="w-full bg-white border border-gray-300">
                        <SelectValue placeholder="Bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Bathrooms</SelectItem>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="3">3+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="any">
                      <SelectTrigger className="w-full bg-white border border-gray-300">
                        <SelectValue placeholder="Furnishing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Furnishing</SelectItem>
                        <SelectItem value="furnished">Furnished</SelectItem>
                        <SelectItem value="semifurnished">
                          Semi-Furnished
                        </SelectItem>
                        <SelectItem value="unfurnished">Unfurnished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { icon: Building2, label: "Commercial Properties" },
            { icon: Briefcase, label: "Real Estate Agents" },
            { icon: Heart, label: "Saved Properties" },
            { icon: TrendingUp, label: "Market Insights" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => (window.location.href = "/properties")}
            >
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <item.icon className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <Home className="h-8 w-8 mr-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Properties</p>
                  <motion.p
                    className="text-2xl font-bold text-gray-800"
                    key={stats.totalProperties} // Force animation restart
                    initial={{ scale: 1.5, color: "#22c55e" }}
                    animate={{ scale: 1, color: "#1f2937" }}
                    transition={{ duration: 0.5 }}
                  >
                    {stats.totalProperties.toLocaleString()}
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <TrendingUp className="h-8 w-8 mr-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Average Price</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{(stats.averagePrice / 100000).toFixed(1)}L
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <Users className="h-8 w-8 mr-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <motion.p
                    className="text-2xl font-bold text-gray-800"
                    key={stats.activeUsers} // Force animation restart
                    initial={{ scale: 1.2, color: "#3b82f6" }}
                    animate={{ scale: 1, color: "#1f2937" }}
                    transition={{ duration: 0.3 }}
                  >
                    {stats.activeUsers.toLocaleString()}
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
