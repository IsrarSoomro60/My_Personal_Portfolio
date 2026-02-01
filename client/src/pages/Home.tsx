import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillCard } from "@/components/SkillCard";
import { ContactForm } from "@/components/ContactForm";
import { useProjects, useSkills } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Code2, Server, Database, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <Navigation />

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6 border border-primary/10">
              Backend & ML Engineer
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Building robust <span className="text-primary">backend systems</span> and intelligent <span className="text-primary">ML solutions</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              I'm a Software Engineering student passionate about Python, Django, and scalable architecture. 
              I transform complex problems into clean, efficient code.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="projects" smooth={true} duration={500} offset={-70}>
                <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all">
                  View Projects
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base border-2 hover:bg-secondary/50">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-10 animate-pulse" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                {/* Placeholder for professional headshot */}
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -left-4 top-20 bg-white p-4 rounded-xl shadow-lg border border-border hidden md:flex items-center gap-3"
              >
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Specialized in</p>
                  <p className="font-bold text-sm">Python & Django</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute -right-8 bottom-20 bg-white p-4 rounded-xl shadow-lg border border-border hidden md:flex items-center gap-3"
              >
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Passion for</p>
                  <p className="font-bold text-sm">Machine Learning</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-muted-foreground"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Technical Expertise" 
            subtitle="My Tech Stack" 
          />
          
          {skillsLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skillsByCategory || {}).map(([category, categorySkills], index) => (
                <SkillCard 
                  key={category} 
                  category={category} 
                  skills={categorySkills} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Portfolio" 
          />
          
          {projectsLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning & Interests */}
      <section id="learning" className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Learning & Interests" 
            subtitle="Always Evolving" 
          />
          
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Currently diving deep into <span className="font-semibold text-primary">Large Language Models</span> and exploring how to deploy scalable AI solutions. 
              I am also refining my knowledge of <span className="font-semibold text-primary">System Design</span> principles to build more resilient distributed applications.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-background border border-border">
                <Server className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold">Scalability</h4>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border">
                <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold">AI Integration</h4>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border">
                <Database className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold">Data Engineering</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/10 to-transparent" />
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/10 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <div className="mb-8">
                <span className="text-primary font-semibold tracking-wider text-sm uppercase block mb-2">
                  Get in Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Let's work together.
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-12">
                I'm currently looking for internship opportunities and entry-level backend roles. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:hello@example.com" className="font-medium hover:text-primary transition-colors">hello@example.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <a href="#" className="font-medium hover:text-primary transition-colors">linkedin.com/in/student</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <a href="#" className="font-medium hover:text-primary transition-colors">github.com/student</a>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Software Engineering Portfolio. Built with React & Django.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
