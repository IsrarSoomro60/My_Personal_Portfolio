import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface SkillCardProps {
  category: string;
  skills: { name: string; icon?: string }[];
  index: number;
}

export function SkillCard({ category, skills, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold font-display mb-6 text-foreground flex items-center gap-2">
        <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
        {category}
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill) => {
          // Dynamic icon rendering
          const IconComponent = skill.icon && (Icons as any)[skill.icon] 
            ? (Icons as any)[skill.icon] as LucideIcon 
            : Icons.Code2;

          return (
            <div key={skill.name} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
