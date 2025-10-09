"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { Code, Users, Sparkles, GitBranch, ArrowRight, Play, CheckCircle } from "lucide-react";
import { useRef } from "react";

export default function HomePage() {
  const features = [
    { 
      icon: <Users className="w-6 h-6" />, 
      title: "Real-time Collaboration", 
      description: "Work together seamlessly with live code editing and live cursor support.",
      color: "text-blue-500"
    },
    { 
      icon: <Sparkles className="w-6 h-6" />, 
      title: "AI-driven Tools", 
      description: "Get intelligent code suggestions instantly with comprehensive documentation.",
      color: "text-violet-500"
    },
    { 
      icon: <Code className="w-6 h-6" />, 
      title: "Smart Linting", 
      description: "Identify and fix syntax errors effortlessly as you type with smart AI suggestions.",
      color: "text-emerald-500"
    },
    { 
      icon: <GitBranch className="w-6 h-6" />, 
      title: "AI Chat Support", 
      description: "Integrated AI chatbot for instant help and guidance.",
      color: "text-amber-500"
    },
  ];

  const benefits = [
    "No setup required",
    "Real-time collaboration",
    "AI-powered assistance",
    "Multiple language support",
    "Instant code execution",
    "Smart error detection"
  ];

  const testimonialRef = useRef(null);
  const isInView = useInView(testimonialRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h1
              className="text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              AI-Powered
              <span className="block text-blue-500">Code Editor</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Write, collaborate, and debug with AI-assisted coding in real-time. 
              Experience the future of development.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                onClick={() => window.location.href = "/register"}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                onClick={() => window.location.href = "/login"}
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to code, collaborate, and create amazing applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors mb-4 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Editor Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">See It In Action</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the power of AI-assisted coding with our intuitive interface.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Editor Header */}
            <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm">main.js</span>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-8">
              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-400">
                  <span className="text-blue-400">function</span>{" "}
                  <span className="text-white">welcome()</span>{" "}
                  <span className="text-gray-500">{"{"}</span>
                </div>
                <div className="text-gray-300 ml-4">
                  <span className="text-yellow-400">console</span>
                  <span className="text-white">.</span>
                  <span className="text-blue-400">log</span>
                  <span className="text-white">(</span>
                  <span className="text-green-300">"✨ Welcome to the Future of Coding ✨"</span>
                  <span className="text-white">)</span>
                </div>
                <div className="text-gray-500">{"}"}</div>
                <div className="text-gray-400 mt-4">
                  <span className="text-blue-400">//</span> AI-powered suggestions appear here
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-800/50" ref={testimonialRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">What Developers Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who are already building amazing things.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Alex Chen</h4>
                      <p className="text-gray-400 text-sm">Senior Developer</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "This AI-powered editor has completely transformed how I approach coding. 
                    The real-time collaboration features are incredible."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                      T
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Taylor Rodriguez</h4>
                      <p className="text-gray-400 text-sm">Full Stack Developer</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "The AI suggestions are spot-on and the collaborative features make 
                    team development so much more efficient."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and start building amazing applications with AI assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = "/register"}
              >
                Start Coding Now
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                onClick={() => window.location.href = "/login"}
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2025 CodeRev. All rights reserved. Built with ❤️ for developers.
          </p>
        </div>
      </footer>
    </div>
  );
}