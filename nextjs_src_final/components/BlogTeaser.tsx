
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const articles = [
  {
    title: "10 Creative Storage Solutions for Small Spaces",
    excerpt: "Discover innovative ways to maximize storage in compact areas...",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
    category: "Storage Tips"
  },
  {
    title: "2024 Closet Design Trends",
    excerpt: "Explore the latest trends in custom closet design and organization...",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop",
    category: "Design Trends"
  },
  {
    title: "The Ultimate Garage Organization Guide",
    excerpt: "Transform your garage into a functional and organized space...",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop",
    category: "Organization"
  }
];

const BlogTeaser = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            Latest Storage Tips & Ideas
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto">
            Get inspired with our latest articles on organization and design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <div
              key={article.title}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-semibold text-citrus-charcoal mb-2">
                  {article.title}
                </h3>
                <p className="text-citrus-charcoal/70 mb-4">
                  {article.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-citrus-orange hover:text-citrus-coral transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" className="group">
            Visit Our Blog
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;
