export const skills = [

  // Programming Languages
  { name: 'Java', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'Kotlin', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'R', category: 'languages' },
  { name: 'HTML5', category: 'languages' },
  { name: 'CSS3', category: 'languages' },


  // Software Engineering
  { name: 'Object-Oriented Programming (OOP)', category: 'software-engineering' },
  { name: 'Object-Oriented Analysis & Design (OOAD)', category: 'software-engineering' },
  { name: 'Data Structures & Algorithms', category: 'software-engineering' },
  { name: 'Design Patterns', category: 'software-engineering' },
  { name: 'Software Architecture', category: 'software-engineering' },
  { name: 'Microservices Architecture', category: 'software-engineering' },
  { name: 'Software Development Lifecycle (SDLC)', category: 'software-engineering' },
  { name: 'RESTful API Design', category: 'software-engineering' },
  { name: 'Agile & Scrum', category: 'software-engineering' },


  // Backend Development
  { name: 'Spring Boot 3', category: 'backend' },
  { name: 'Spring Security', category: 'backend' },
  { name: 'Spring Data JPA', category: 'backend' },
  { name: 'Hibernate', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'RESTful APIs', category: 'backend' },
  { name: 'Authentication & Authorization', category: 'backend' },
  { name: 'WebSocket', category: 'backend' },
  { name: 'MQTT', category: 'backend' },


  // Frontend Development
  { name: 'Vue.js 3', category: 'frontend' },
  { name: 'React.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Pinia', category: 'frontend' },


  // Artificial Intelligence
  { name: 'Large Language Models (LLMs)', category: 'ai' },
  { name: 'Generative AI', category: 'ai' },
  { name: 'AI Agent Development', category: 'ai' },
  { name: 'Multi-Agent Systems', category: 'ai' },
  { name: 'Prompt Engineering', category: 'ai' },
  { name: 'LangChain', category: 'ai' },
  { name: 'Retrieval-Augmented Generation (RAG)', category: 'ai' },
  { name: 'Machine Learning', category: 'ai' },
  { name: 'Deep Learning', category: 'ai' },
  { name: 'PyTorch', category: 'ai' },
  { name: 'TensorFlow', category: 'ai' },
  { name: 'Hugging Face', category: 'ai' },
  { name: 'OpenCV', category: 'ai' },
  { name: 'YOLO', category: 'ai' },
  { name: 'Ollama', category: 'ai' },
{ name: 'Chinese LLM Models (DeepSeek, Qwen 通义千问, Kimi 月之暗面, Hunyuan 腾讯混元, GLM 智谱AI)', category: 'ai' },


  // Databases
  { name: 'MySQL', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'SQLite', category: 'database' },
  { name: 'Database Design', category: 'database' },
  { name: 'Data Modeling', category: 'database' },


  // Testing & Quality Assurance
  { name: 'Software Testing', category: 'testing' },
  { name: 'Black Box Testing', category: 'testing' },
  { name: 'White Box Testing', category: 'testing' },
  { name: 'Unit Testing', category: 'testing' },
  { name: 'Integration Testing', category: 'testing' },
  { name: 'API Testing', category: 'testing' },
  { name: 'Test Case Design', category: 'testing' },
  { name: 'JUnit', category: 'testing' },
  { name: 'Selenium', category: 'testing' },
  { name: 'Postman', category: 'testing' },


  // DevOps & Development Tools
  { name: 'Git', category: 'devops' },
  { name: 'GitHub', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  { name: 'Linux / Ubuntu', category: 'devops' },
  { name: 'CI/CD Basics', category: 'devops' },
  { name: 'Visual Studio Code', category: 'devops' },
  { name: 'IntelliJ IDEA', category: 'devops' },
  { name: 'PyCharm', category: 'devops' },
  { name: 'Android Studio', category: 'devops' },
  { name: 'HBuilder', category: 'devops' },
  { name: 'VMware', category: 'devops' },
  { name: 'Draw.io', category: 'devops' },
  { name: 'n8n', category: 'devops' },
  

  // Mobile Development
  { name: 'Android Development (Java / Kotlin )', category: 'mobile' },

  { name: 'WeChat Mini Program (微信小程序)', category: 'mobile' },
  { name: 'Douyin Mini Program (抖音小程序)', category: 'mobile' },


  // AI Development Tools
  { name: 'GitHub Copilot', category: 'ai-tools' },
  { name: 'Google Gemini', category: 'ai-tools' },
  { name: 'Codex', category: 'ai-tools' },
  { name: 'CodeBuddy', category: 'ai-tools' },
  { name: 'AI-Assisted Programming', category: 'ai-tools' },


  // Design & Collaboration
  { name: 'Figma', category: 'design' },
   { name: 'Canva', category: 'design' },
  { name: 'Technical Writing', category: 'design' },
  { name: 'Project Management', category: 'design' },
  { name: 'Leadership', category: 'design' },
  { name: 'Cross-Cultural Collaboration', category: 'design' },
];


export const skillCategories = [
  { id: 'languages', label: 'Programming Languages' },
  { id: 'software-engineering', label: 'Software Engineering' },
  { id: 'backend', label: 'Backend Development' },
  { id: 'frontend', label: 'Frontend Development' },
  { id: 'ai', label: 'Artificial Intelligence' },
  { id: 'database', label: 'Databases' },
  { id: 'testing', label: 'Testing & Quality Assurance' },
  { id: 'devops', label: 'DevOps & Development Tools' },
  { id: 'mobile', label: 'Mobile Development' },
  { id: 'ai-tools', label: 'AI Development Tools' },
  { id: 'design', label: 'Design & Collaboration' },
];


export const softSkills = [
  { name: 'Team Leadership', icon: 'Users' },
  { name: 'Problem Solving', icon: 'Lightbulb' },
  { name: 'Research', icon: 'Search' },
  { name: 'International Collaboration', icon: 'Globe' },
  { name: 'Project Management', icon: 'Kanban' },
  { name: 'Technical Communication', icon: 'MessageSquare' },
  { name: 'Innovation', icon: 'Rocket' },
];

export const groupedSkills = skillCategories.map((cat) => ({
  title: cat.label,
  skills: skills.filter((s) => s.category === cat.id).map((s) => s.name),
}));
