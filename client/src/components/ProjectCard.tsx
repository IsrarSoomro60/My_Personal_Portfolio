import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectResponse } from "@shared/routes";

export function ProjectCard({ project, index }: { project: ProjectResponse; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card border border-border/40 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative overflow-hidden h-48 md:h-60 bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
          <Badge className="bg-primary text-primary-foreground pointer-events-none mb-1">
            {project.category}
          </Badge>
        </div>
        <img
          src={project.imageUrl || "https://placehold.co/600x400?text=Project+Preview"}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        <div className="space-y-6 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Live Demo <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            )}
            
            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  Code <Github className="w-3.5 h-3.5" />
                </Button>
              </a>
            ) : (
               <Button variant="ghost" size="sm" className="gap-2 ml-auto text-muted-foreground" disabled>
                  Private Repo
                </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
