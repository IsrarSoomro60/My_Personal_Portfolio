import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "Customer Churn Prediction System",
      description: "Built a predictive analytics solution to identify customers likely to churn using machine learning techniques. Performed feature engineering and trained an XGBoost model with strong ROC-AUC performance. Delivered actionable business insights through an interactive dashboard to support retention strategies.",
      technologies: ["Python", "Pandas", "Scikit-learn", "XGBoost", "SHAP", "Streamlit"],
      category: "Machine Learning",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      repoUrl: "https://github.com/israr-ahmed/churn-prediction",
    });

    await storage.createProject({
      title: "Sales Forecasting & Demand Prediction",
      description: "Developed a time-series forecasting model to predict future sales trends using historical retail data. Applied Prophet/ARIMA models to capture seasonality and trends, providing data-driven insights for inventory and revenue planning.",
      technologies: ["Python", "Pandas", "Prophet", "Matplotlib", "Streamlit"],
      category: "Machine Learning",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      repoUrl: "https://github.com/israr-ahmed/sales-forecasting",
    });

    await storage.createProject({
      title: "ShopNex - Full-Stack E-Commerce Platform",
      description: "Developed a scalable e-commerce web application using Django REST Framework as the backend and React as the frontend. Implemented secure user authentication, product catalog management, shopping cart functionality, order processing, and payment integration. Designed RESTful APIs for seamless frontend-backend communication.",
      technologies: ["Django", "Django REST Framework", "React", "PostgreSQL", "JWT Authentication"],
      category: "Full Stack",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
      repoUrl: "https://github.com/israr-ahmed/shopnex",
    });

    await storage.createProject({
      title: "CollabSphere - Smart Project & Workflow Management",
      description: "Built a collaborative workflow management system enabling teams to manage projects, assign tasks, and track progress in real time. Integrated Django REST APIs with a dynamic React frontend and implemented role-based access control for secure collaboration. Included productivity analytics and performance tracking features to enhance team efficiency.",
      technologies: ["Django", "DRF", "React", "Redux/Context API", "PostgreSQL"],
      category: "Full Stack",
      imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=800",
      repoUrl: "https://github.com/israr-ahmed/collabsphere",
    });

    const skillList = [
      { name: "Python", category: "Backend" },
      { name: "Django", category: "Backend" },
      { name: "Django REST Framework", category: "Backend" },
      { name: "REST APIs", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "SQL", category: "Database" },
      { name: "Machine Learning", category: "AI/ML" },
      { name: "Scikit-Learn", category: "AI/ML" },
      { name: "XGBoost", category: "AI/ML" },
      { name: "Data Analysis", category: "AI/ML" },
      { name: "Pandas", category: "AI/ML" },
      { name: "React", category: "Frontend" },
      { name: "Git", category: "Tools" },
      { name: "Docker", category: "Tools" },
      { name: "Streamlit", category: "Tools" },
    ];

    for (const skill of skillList) {
      await storage.createSkill({
        name: skill.name,
        category: skill.category,
        icon: null,
      });
    }

    console.log("Database seeded successfully!");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed the DB on startup
  seedDatabase().catch(console.error);

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
