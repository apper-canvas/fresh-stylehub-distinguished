import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      title: "Latest Fashion Trends",
      subtitle: "Discover the newest styles for every season",
      buttonText: "Shop Now",
      buttonAction: () => navigate("/category/women"),
      gradient: "from-primary to-accent"
    },
    {
      id: 2,
      title: "Men's Collection",
      subtitle: "Elevate your style with our premium menswear",
      buttonText: "Explore Men's",
      buttonAction: () => navigate("/category/men"),
      gradient: "from-secondary to-primary"
    },
    {
      id: 3,
      title: "Kids Fashion",
      subtitle: "Comfortable and stylish clothing for little ones",
      buttonText: "Shop Kids",
      buttonAction: () => navigate("/category/kids"),
      gradient: "from-accent to-primary"
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}
        >
          <div className="text-center text-white px-4 max-w-2xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-display font-bold mb-4"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl mb-8 text-white/90"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={slide.buttonAction}
                className="bg-white text-gray-900 hover:bg-gray-100 border-white"
              >
                {slide.buttonText}
                <ApperIcon name="ArrowRight" className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;