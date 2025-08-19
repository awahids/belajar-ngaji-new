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

const database = db!;

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await database.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await database.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await database
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getMetrics(): Promise<Record<string, number>> {
    const allMetrics = await database.select().from(metrics);
    return allMetrics.reduce((acc, metric) => {
      acc[metric.key] = metric.value;
      return acc;
    }, {} as Record<string, number>);
  }

  async getModules(): Promise<Module[]> {
    return await database
      .select()
      .from(modules)
      .where(eq(modules.isActive, true))
      .orderBy(asc(modules.orderIndex));
  }

  async getValuePillars(): Promise<ValuePillar[]> {
    return await database
      .select()
      .from(valuePillars)
      .orderBy(asc(valuePillars.orderIndex));
  }

  async getFeatures(): Promise<Feature[]> {
    return await database
      .select()
      .from(features)
      .where(eq(features.isActive, true))
      .orderBy(asc(features.orderIndex));
  }

  async getArticles(): Promise<Article[]> {
    return await database
      .select()
      .from(articles)
      .where(eq(articles.isPublished, true))
      .orderBy(desc(articles.createdAt))
      .limit(6);
  }

  async getHijaiyahLetters(): Promise<HijaiyahLetter[]> {
    return await database
      .select()
      .from(hijaiyahLetters)
      .orderBy(asc(hijaiyahLetters.orderIndex));
  }

  async createHijaiyahLetter(letter: InsertHijaiyahLetter): Promise<HijaiyahLetter> {
    const [created] = await database
      .insert(hijaiyahLetters)
      .values(letter)
      .returning();
    return created;
  }

  async updateHijaiyahLetter(id: string, updates: Partial<InsertHijaiyahLetter>): Promise<void> {
    await database
      .update(hijaiyahLetters)
      .set(updates)
      .where(eq(hijaiyahLetters.id, id));
  }

  async getDhikr(type?: 'morning' | 'evening'): Promise<Dhikr[]> {
    const query = database.select().from(dhikr);
    
    if (type) {
      return await query
        .where(eq(dhikr.type, type))
        .orderBy(asc(dhikr.orderIndex));
    }
    
    return await query.orderBy(asc(dhikr.type), asc(dhikr.orderIndex));
  }

  async getQuizCategories(): Promise<QuizCategory[]> {
    return await database
      .select()
      .from(quizCategories)
      .where(eq(quizCategories.isActive, true))
      .orderBy(asc(quizCategories.orderIndex));
  }

  async getQuizQuestions(categoryId: string): Promise<(QuizQuestion & { quiz_options: QuizOption[] })[]> {
    const questions = await database
      .select()
      .from(quizQuestions)
      .where(and(
        eq(quizQuestions.categoryId, categoryId),
        eq(quizQuestions.isActive, true)
      ))
      .orderBy(asc(quizQuestions.orderIndex));

    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        const options = await database
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
    const [created] = await database
      .insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await database
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async markMessageAsRead(id: string): Promise<void> {
    await database
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [created] = await database
      .insert(subscribers)
      .values(subscriber)
      .returning();
    return created;
  }

  // Admin methods
  async getHijaiyahLettersCount(): Promise<number> {
    const [result] = await database
      .select({ count: count() })
      .from(hijaiyahLetters);
    return result.count;
  }

  async getArticlesCount(): Promise<number> {
    const [result] = await database
      .select({ count: count() })
      .from(articles);
    return result.count;
  }

  async getContactMessagesCount(): Promise<number> {
    const [result] = await database
      .select({ count: count() })
      .from(contactMessages);
    return result.count;
  }

  async getFeaturesCount(): Promise<number> {
    const [result] = await database
      .select({ count: count() })
      .from(features);
    return result.count;
  }

  async getRecentContactMessages(limit: number): Promise<ContactMessage[]> {
    return await database
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
      database.select({ count: count() }).from(hijaiyahLetters),
      database.select({ count: count() }).from(articles),
      database.select({ count: count() }).from(contactMessages),
      database.select({ count: count() }).from(features),
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

class MemoryStorage implements IStorage {
  // User methods
  async getUser(): Promise<User | undefined> {
    return undefined;
  }
  async getUserByUsername(): Promise<User | undefined> {
    return undefined;
  }
  async createUser(user: InsertUser): Promise<User> {
    return { ...user, id: 0 } as User;
  }

  // Metrics methods
  async getMetrics(): Promise<Record<string, number>> {
    return {};
  }

  // Content methods
  async getModules(): Promise<Module[]> {
    return [];
  }
  async getValuePillars(): Promise<ValuePillar[]> {
    return [];
  }
  async getFeatures(): Promise<Feature[]> {
    return [];
  }
  async getArticles(): Promise<Article[]> {
    return [];
  }

  // Hijaiyah letters methods
  async getHijaiyahLetters(): Promise<HijaiyahLetter[]> {
    return [];
  }
  async createHijaiyahLetter(letter: InsertHijaiyahLetter): Promise<HijaiyahLetter> {
    return { ...letter, id: "" } as HijaiyahLetter;
  }
  async updateHijaiyahLetter(): Promise<void> {
    return;
  }

  // Dhikr methods
  async getDhikr(): Promise<Dhikr[]> {
    return [];
  }

  // Quiz methods
  async getQuizCategories(): Promise<QuizCategory[]> {
    return [];
  }
  async getQuizQuestions(): Promise<(QuizQuestion & { quiz_options: QuizOption[] })[]> {
    return [];
  }

  // Contact methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    return { ...message, id: "", createdAt: new Date(), isRead: false } as ContactMessage;
  }
  async getContactMessages(): Promise<ContactMessage[]> {
    return [];
  }
  async markMessageAsRead(): Promise<void> {
    return;
  }

  // Subscriber methods
  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    return { ...subscriber, id: "", createdAt: new Date(), isActive: true } as Subscriber;
  }

  // Admin methods
  async getDashboardStats() {
    return {
      hijaiyahCount: 0,
      dhikrCount: 0,
      articlesCount: 0,
      messagesCount: 0,
      quizCount: 0,
      featuresCount: 0,
      recentMessages: [] as ContactMessage[],
    };
  }
  async getRecentContactMessages(): Promise<ContactMessage[]> {
    return [];
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();
