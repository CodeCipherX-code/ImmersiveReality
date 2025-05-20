import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  readTime: string;
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Lost Luggage Lessons, unexpected Turns on the Travel Trail",
    description:
      "What happens when your luggage decides to take its own vacation? Find out in this adventure.",
    imageUrl:
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&q=80",
    date: "Sunday, August 12, 2023",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "From Guidebooks to Gastro, adventures Through a Foodie's Lens",
    description:
      "Exploring the world one dish at a time, and how food becomes the ultimate travel guide.",
    imageUrl:
      "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&q=80",
    date: "Wednesday, February 14, 2024",
    readTime: "11 min read",
  },
  {
    id: "3",
    title: "Off the Grid & Onto the Trail, nature's Adventures Await",
    description:
      "Disconnecting from technology and reconnecting with nature through thrilling outdoor experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=800&q=80",
    date: "Saturday, May 4, 2024",
    readTime: "8 min read",
  },
  {
    id: "4",
    title: "Postcard Perfect & Beyond: unveiling the Raw Beauty of Travel",
    description:
      "Looking past the Instagram filters to find authentic travel experiences worth remembering.",
    imageUrl:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80",
    date: "Friday, October 27, 2023",
    readTime: "6 min read",
  },
];

interface BlogSectionProps {
  blogPosts?: BlogPost[];
}

const BlogSection = ({ blogPosts = defaultBlogPosts }: BlogSectionProps) => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            BLOGS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Travel Tales from
            <br />a Curious Explorer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Following my nose to discover unique cultures,
            <br />
            breathtaking landscapes, & unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              onClick={() => (window.location.href = `/blog/${post.id}`)}
            >
              <div className="flex flex-col h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4 mt-auto">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex justify-end">
                    <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={() => (window.location.href = "/blog")}
            >
              View All
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
