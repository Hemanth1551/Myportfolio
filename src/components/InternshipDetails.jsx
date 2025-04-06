import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

// Internship data
const internships = [
  {
    id: "customer-handling-gj-solutions",
    Img: "/gj.jpg",
    Title: "Customer Handling Internship",
    Description: "Completed a 3-month offline internship at GJ Solutions India Pvt. Ltd., handling customer communication through telecalls.",
    Link: "https://www.gjsolutions.in",  // Update if there's a specific internship page
    Features: [
      "Managed customer interactions via telecalls",
      "Developed communication and problem-solving skills",
      "Worked directly with the company in an offline setting"
    ],
    TechStack: ["Communication", "Customer Service", "Telecalling"]
  },  
  {
    id: "web fullstack eduskills",
    Img: "/webfull.jpg",
    Title: "Web Full Stack Developer",
    Description: "Completed a full-stack development program on EduSkills, covering front-end and back-end technologies to build web applications.",
    Link: "https://eduskillsfoundation.org",  // replace with actual link if you have one
    Features: [
      "Built full-stack projects from scratch",
      "Learned modern front-end and back-end web development",
      "Gained hands-on experience with databases and server-side logic"
    ],
    TechStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "MySQL", "MongoDB"]
  },
  {
    id: "android-dev-eduskills",
    Img: "/andriod.jpg",
    Title: "Android Developer Virtual Internship",
    Description: "Completed a virtual internship on EduSkills in collaboration with Google Developer portal, focused on building Android apps using Android Studio and backend integration.",
    Link: "https://developer.android.com",  // update if you have a specific program link
    Features: [
      "Built Android applications using Android Studio",
      "Integrated MySQL database for backend storage",
      "Learned fundamentals of mobile app development"
    ],
    TechStack: ["Kotlin", "Android Studio", "MySQL"]
  },
  {
    id: "react-devops-hql",
    Img: "/wad.jpg",
    Title: "Web Technologies and DevOps Internship",
    Description: "Completed a comprehensive internship on the HQL Edutech platform, covering modern web development with React and foundational DevOps practices.",
    Link: "https://hql.edutech.com",  // replace with the actual link if available
    Features: [
      "Built dynamic front-end interfaces using React",
      "Learned essential web technologies like HTML, CSS, and JavaScript",
      "Explored DevOps tools and practices for CI/CD and automation"
    ],
    TechStack: ["React", "HTML", "CSS", "JavaScript", "DevOps"]
  },
  {
    id: "java-fullstack-hql",
    Img: "/java.jpg",
    Title: "Core Java & Advanced Java Internship",
    Description: "Completed an internship on the HQL Edutech platform focused on Core and Advanced Java, covering both front-end and back-end development concepts.",
    Link: "https://hql.edutech.com",  // replace with the specific link if available
    Features: [
      "Mastered object-oriented programming with Core Java",
      "Worked on web-based applications using Advanced Java",
      "Learned both front-end and server-side Java development"
    ],
    TechStack: ["Core Java", "Advanced Java", "JSP", "Servlets"]
  },
  {
    id: "data-analytics-talentshine",
    Img: "/da.jpg",
    Title: "Data Analytics Internship",
    Description: "Completed a Data Analytics internship on the TalentShine platform, focusing on Python-based tools and libraries for data manipulation and analysis.",
    Link: "https://www.talentshine.in",  // update with exact link if you have it
    Features: [
      "Analyzed data using Python libraries such as Pandas and NumPy",
      "Worked with CSV files for real-world data projects",
      "Explored key data analytics concepts and techniques"
    ],
    TechStack: ["Python", "Pandas", "NumPy", "CSV"]
  },
  {
    id: "webdev-prasunet",
    Img: "/prasunet.jpg",
    Title: "Web Development Intern",
    Description: "Completed a Web Development Internship at PRASUNET Pvt. Ltd. Company, gaining hands-on experience in building and developing web applications.",
    Link: "https://www.prasunset.com",  // update if there's a specific internship link
    Features: [
      "Worked on web development projects",
      "Enhanced front-end and back-end development skills",
      "Developed strong coordination and communication skills"
    ],
    TechStack: ["HTML", "CSS", "JavaScript", "React", "Node.js"]
  },
  {
    id: "ai-techsaksham",
    Img: "/tech.jpg",
    Title: "AI: Transformative Learning with TechSaksham",
    Description: "Completed an AI-focused internship as part of the TechSaksham initiative by Microsoft and SAP, implemented by Edunet Foundation.",
    Link: "https://techsaksham.org",  // update if there's a specific internship link
    Features: [
      "Explored AI concepts and machine learning fundamentals",
      "Worked with real-world datasets and AI applications",
      "Gained hands-on experience with cloud-based AI tools"
    ],
    TechStack: ["Python", "AI", "Machine Learning", "Cloud Computing"]
  },
  {
    id: "ai-data-green-edunet",
    Img: "/edu.jpg",
    Title: "AI & Data Analytics with Green Skills Internship",
    Description: "Completed a four-week virtual internship on AI and Data Analytics with a focus on Green Skills, organized by Edunet Foundation in collaboration with AICTE and Shell.",
    Link: "https://www.edunetfoundation.org",  // update if there's a specific internship link
    Features: [
      "Gained hands-on experience in AI and Data Analytics",
      "Worked on a real-world project: Healthcare Prediction on Diabetic Patients using Python",
      "Developed skills in predictive analytics and sustainability-focused AI applications"
    ],
    TechStack: ["Python", "Machine Learning", "Data Analytics", "AI", "Green Tech"]
  },
  {
    id: "core-python-aacharya",
    Img: "/aacharya.jpg",
    Title: "Core Python Training",
    Description: "Completed 45 days of training on Core Python with Skill India and Aacharya.",
    Link: "https://skills.aacharya.net",  // update if there's a specific course link
    Features: [
      "Learned fundamental Python concepts",
      "Hands-on experience with Python programming",
      "Completed a structured training program under Skill India initiative"
    ],
    TechStack: ["Python", "OOPs", "Data Structures"]
  }
  
  
  
  
  
  
  
  
  

];
  

// Icons for technologies
const TECH_ICONS = {
  React: Globe,
  Python: Code,
  Azure: Package,
  CSharp: Code,
  NodeJs: Code,
  TensorFlow: Package,
  default: Package
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="px-3 py-2 bg-blue-500/10 rounded-xl border border-blue-500/30 flex items-center gap-2">
      <Icon className="w-4 h-4 text-blue-400" />
      <span className="text-sm font-medium text-blue-300">{tech}</span>
    </div>
  );
};

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedInternship = internships.find((i) => i.id === id);

    if (selectedInternship) setInternship(selectedInternship);
  }, [id]);

  if (!internship) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white">Loading Internship...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-4 sm:px-0">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 rounded-xl text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-white text-lg">{internship.Title}</div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white">{internship.Title}</h1>
            <p className="text-lg text-gray-300">{internship.Description}</p>

            <h3 className="text-xl font-semibold text-white">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {internship.Features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-white">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {internship.TechStack.map((tech, index) => (
                <TechBadge key={index} tech={tech} />
              ))}
            </div>

            <a
              href={internship.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Official Internship Page</span>
            </a>
          </div>

          <div>
            <img
              src={internship.Img}
              alt={internship.Title}
              className="w-full rounded-2xl shadow-lg border border-white/10 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
