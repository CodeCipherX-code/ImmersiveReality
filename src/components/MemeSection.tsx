import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  MessageCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Button } from "./ui/button";

interface Meme {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
}

const defaultMemes: Meme[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&q=80",
    title: "When the real estate agent says it's a 'cozy' apartment",
    likes: 2453,
    comments: 142,
    shares: 89,
    tags: ["realestate", "apartment", "cozy"],
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
    title: "Me looking at houses I can't afford on EstateVista",
    likes: 3872,
    comments: 231,
    shares: 156,
    tags: ["luxuryhomes", "dreamhouse", "budgetproblems"],
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80",
    title: "When the neighbor's cat judges your property choices",
    likes: 1987,
    comments: 98,
    shares: 45,
    tags: ["judgmentalcat", "neighbors", "propertyviews"],
  },
];

interface MemeSectionProps {
  memes?: Meme[];
}

const MemeSection = ({ memes = defaultMemes }: MemeSectionProps) => {
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const currentMeme = memes[currentMemeIndex];

  const handleLike = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextMeme = () => {
    setCurrentMemeIndex((prev) => (prev + 1) % memes.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-500/10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">TRENDING NOW</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Estate Meme Corner
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Because sometimes you just need to laugh at the housing market
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            key={currentMeme.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium text-lg">{currentMeme.title}</h3>
            </div>
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={currentMeme.imageUrl}
                alt={currentMeme.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 ${liked[currentMeme.id] ? "text-red-500" : "text-gray-600"}`}
                    onClick={() => handleLike(currentMeme.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${liked[currentMeme.id] ? "fill-red-500 text-red-500" : ""}`}
                    />
                    <span>
                      {liked[currentMeme.id]
                        ? currentMeme.likes + 1
                        : currentMeme.likes}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-gray-600"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{currentMeme.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-gray-600"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>{currentMeme.shares}</span>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                  onClick={handleNextMeme}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Next Meme
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentMeme.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MemeSection;
