import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import CardInternship from "../components/CardInternship";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, Briefcase } from "lucide-react"; // ✅ Added Briefcase

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

const discer = [
  {
    Img: "tcs.jpg",
  },
  {
    Img: "cs50.jpg",
  },
  {
    Img: "it.jpg",
  },
  {
    Img: "pcap.jpg",
  },
  {
    Img: "hackerjava.jpg",
  },
  {
    Img: "google.jpg",
  },
  {
    Img: "html.jpg",
  },
  {
    Img: "servicenow.jpg",
  },
  {
    Img: "seas.jpg",
  },
  {
    Img: "css.jpg",
  },
  {
    Img: "dtae.jpg",
  },
  {
    Img: "angular.jpg",
  },
];

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
    "Img": "institute.png",
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
    "Github": "https://github.com/your-github-repo",  
    "Img": "shoe.png",
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
    "Github": "https://github.com/your-github-repo",  
    "Img": "dia.png",
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
    Github: "https://github.com/your-github-repo",
    Img: "weather.png",
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
    Github: "https://github.com/your-github-repo",
    Img: "tic.png",
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
    Github: "https://github.com/your-github-repo",
    Img: "pro.png",
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
    Github: "https://github.com/your-github-repo",
    Img: "stop.png",
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
    Github: "https://github.com/your-github-repo",
    Img: "chat.jpg",
    // Link: "https://your-live-demo-link.com",
    TechStack: ["Python", "Machine Learning", "Hugging Face", "Streamlit"],
    Title: "Healthcare Chatbot"
  }



];

// ✅ Added Internship Data
// const internships = [
//   {
//     id: "QR Code Generator",
//     Img: "tcs.jpg",
//     Title: "Software Development Intern",
//     Description: "Worked on full-stack web applications using React and Node.js.",
//     Link: "https://example.com",
//   },
//   {
//     id: "QR Code Generator",
//     Img: "tcs.jpg",
//     Title: "AI Research Intern",
//     Description: "Developed machine learning models for predictive analytics.",
//     Link: "https://example.com",
//   },
// ];

const internships = [
  {
    id: "customer-handling-gj-solutions",
    Img: "gj.jpg",
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
    Img: "webfull.jpg",
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
    Img: "andriod.jpg",
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
    Img: "wad.jpg",
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
    Img: "java.jpg",
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
    Img: "da.jpg",
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
    Img: "prasunet.jpg",
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
    Img: "tech.jpg",
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
    Img: "edu.jpg",
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
    Img: "aacharya.jpg",
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


export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllInternships, setShowAllInternships] = useState(false); // ✅ Add this line
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const initialProjects = 6; // Show only 3 projects initially
  const initialCertificates = 6; // Show only 4 certificates initially
  const initialInternships = 6; 

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={2}
          sx={{
            bgcolor: "rgba(30, 30, 46, 0.55)", // ✅ Glassmorphism background
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            padding: "8px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                fontSize: "1rem",
                fontWeight: "600",
                color: "#ffffffb3",
                textTransform: "none",
                transition: "all 0.3s",
                "&:hover": {
                  color: "#fff",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "rgba(139, 92, 246, 0.2)",
                },
              },
            }}
          >
            <Tab icon={<Code />} label="Projects" />
            <Tab icon={<Award />} label="Certificates" />
            <Tab icon={<Boxes />} label="Tech Stack" />
            <Tab icon={<Briefcase />} label="Internships" /> {/* ✅ Fixed Briefcase icon */}
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
          
          <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {dispro
              .slice(0, showAllProjects ? dispro.length : initialProjects)
              .map((pro, index) => (
                <CardProject key={index} Img={pro.Img} Title={pro.Title} Description={pro.Description} Link={pro.Link} id={pro.id} />
              ))}
          </div>

          {/* Show More/Less Button for Projects */}
          {dispro.length > initialProjects && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showAllProjects ? "Show Less Projects" : "Show All Projects"}
              </button>
            </div>
          )}
        </TabPanel>

          
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {discer
                .slice(0, showAllCertificates ? discer.length : initialCertificates)
                .map((cer, index) => (
                  <Certificate key={index} ImgSertif={cer.Img} />
                ))}
            </div>

            {/* Show More/Less Button */}
            {discer.length > initialCertificates && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAllCertificates((prev) => !prev)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {showAllCertificates ? "Show Less" : "Show All Certificates"}
                </button>
              </div>
            )}
          </TabPanel>


          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {techStacks.map((stack, index) => (
                <TechStackIcon key={index} TechStackIcon={stack.icon} Language={stack.language} />
              ))}
            </div>
          </TabPanel>

          
          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {internships
                  .slice(0, showAllInternships ? internships.length : initialInternships)
                  .map((internship, index) => (
                    <CardInternship 
                      key={index} 
                      Img={internship.Img} 
                      Title={internship.Title} 
                      Description={internship.Description} 
                      Link={internship.Link} 
                      id={internship.id} 
                    />
                  ))}
              </div>
            </div>

            {/* Show More/Less Button for Internships */}
            {internships.length > initialInternships && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAllInternships((prev) => !prev)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {showAllInternships ? "Show Less Internships" : "Show All Internships"}
                </button>
              </div>
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}><Typography>{children}</Typography></Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
