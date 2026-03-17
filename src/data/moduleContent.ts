export interface ModuleResource {
  title: string;
  type: "video" | "article" | "documentation" | "course";
  url: string;
  duration?: string;
  source: string;
}

export interface ModuleContent {
  topics: string[];
  videos: ModuleResource[];
  documentation: ModuleResource[];
}

// Keyed by stage title
const moduleContentMap: Record<string, ModuleContent> = {
  /* ============ WEB DEVELOPER ============ */
  "HTML, CSS & Web Fundamentals": {
    topics: ["HTML5 Semantics", "CSS Flexbox & Grid", "Responsive Design"],
    videos: [
      { title: "HTML Full Course for Beginners", type: "video", url: "https://www.youtube.com/watch?v=kUMe1FH4CHE", duration: "4h 10m", source: "Programming with Mosh" },
      { title: "CSS Flexbox & Grid Complete Guide", type: "video", url: "https://www.youtube.com/watch?v=JJSoEo8JSnc", duration: "1h 45m", source: "Traversy Media" },
      { title: "Responsive Web Design Tutorial", type: "video", url: "https://www.youtube.com/watch?v=srvUrASNj0s", duration: "55m", source: "Kevin Powell" },
      { title: "HTML5 Semantic Elements Explained", type: "video", url: "https://www.youtube.com/watch?v=kGW8Al_cga4", duration: "30m", source: "Web Dev Simplified" },
    ],
    documentation: [
      { title: "MDN Web Docs - HTML", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", source: "Mozilla" },
      { title: "MDN Web Docs - CSS", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", source: "Mozilla" },
      { title: "CSS-Tricks Complete Guide to Flexbox", type: "article", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", source: "CSS-Tricks" },
      { title: "freeCodeCamp Responsive Web Design", type: "course", url: "https://www.freecodecamp.org/learn/responsive-web-design/", source: "freeCodeCamp" },
    ],
  },
  "JavaScript Fundamentals": {
    topics: ["Variables & Functions", "DOM Manipulation", "Async/Await"],
    videos: [
      { title: "JavaScript Full Course for Beginners", type: "video", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg", duration: "3h 26m", source: "freeCodeCamp" },
      { title: "JavaScript DOM Manipulation", type: "video", url: "https://www.youtube.com/watch?v=0ik6X4DJKCc", duration: "1h 15m", source: "Traversy Media" },
      { title: "Async JavaScript Crash Course", type: "video", url: "https://www.youtube.com/watch?v=V_Kr9OSfDeU", duration: "45m", source: "Traversy Media" },
      { title: "JavaScript ES6+ Features", type: "video", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk", duration: "1h 10m", source: "Fireship" },
    ],
    documentation: [
      { title: "JavaScript.info - The Modern JavaScript Tutorial", type: "documentation", url: "https://javascript.info/", source: "JavaScript.info" },
      { title: "Eloquent JavaScript (Free Book)", type: "article", url: "https://eloquentjavascript.net/", source: "Marijn Haverbeke" },
      { title: "MDN JavaScript Guide", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", source: "Mozilla" },
    ],
  },
  "React & Modern Frontend": {
    topics: ["Components & Props", "State Management", "Hooks & Context"],
    videos: [
      { title: "React Full Course 2024", type: "video", url: "https://www.youtube.com/watch?v=SqcY0GlETPk", duration: "4h", source: "Programming with Mosh" },
      { title: "React Hooks Explained", type: "video", url: "https://www.youtube.com/watch?v=TNhaISOUy6Q", duration: "1h 30m", source: "Web Dev Simplified" },
      { title: "React State Management Guide", type: "video", url: "https://www.youtube.com/watch?v=O6P86uwfdR0", duration: "50m", source: "Fireship" },
    ],
    documentation: [
      { title: "React Official Documentation", type: "documentation", url: "https://react.dev/", source: "React Team" },
      { title: "Scrimba React Course", type: "course", url: "https://scrimba.com/learn/learnreact", source: "Scrimba" },
      { title: "React Patterns & Best Practices", type: "article", url: "https://reactpatterns.com/", source: "React Patterns" },
    ],
  },
  "Backend & APIs": {
    topics: ["Node.js", "REST APIs", "Database Design"],
    videos: [
      { title: "Node.js Full Course", type: "video", url: "https://www.youtube.com/watch?v=TlB_eWDSMt4", duration: "3h", source: "Programming with Mosh" },
      { title: "REST API Design Best Practices", type: "video", url: "https://www.youtube.com/watch?v=-MTSQjw5DrM", duration: "1h", source: "Traversy Media" },
      { title: "Database Design Fundamentals", type: "video", url: "https://www.youtube.com/watch?v=ztHopE5Wnpc", duration: "1h 20m", source: "Caleb Curry" },
    ],
    documentation: [
      { title: "Node.js Official Docs", type: "documentation", url: "https://nodejs.org/en/docs", source: "Node.js" },
      { title: "Express.js Guide", type: "documentation", url: "https://expressjs.com/en/guide/routing.html", source: "Express" },
      { title: "The Odin Project - NodeJS", type: "course", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs", source: "The Odin Project" },
    ],
  },
  "Full-Stack Project & Deployment": {
    topics: ["Authentication", "Cloud Deployment", "CI/CD"],
    videos: [
      { title: "Authentication & Authorization Explained", type: "video", url: "https://www.youtube.com/watch?v=mbsmsi7l3r4", duration: "45m", source: "Web Dev Simplified" },
      { title: "Deploy to Vercel & Netlify", type: "video", url: "https://www.youtube.com/watch?v=71wSzpLyW9k", duration: "30m", source: "Fireship" },
      { title: "CI/CD Pipeline Tutorial", type: "video", url: "https://www.youtube.com/watch?v=scEDHsr3APg", duration: "1h", source: "TechWorld with Nana" },
    ],
    documentation: [
      { title: "Vercel Deployment Docs", type: "documentation", url: "https://vercel.com/docs", source: "Vercel" },
      { title: "GitHub Actions CI/CD Guide", type: "documentation", url: "https://docs.github.com/en/actions", source: "GitHub" },
      { title: "AWS Free Tier Getting Started", type: "documentation", url: "https://aws.amazon.com/free/", source: "AWS" },
    ],
  },

  /* ============ DATA SCIENTIST ============ */
  "Python & Data Fundamentals": {
    topics: ["Python Basics", "NumPy", "Pandas"],
    videos: [
      { title: "Python for Data Science Full Course", type: "video", url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI", duration: "4h 30m", source: "freeCodeCamp" },
      { title: "NumPy Complete Tutorial", type: "video", url: "https://www.youtube.com/watch?v=QUT1VHiLmmI", duration: "1h 15m", source: "Keith Galli" },
      { title: "Pandas Tutorial for Beginners", type: "video", url: "https://www.youtube.com/watch?v=vmEHCJofslg", duration: "1h", source: "Keith Galli" },
    ],
    documentation: [
      { title: "Python Official Documentation", type: "documentation", url: "https://docs.python.org/3/", source: "Python" },
      { title: "Kaggle Learn - Python", type: "course", url: "https://www.kaggle.com/learn/python", source: "Kaggle" },
      { title: "NumPy User Guide", type: "documentation", url: "https://numpy.org/doc/stable/user/", source: "NumPy" },
      { title: "Pandas Documentation", type: "documentation", url: "https://pandas.pydata.org/docs/", source: "Pandas" },
    ],
  },
  "Data Analysis & Visualization": {
    topics: ["Matplotlib", "Seaborn", "Exploratory Data Analysis"],
    videos: [
      { title: "Matplotlib Tutorial", type: "video", url: "https://www.youtube.com/watch?v=3Xc3CA655Y4", duration: "1h 30m", source: "Corey Schafer" },
      { title: "Seaborn Crash Course", type: "video", url: "https://www.youtube.com/watch?v=6GUZXDef2U0", duration: "45m", source: "Derek Banas" },
      { title: "EDA Complete Guide", type: "video", url: "https://www.youtube.com/watch?v=fHFOANOHwh8", duration: "2h", source: "Krish Naik" },
    ],
    documentation: [
      { title: "Matplotlib User Guide", type: "documentation", url: "https://matplotlib.org/stable/users/index.html", source: "Matplotlib" },
      { title: "Seaborn Tutorial", type: "documentation", url: "https://seaborn.pydata.org/tutorial.html", source: "Seaborn" },
      { title: "Kaggle Microcourse - Data Visualization", type: "course", url: "https://www.kaggle.com/learn/data-visualization", source: "Kaggle" },
    ],
  },
  "Statistics & Probability": {
    topics: ["Probability Distributions", "Hypothesis Testing", "Regression"],
    videos: [
      { title: "Statistics Fundamentals - StatQuest", type: "video", url: "https://www.youtube.com/watch?v=qBigTkBLU6g", duration: "1h 30m", source: "StatQuest" },
      { title: "Hypothesis Testing Explained", type: "video", url: "https://www.youtube.com/watch?v=0oc49DyA3hU", duration: "45m", source: "StatQuest" },
      { title: "Regression Analysis Full Course", type: "video", url: "https://www.youtube.com/watch?v=sDv4f4s2SB8", duration: "2h", source: "freeCodeCamp" },
    ],
    documentation: [
      { title: "Khan Academy - Statistics", type: "course", url: "https://www.khanacademy.org/math/statistics-probability", source: "Khan Academy" },
      { title: "StatQuest Playlist", type: "documentation", url: "https://statquest.org/video-index/", source: "StatQuest" },
    ],
  },
  "Machine Learning Basics": {
    topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
    videos: [
      { title: "Machine Learning Full Course", type: "video", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", duration: "5h", source: "freeCodeCamp" },
      { title: "Scikit-learn Crash Course", type: "video", url: "https://www.youtube.com/watch?v=0B5eIE_1vpU", duration: "1h", source: "freeCodeCamp" },
      { title: "Model Evaluation Techniques", type: "video", url: "https://www.youtube.com/watch?v=85dtiMz9tSo", duration: "35m", source: "StatQuest" },
    ],
    documentation: [
      { title: "Scikit-learn Documentation", type: "documentation", url: "https://scikit-learn.org/stable/", source: "Scikit-learn" },
      { title: "Andrew Ng ML Course", type: "course", url: "https://www.coursera.org/learn/machine-learning", source: "Coursera" },
      { title: "Kaggle Intro to ML", type: "course", url: "https://www.kaggle.com/learn/intro-to-machine-learning", source: "Kaggle" },
    ],
  },
  "Data Science Capstone": {
    topics: ["Feature Engineering", "Model Deployment", "Data Storytelling"],
    videos: [
      { title: "Feature Engineering Techniques", type: "video", url: "https://www.youtube.com/watch?v=6WDFfaYtN6s", duration: "1h", source: "Krish Naik" },
      { title: "Deploy ML Models with Flask", type: "video", url: "https://www.youtube.com/watch?v=UbCWoMf80PY", duration: "1h 20m", source: "Krish Naik" },
      { title: "Data Storytelling Best Practices", type: "video", url: "https://www.youtube.com/watch?v=8EMW7io4rSI", duration: "30m", source: "TED" },
    ],
    documentation: [
      { title: "Kaggle Competitions", type: "course", url: "https://www.kaggle.com/competitions", source: "Kaggle" },
      { title: "Towards Data Science Articles", type: "article", url: "https://towardsdatascience.com/", source: "Medium" },
    ],
  },

  /* ============ AI ENGINEER ============ */
  "Programming & Math Foundations": {
    topics: ["Python for AI", "Linear Algebra", "Probability Basics"],
    videos: [
      { title: "Python for AI & ML", type: "video", url: "https://www.youtube.com/watch?v=7eh4d6sabA0", duration: "5h", source: "Programming with Mosh" },
      { title: "Linear Algebra Full Course", type: "video", url: "https://www.youtube.com/watch?v=JnTa9XtvmfI", duration: "3h", source: "3Blue1Brown" },
      { title: "Probability for ML", type: "video", url: "https://www.youtube.com/watch?v=Mnk_oUrgppM", duration: "1h", source: "StatQuest" },
    ],
    documentation: [
      { title: "MIT OpenCourseWare - Linear Algebra", type: "course", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", source: "MIT" },
      { title: "Khan Academy - Linear Algebra", type: "course", url: "https://www.khanacademy.org/math/linear-algebra", source: "Khan Academy" },
    ],
  },
  "Machine Learning Fundamentals": {
    topics: ["Regression", "Classification", "Model Evaluation"],
    videos: [
      { title: "Machine Learning Course", type: "video", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", duration: "5h", source: "freeCodeCamp" },
      { title: "Classification Algorithms Explained", type: "video", url: "https://www.youtube.com/watch?v=TJveOYsK6MY", duration: "45m", source: "StatQuest" },
      { title: "Model Evaluation & Metrics", type: "video", url: "https://www.youtube.com/watch?v=85dtiMz9tSo", duration: "35m", source: "StatQuest" },
    ],
    documentation: [
      { title: "Scikit-learn Docs", type: "documentation", url: "https://scikit-learn.org/stable/", source: "Scikit-learn" },
      { title: "Coursera ML Course by Andrew Ng", type: "course", url: "https://www.coursera.org/learn/machine-learning", source: "Coursera" },
    ],
  },
  "Deep Learning": {
    topics: ["Neural Networks", "TensorFlow", "PyTorch", "CNN", "RNN"],
    videos: [
      { title: "Deep Learning Full Course", type: "video", url: "https://www.youtube.com/watch?v=VyWAvY2CF9c", duration: "6h", source: "freeCodeCamp" },
      { title: "Neural Networks Explained", type: "video", url: "https://www.youtube.com/watch?v=aircAruvnKk", duration: "20m", source: "3Blue1Brown" },
      { title: "PyTorch Full Tutorial", type: "video", url: "https://www.youtube.com/watch?v=V_xro1bcAuA", duration: "4h", source: "Patrick Loeber" },
      { title: "TensorFlow 2.0 Course", type: "video", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk", duration: "7h", source: "freeCodeCamp" },
    ],
    documentation: [
      { title: "DeepLearning.ai Courses", type: "course", url: "https://www.deeplearning.ai/", source: "DeepLearning.ai" },
      { title: "PyTorch Official Tutorials", type: "documentation", url: "https://pytorch.org/tutorials/", source: "PyTorch" },
      { title: "TensorFlow Documentation", type: "documentation", url: "https://www.tensorflow.org/learn", source: "TensorFlow" },
    ],
  },
  "Advanced AI Systems": {
    topics: ["Computer Vision", "Natural Language Processing", "Transformers"],
    videos: [
      { title: "NLP with Transformers Course", type: "video", url: "https://www.youtube.com/watch?v=QEaBAZQCtwE", duration: "2h", source: "HuggingFace" },
      { title: "Computer Vision Full Course", type: "video", url: "https://www.youtube.com/watch?v=01sAkU_NvOY", duration: "4h", source: "freeCodeCamp" },
      { title: "Attention & Transformers Explained", type: "video", url: "https://www.youtube.com/watch?v=SZorAJ4I-sA", duration: "40m", source: "StatQuest" },
    ],
    documentation: [
      { title: "HuggingFace Documentation", type: "documentation", url: "https://huggingface.co/docs", source: "HuggingFace" },
      { title: "Fast.ai Course", type: "course", url: "https://www.fast.ai/", source: "Fast.ai" },
    ],
  },
  "AI Deployment & MLOps": {
    topics: ["Model Deployment", "Docker", "Model Monitoring"],
    videos: [
      { title: "Docker for ML Engineers", type: "video", url: "https://www.youtube.com/watch?v=pTFZFxd4hOI", duration: "2h", source: "Programming with Mosh" },
      { title: "MLOps Full Course", type: "video", url: "https://www.youtube.com/watch?v=9BgIDqAzfuA", duration: "3h", source: "freeCodeCamp" },
      { title: "Deploy AI Models to Production", type: "video", url: "https://www.youtube.com/watch?v=H73m9_cTuAI", duration: "1h", source: "Patrick Loeber" },
    ],
    documentation: [
      { title: "AWS Machine Learning Docs", type: "documentation", url: "https://aws.amazon.com/machine-learning/", source: "AWS" },
      { title: "MLflow Documentation", type: "documentation", url: "https://mlflow.org/docs/latest/index.html", source: "MLflow" },
    ],
  },

  /* ============ MACHINE LEARNING ENGINEER ============ */
  "Python & Math Foundations": {
    topics: ["Python Programming", "Linear Algebra", "Statistics"],
    videos: [
      { title: "Python Programming Full Course", type: "video", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", duration: "4h 26m", source: "freeCodeCamp" },
      { title: "Mathematics for ML", type: "video", url: "https://www.youtube.com/watch?v=JnTa9XtvmfI", duration: "3h", source: "3Blue1Brown" },
      { title: "Statistics for Data Science", type: "video", url: "https://www.youtube.com/watch?v=qBigTkBLU6g", duration: "1h 30m", source: "StatQuest" },
    ],
    documentation: [
      { title: "Khan Academy - Statistics & Probability", type: "course", url: "https://www.khanacademy.org/math/statistics-probability", source: "Khan Academy" },
      { title: "Python Official Docs", type: "documentation", url: "https://docs.python.org/3/", source: "Python" },
    ],
  },
  "Machine Learning Algorithms": {
    topics: ["Regression Models", "Decision Trees", "Clustering"],
    videos: [
      { title: "ML Algorithms Explained", type: "video", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", duration: "5h", source: "freeCodeCamp" },
      { title: "Decision Trees & Random Forests", type: "video", url: "https://www.youtube.com/watch?v=7VeUPuFGJHk", duration: "1h", source: "StatQuest" },
      { title: "K-Means Clustering Tutorial", type: "video", url: "https://www.youtube.com/watch?v=4b5d3muPQmA", duration: "30m", source: "StatQuest" },
    ],
    documentation: [
      { title: "Scikit-learn Supervised Learning", type: "documentation", url: "https://scikit-learn.org/stable/supervised_learning.html", source: "Scikit-learn" },
      { title: "Andrew Ng ML Course", type: "course", url: "https://www.coursera.org/learn/machine-learning", source: "Coursera" },
    ],
  },
  "ML Systems & Optimization": {
    topics: ["Feature Engineering", "Hyperparameter Tuning", "Model Optimization"],
    videos: [
      { title: "Feature Engineering Techniques", type: "video", url: "https://www.youtube.com/watch?v=6WDFfaYtN6s", duration: "1h", source: "Krish Naik" },
      { title: "Hyperparameter Tuning Guide", type: "video", url: "https://www.youtube.com/watch?v=5nYqK-HaoKY", duration: "40m", source: "StatQuest" },
      { title: "ML Pipeline Optimization", type: "video", url: "https://www.youtube.com/watch?v=Mwcm_sDmjFE", duration: "1h 15m", source: "Google Developers" },
    ],
    documentation: [
      { title: "Google ML Crash Course", type: "course", url: "https://developers.google.com/machine-learning/crash-course", source: "Google" },
      { title: "Kaggle Feature Engineering", type: "course", url: "https://www.kaggle.com/learn/feature-engineering", source: "Kaggle" },
    ],
  },
  "Production ML & Deployment": {
    topics: ["MLOps", "Docker", "Model Serving"],
    videos: [
      { title: "MLOps Complete Tutorial", type: "video", url: "https://www.youtube.com/watch?v=9BgIDqAzfuA", duration: "3h", source: "freeCodeCamp" },
      { title: "Docker for Beginners", type: "video", url: "https://www.youtube.com/watch?v=pTFZFxd4hOI", duration: "2h", source: "Programming with Mosh" },
      { title: "Serve ML Models with FastAPI", type: "video", url: "https://www.youtube.com/watch?v=h5wLuVDr0oc", duration: "1h", source: "Patrick Loeber" },
    ],
    documentation: [
      { title: "Kubeflow Documentation", type: "documentation", url: "https://www.kubeflow.org/docs/", source: "Kubeflow" },
      { title: "AWS SageMaker Guide", type: "documentation", url: "https://docs.aws.amazon.com/sagemaker/", source: "AWS" },
    ],
  },

  /* ============ DEFAULT ROADMAP ============ */
  "Foundation & Core Concepts": {
    topics: ["Core Theory", "Basic Tools", "Environment Setup"],
    videos: [
      { title: "Computer Science Fundamentals", type: "video", url: "https://www.youtube.com/watch?v=8mAITcNt710", duration: "2h", source: "freeCodeCamp" },
      { title: "Developer Tools Setup Guide", type: "video", url: "https://www.youtube.com/watch?v=UB1O30fR-EE", duration: "45m", source: "Traversy Media" },
    ],
    documentation: [
      { title: "Getting Started Guide", type: "documentation", url: "https://www.freecodecamp.org/", source: "freeCodeCamp" },
    ],
  },
  "Intermediate Skills": {
    topics: ["Advanced Concepts", "Best Practices", "Testing"],
    videos: [
      { title: "Software Engineering Best Practices", type: "video", url: "https://www.youtube.com/watch?v=jS4aFq5-91M", duration: "1h 30m", source: "Fireship" },
      { title: "Testing Fundamentals", type: "video", url: "https://www.youtube.com/watch?v=u6QfIXgjwGQ", duration: "1h", source: "Fireship" },
    ],
    documentation: [
      { title: "Clean Code Principles", type: "article", url: "https://www.freecodecamp.org/news/clean-coding-for-beginners/", source: "freeCodeCamp" },
    ],
  },
  "Advanced Topics": {
    topics: ["Architecture", "Performance", "Security"],
    videos: [
      { title: "System Design Fundamentals", type: "video", url: "https://www.youtube.com/watch?v=nu_pCVPKzTk", duration: "2h", source: "freeCodeCamp" },
      { title: "Web Security Basics", type: "video", url: "https://www.youtube.com/watch?v=WlmKwIe9z1Q", duration: "1h", source: "Academind" },
    ],
    documentation: [
      { title: "OWASP Security Guide", type: "documentation", url: "https://owasp.org/www-project-web-security-testing-guide/", source: "OWASP" },
    ],
  },
  "Portfolio & Job Preparation": {
    topics: ["Portfolio Building", "Interview Prep", "Networking"],
    videos: [
      { title: "Build a Developer Portfolio", type: "video", url: "https://www.youtube.com/watch?v=4UZrsTqkcW4", duration: "1h", source: "Traversy Media" },
      { title: "Coding Interview Prep", type: "video", url: "https://www.youtube.com/watch?v=8hly31xKli0", duration: "2h", source: "NeetCode" },
    ],
    documentation: [
      { title: "LeetCode Problems", type: "course", url: "https://leetcode.com/", source: "LeetCode" },
      { title: "LinkedIn Learning", type: "course", url: "https://www.linkedin.com/learning/", source: "LinkedIn" },
    ],
  },
};

export function getModuleContent(stageTitle: string): ModuleContent {
  return moduleContentMap[stageTitle] || {
    topics: [],
    videos: [
      { title: `${stageTitle} - Introduction`, type: "video", url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(stageTitle), duration: "Varies", source: "YouTube" },
    ],
    documentation: [
      { title: `${stageTitle} - Resources`, type: "documentation", url: "https://www.google.com/search?q=" + encodeURIComponent(stageTitle + " tutorial"), source: "Google" },
    ],
  };
}
