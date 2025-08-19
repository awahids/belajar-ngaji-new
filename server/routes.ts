import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertSubscriberSchema, 
  insertHijaiyahLetterSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Metrics API
  app.get("/api/metrics", async (req, res) => {
    try {
      const metricsData = await storage.getMetrics();
      
      const response = {
        sessionsCount: metricsData.sessions || 50000,
        learnersCount: metricsData.learners || 12000,
        lettersCount: metricsData.letters || 28,
        dhikrEntries: metricsData.dhikr_entries || 8,
        quizQuestions: metricsData.quiz_questions || 40
      };
      
      res.json(response);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      res.json({
        sessionsCount: 50000,
        learnersCount: 12000,
        lettersCount: 28,
        dhikrEntries: 8,
        quizQuestions: 40
      });
    }
  });

  // Content APIs
  app.get("/api/modules", async (req, res) => {
    try {
      const modules = await storage.getModules();
      res.json(modules);
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.json([]);
    }
  });

  app.get("/api/value-pillars", async (req, res) => {
    try {
      const pillars = await storage.getValuePillars();
      res.json(pillars);
    } catch (error) {
      console.error('Error fetching value pillars:', error);
      res.json([]);
    }
  });

  app.get("/api/features", async (req, res) => {
    try {
      const features = await storage.getFeatures();
      res.json(features);
    } catch (error) {
      console.error('Error fetching features:', error);
      res.json([]);
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.json([]);
    }
  });

  // Hijaiyah Letters API
  app.get("/api/hijaiyah-letters", async (req, res) => {
    try {
      const letters = await storage.getHijaiyahLetters();
      res.json(letters);
    } catch (error) {
      console.error('Error fetching hijaiyah letters:', error);
      res.status(500).json({ error: 'Failed to fetch hijaiyah letters' });
    }
  });

  app.post("/api/hijaiyah-letters", async (req, res) => {
    try {
      const validatedData = insertHijaiyahLetterSchema.parse(req.body);
      const letter = await storage.createHijaiyahLetter(validatedData);
      res.status(201).json(letter);
    } catch (error) {
      console.error('Error creating hijaiyah letter:', error);
      res.status(400).json({ error: 'Failed to create hijaiyah letter' });
    }
  });

  app.put("/api/hijaiyah-letters/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertHijaiyahLetterSchema.partial().parse(req.body);
      await storage.updateHijaiyahLetter(id, validatedData);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating hijaiyah letter:', error);
      res.status(400).json({ error: 'Failed to update hijaiyah letter' });
    }
  });

  // Dhikr API
  app.get("/api/dhikr", async (req, res) => {
    try {
      const { type } = req.query;
      const dhikrData = await storage.getDhikr(type as 'morning' | 'evening' | undefined);
      res.json(dhikrData);
    } catch (error) {
      console.error('Error fetching dhikr:', error);
      res.status(500).json({ error: 'Failed to fetch dhikr' });
    }
  });

  // Admin Dashboard API
  app.get("/api/admin/dashboard", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
  });

  // Quiz APIs
  app.get("/api/quiz-categories", async (req, res) => {
    try {
      const categories = await storage.getQuizCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching quiz categories:', error);
      res.status(500).json({ error: 'Failed to fetch quiz categories' });
    }
  });

  app.get("/api/quiz-questions/:categoryId", async (req, res) => {
    try {
      const { categoryId } = req.params;
      const questions = await storage.getQuizQuestions(categoryId);
      res.json(questions);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
  });

  // Contact APIs
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(400).json({ error: 'Failed to submit contact form' });
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
  });

  app.put("/api/contact-messages/:id/read", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markMessageAsRead(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error marking message as read:', error);
      res.status(400).json({ error: 'Failed to mark message as read' });
    }
  });

  // Newsletter API
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json({ success: true, subscriber });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(400).json({ error: 'Failed to subscribe to newsletter' });
    }
  });



  const httpServer = createServer(app);

  return httpServer;
}
