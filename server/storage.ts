import { 
  users, 
  metrics,
  modules,
  valuePillars,
  features,
  articles,
  hijaiyahLetters,
  dhikr,
  quizCategories,
  quizQuestions,
  quizOptions,
  contactMessages,
  subscribers,
  type User, 
  type InsertUser,
  type Metrics,
  type Module,
  type ValuePillar,
  type Feature,
  type Article,
  type HijaiyahLetter,
  type InsertHijaiyahLetter,
  type Dhikr,
  type QuizCategory,
  type QuizQuestion,
  type QuizOption,
  type ContactMessage,
  type InsertContactMessage,
  type Subscriber,
  type InsertSubscriber
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, count, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Metrics methods
  getMetrics(): Promise<Record<string, number>>;
  
  // Content methods
  getModules(): Promise<Module[]>;
  getValuePillars(): Promise<ValuePillar[]>;
  getFeatures(): Promise<Feature[]>;
  getArticles(): Promise<Article[]>;
  
  // Hijaiyah letters methods
  getHijaiyahLetters(): Promise<HijaiyahLetter[]>;
  createHijaiyahLetter(letter: InsertHijaiyahLetter): Promise<HijaiyahLetter>;
  updateHijaiyahLetter(id: string, updates: Partial<InsertHijaiyahLetter>): Promise<void>;
  
  // Dhikr methods
  getDhikr(type?: 'morning' | 'evening'): Promise<Dhikr[]>;
  
  // Quiz methods
  getQuizCategories(): Promise<QuizCategory[]>;
  getQuizQuestions(categoryId: string): Promise<(QuizQuestion & { quiz_options: QuizOption[] })[]>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  markMessageAsRead(id: string): Promise<void>;
  
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Admin methods
  getDashboardStats(): Promise<{
    hijaiyahCount: number;
    dhikrCount: number;
    articlesCount: number;
    messagesCount: number;
    quizCount: number;
    featuresCount: number;
    recentMessages: ContactMessage[];
  }>;
  getRecentContactMessages(limit: number): Promise<ContactMessage[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getMetrics(): Promise<Record<string, number>> {
    const allMetrics = await db.select().from(metrics);
    return allMetrics.reduce((acc, metric) => {
      acc[metric.key] = metric.value;
      return acc;
    }, {} as Record<string, number>);
  }

  async getModules(): Promise<Module[]> {
    return await db
      .select()
      .from(modules)
      .where(eq(modules.isActive, true))
      .orderBy(asc(modules.orderIndex));
  }

  async getValuePillars(): Promise<ValuePillar[]> {
    return await db
      .select()
      .from(valuePillars)
      .orderBy(asc(valuePillars.orderIndex));
  }

  async getFeatures(): Promise<Feature[]> {
    return await db
      .select()
      .from(features)
      .where(eq(features.isActive, true))
      .orderBy(asc(features.orderIndex));
  }

  async getArticles(): Promise<Article[]> {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.isPublished, true))
      .orderBy(desc(articles.createdAt))
      .limit(6);
  }

  async getHijaiyahLetters(): Promise<HijaiyahLetter[]> {
    return await db
      .select()
      .from(hijaiyahLetters)
      .orderBy(asc(hijaiyahLetters.orderIndex));
  }

  async createHijaiyahLetter(letter: InsertHijaiyahLetter): Promise<HijaiyahLetter> {
    const [created] = await db
      .insert(hijaiyahLetters)
      .values(letter)
      .returning();
    return created;
  }

  async updateHijaiyahLetter(id: string, updates: Partial<InsertHijaiyahLetter>): Promise<void> {
    await db
      .update(hijaiyahLetters)
      .set(updates)
      .where(eq(hijaiyahLetters.id, id));
  }

  async getDhikr(type?: 'morning' | 'evening'): Promise<Dhikr[]> {
    const query = db.select().from(dhikr);
    
    if (type) {
      return await query
        .where(eq(dhikr.type, type))
        .orderBy(asc(dhikr.orderIndex));
    }
    
    return await query.orderBy(asc(dhikr.type), asc(dhikr.orderIndex));
  }

  async getQuizCategories(): Promise<QuizCategory[]> {
    return await db
      .select()
      .from(quizCategories)
      .where(eq(quizCategories.isActive, true))
      .orderBy(asc(quizCategories.orderIndex));
  }

  async getQuizQuestions(categoryId: string): Promise<(QuizQuestion & { quiz_options: QuizOption[] })[]> {
    const questions = await db
      .select()
      .from(quizQuestions)
      .where(and(
        eq(quizQuestions.categoryId, categoryId),
        eq(quizQuestions.isActive, true)
      ))
      .orderBy(asc(quizQuestions.orderIndex));

    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        const options = await db
          .select()
          .from(quizOptions)
          .where(eq(quizOptions.questionId, question.id))
          .orderBy(asc(quizOptions.orderIndex));
        
        return {
          ...question,
          quiz_options: options
        };
      })
    );

    return questionsWithOptions;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [created] = await db
      .insert(subscribers)
      .values(subscriber)
      .returning();
    return created;
  }

  // Admin methods
  async getHijaiyahLettersCount(): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(hijaiyahLetters);
    return result.count;
  }

  async getArticlesCount(): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(articles);
    return result.count;
  }

  async getContactMessagesCount(): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(contactMessages);
    return result.count;
  }

  async getFeaturesCount(): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(features);
    return result.count;
  }

  async getRecentContactMessages(limit: number): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(limit);
  }

  async getDashboardStats() {
    const [
      hijaiyahResult,
      articlesResult,
      messagesResult,
      featuresResult,
      recentMessages
    ] = await Promise.all([
      db.select({ count: count() }).from(hijaiyahLetters),
      db.select({ count: count() }).from(articles),
      db.select({ count: count() }).from(contactMessages),
      db.select({ count: count() }).from(features),
      this.getRecentContactMessages(5)
    ]);

    return {
      hijaiyahCount: hijaiyahResult[0]?.count || 0,
      dhikrCount: 0, // Will be implemented when dhikr data is available
      articlesCount: articlesResult[0]?.count || 0,
      messagesCount: messagesResult[0]?.count || 0,
      quizCount: 0, // Will be implemented when quiz data is available
      featuresCount: featuresResult[0]?.count || 0,
      recentMessages: recentMessages
    };
  }
}

export const storage = new DatabaseStorage();
