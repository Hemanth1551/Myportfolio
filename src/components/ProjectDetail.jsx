import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

// JSON data
const dispro = [
  {
    "id": "Institute Management System",
    "Description": 
      "Institute Management System is a web-based platform designed to streamline administrative operations in educational institutions. It provides role-based access for admins, staff, and students to manage courses, timetables, attendance, and salary details efficiently.",
    "Features": [
      "Admin can manage students, staff, courses, subjects, timetables, and staff salaries.",
      "Staff can manage students, take attendance, view salary details, profile, and timetable.",
      "Students can log in to view attendance records, profile details, and assigned timetables."
    ],
    "Github": "https://github.com/your-github-repo",  
    "Img": "/institute.png",
    // "Link": "https://your-live-demo-link.com",  
    "TechStack": ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    "Title": "Institute Management System"
  },
  {
    "id": "Online Shoe Booking WebApp",
    "Description": 
      "Online Shoe Booking WebApp is an e-commerce platform for purchasing shoes online. It provides role-based access for admins and users, enabling seamless product management, order tracking, and secure payments through Razorpay.",
    "Features": [
      "Admin can manage users, addresses, products, carts, orders, and payments.",
      "Users can log in, browse products, add items to the cart, and place orders.",
      "Integrated Razorpay for secure online payments.",
      "Users can view and update their profiles and saved addresses."
    ],
    "Github": "https://github.com/Hemanth1551/HeelDrive.git",  
    "Img": "/shoe.png",
    // "Link": "https://your-live-demo-link.com",  
    "TechStack": ["Spring Boot", "Java", "HTML", "CSS", "JavaScript", "Razorpay API"],
    "Title": "Online Shoe Booking WebApp"
  },
  {
    "id": "Diabetes Predictor",
    "Description": 
      "Diabetes Predictor is a machine learning-based web application that predicts whether a patient has diabetes or not based on input medical data. It is built using Flask and trained on a dataset with various health parameters.",
    "Features": [
      "Uses machine learning techniques to predict diabetes.",
      "Built with Flask for backend and a simple user-friendly web interface.",
      "Accepts patient details (e.g., glucose level, BMI, age) as input for prediction.",
      "Displays results instantly with a confidence score."
    ],
    "Github": "https://github.com/Hemanth1551/DiabetesPrediction.git",  
    "Img": "/dia.png",
    "Link": "https://diabetesprediction-mzwk.onrender.com/",  
    "TechStack": ["Flask", "Python", "Machine Learning", "HTML", "CSS"],
    "Title": "Diabetes Predictor"
  },
  {
    id: "Weather App",
    Description: "A weather forecasting web application with a clean and responsive UI. It fetches real-time weather data using a public weather API.",
    Features: [
      "Displays current weather based on user input (city/location).",
      "Real-time data fetched using API calls.",
      "Responsive and modern user interface."
    ],
    Github: "https://github.com/Hemanth1551/Prasunet_WD_05.git",
    Img: "/weather.png",
    Link: "https://prasunet-wd-05-green.vercel.app/",
    TechStack: ["HTML", "CSS", "JavaScript", "Weather API"],
    Title: "Weather App"
  },
  {
    id: "Tic Tac Toe Game",
    Description: "A simple and interactive Tic Tac Toe game for two players, developed using front-end web technologies.",
    Features: [
      "Two-player gameplay with turn-based logic.",
      "Instant win/draw detection and reset functionality.",
      "Simple and user-friendly interface."
    ],
    Github: "https://github.com/Hemanth1551/Prasunet_WD_03.git",
    Img: "/tic.png",
    Link: "https://prasunet-wd-03-two.vercel.app/",
    TechStack: ["HTML", "CSS", "JavaScript"],
    Title: "Tic Tac Toe Game"
  },
  {
    id: "Portfolio Website",
    Description: "My first personal portfolio website built from scratch to showcase my projects, skills, and internship experiences.",
    Features: [
      "Clean and responsive UI for desktop and mobile.",
      "Project and internship showcase sections.",
      "Fully custom-built using HTML, CSS, and JS."
    ],
    Github: "https://github.com/Hemanth1551/Prasunet_WD_04.git",
    Img: "/pro.png",
    Link: "https://prasunet-wd-04-eight.vercel.app/",
    TechStack: ["HTML", "CSS", "JavaScript"],
    Title: "Portfolio Website"
  },
  {
    id: "Stopwatch App",
    Description: "A simple stopwatch web application that allows users to start, stop, and record lap times.",
    Features: [
      "Start, stop, and reset timer functionality.",
      "Lap recording feature for time tracking.",
      "Minimal and clean design."
    ],
    Github: "https://github.com/Hemanth1551/Prasunet_WD_02.git",
    Img: "/stop.png",
    Link: "https://prasunet-wd-02-sepia.vercel.app/",
    TechStack: ["HTML", "CSS", "JavaScript"],
    Title: "Stopwatch App"
  },
  {
    id: "Healthcare Chatbot",
    Description: "A smart AI-powered chatbot built using Hugging Face models and Streamlit that provides basic healthcare-related information and support.",
    Features: [
      "Answers basic health-related queries using NLP.",
      "Built with Hugging Face transformers and Streamlit.",
      "Interactive and real-time responses with clean UI."
    ],
    Github: "https://github.com/Hemanth1551/AI-Health-Assistant.git",
    Img: "/chat.jpg",
    // Link: "https://your-live-demo-link.com",
    TechStack: ["Python", "Machine Learning", "Hugging Face", "Streamlit"],
    Title: "Healthcare Chatbot"
  }



];

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#3085d6',
      background: '#030014',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProject = dispro.find((p) => String(p.id) === id);
    
    if (selectedProject) {
      setProject(selectedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white">Loading Project...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-4 sm:px-0 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 rounded-xl text-white/90 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 text-base"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2 text-base text-white/50">
            <span>Projects</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90 truncate">{project.Title}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-10">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              {project.Title}
            </h1>

            <p className="text-lg text-gray-300/90">{project.Description}</p>

            <div className="flex flex-wrap gap-4">
              {project.Link ? (
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-300 rounded-xl transition-all border border-blue-500/20 hover:border-blue-500/40 text-base"
                >
                  <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Live Demo</span>
                </a>
              ) : (
                <div className="inline-flex items-center space-x-2 px-8 py-4 bg-gray-800 text-gray-400 rounded-xl border border-gray-600 text-base">
                  <ExternalLink className="w-5 h-5 opacity-50" />
                  <span>Link not available</span>
                </div>
              )}



              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 text-purple-300 rounded-xl transition-all border border-purple-500/20 hover:border-purple-500/40 text-base"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Github</span>
              </a>
            </div>

            <h3 className="text-xl font-semibold text-white/90">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.TechStack.map((tech, index) => (
                <TechBadge key={index} tech={tech} />
              ))}
            </div>
          </div>

          <div>
            <img
              src={project.Img}
              alt={project.Title}
              className="w-full rounded-2xl shadow-lg border border-white/10 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
