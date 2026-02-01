import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Seed Projects
    await storage.createProject({
      title: "Django E-commerce Platform",
      description: "A comprehensive e-commerce solution built with Django and Django REST Framework. Features include user authentication, product catalog management, shopping cart functionality, and Stripe payment integration. Solved the challenge of handling concurrent orders and inventory updates.",
      technologies: ["Python", "Django", "PostgreSQL", "Redis", "Stripe API"],
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
      repoUrl: "https://github.com/username/django-ecommerce",
    });

    await storage.createProject({
      title: "Predictive Maintenance Model",
      description: "Machine Learning model designed to predict equipment failures before they occur. Utilized Random Forest and XGBoost algorithms on sensor data. Achieved 92% accuracy in detecting anomalies, significantly reducing potential downtime for industrial machinery.",
      technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Jupyter"],
      category: "Machine Learning",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      repoUrl: "https://github.com/username/predictive-maintenance",
    });

    await storage.createProject({
      title: "Real-time Task Management",
      description: "A collaborative task management tool enabling teams to organize workflows in real-time. Built with a Flask backend and React frontend, using WebSockets for live updates. Implemented role-based access control and efficient state management.",
      technologies: ["Python", "Flask", "React", "Socket.IO", "SQLAlchemy"],
      category: "Full Stack",
      imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=800",
      repoUrl: "https://github.com/username/task-manager",
    });

    // Seed Skills
    const skillList = [
      { name: "Python", category: "Backend" },
      { name: "Django", category: "Backend" },
      { name: "FastAPI", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Machine Learning", category: "AI/ML" },
      { name: "Scikit-Learn", category: "AI/ML" },
      { name: "TensorFlow", category: "AI/ML" },
      { name: "Docker", category: "DevOps" },
      { name: "Git", category: "Tools" },
      { name: "React", category: "Frontend" },
    ];

    for (const skill of skillList) {
      await storage.createSkill({
        name: skill.name,
        category: skill.category,
        icon: null
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
