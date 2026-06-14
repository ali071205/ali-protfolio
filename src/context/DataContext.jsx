import { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext(null)

// --- Initial Seed Data ---
const initialProjects = [
  {
    id: 1,
    name: "TalkZone Chat App",
    description: "A real-time chat application with group messaging and file sharing.",
    tech_stack: ["React", "Node.js", "Socket.io"],
    github_url: "https://github.com/ali071205/talkzone",
    demo_url: "",
    image_url: "",
    category: "Web",
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "2D Platformer Game",
    description: "A fast-paced platformer game built from scratch using C# and Unity.",
    tech_stack: ["C#", "Unity", "Game Dev"],
    github_url: "https://github.com/ali071205/platformer",
    demo_url: "",
    image_url: "",
    category: "Game",
    featured: true,
    created_at: new Date().toISOString()
  }
]

const initialSkills = [
  { id: 1, name: "React.js", category: "Frontend", level: 85, icon: "code" },
  { id: 2, name: "JavaScript", category: "Languages", level: 90, icon: "javascript" },
  { id: 3, name: "Node.js", category: "Backend", level: 75, icon: "terminal" },
  { id: 4, name: "C++", category: "Languages", level: 80, icon: "data_object" },
  { id: 5, name: "C#", category: "Languages", level: 70, icon: "architecture" }
]

const initialExperience = [
  {
    id: 1,
    title: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2023 - Present",
    type: "Freelance",
    bullets: [
      "Built multiple web applications for local businesses.",
      "Optimized website SEO and improved loading speeds by 40%."
    ],
    created_at: new Date().toISOString()
  }
]

const initialAbout = {
  id: 1,
  bio: "I'm Ali Ahmad Raza Sheikh — a Fullstack Web Developer and BCA student with a passion for building robust digital experiences and a long-term goal of becoming a game developer.",
  bio_extended: "Currently in my 2nd year of BCA. I love turning complex problems into elegant, user-friendly solutions. When I'm not coding web apps, I'm exploring game development logic.",
  email: "aliahmad071205@gmail.com",
  github: "https://github.com/ali071205",
  linkedin: "https://linkedin.com/in/ali-ahmad-raza-sheikh-760aa335b",
  profile_image: "",
  available: true
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [about, setAbout] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  // Initialize from local storage or use seed data
  useEffect(() => {
    const loadData = () => {
      const storedProjects = localStorage.getItem('portfolio_projects')
      const storedSkills = localStorage.getItem('portfolio_skills')
      const storedExperience = localStorage.getItem('portfolio_experience')
      const storedAbout = localStorage.getItem('portfolio_about')
      const storedMessages = localStorage.getItem('portfolio_messages')

      setProjects(storedProjects ? JSON.parse(storedProjects) : initialProjects)
      setSkills(storedSkills ? JSON.parse(storedSkills) : initialSkills)
      setExperience(storedExperience ? JSON.parse(storedExperience) : initialExperience)
      setAbout(storedAbout ? JSON.parse(storedAbout) : initialAbout)
      setMessages(storedMessages ? JSON.parse(storedMessages) : [])
      
      setLoading(false)
    }

    loadData()
  }, [])

  // Helper to save to local storage
  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const fetchAll = async () => { /* No-op for local storage */ }
  const fetchMessages = async () => { /* No-op for local storage */ }

  // Projects CRUD
  const addProject = async (project) => {
    const newProject = { ...project, id: Date.now(), created_at: new Date().toISOString() }
    const updated = [newProject, ...projects]
    setProjects(updated)
    saveToStorage('portfolio_projects', updated)
    return newProject
  }

  const updateProject = async (id, updates) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p)
    setProjects(updated)
    saveToStorage('portfolio_projects', updated)
    return updated.find(p => p.id === id)
  }

  const deleteProject = async (id) => {
    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    saveToStorage('portfolio_projects', updated)
  }

  // Skills CRUD
  const addSkill = async (skill) => {
    const newSkill = { ...skill, id: Date.now() }
    const updated = [newSkill, ...skills]
    setSkills(updated)
    saveToStorage('portfolio_skills', updated)
    return newSkill
  }

  const updateSkill = async (id, updates) => {
    const updated = skills.map(s => s.id === id ? { ...s, ...updates } : s)
    setSkills(updated)
    saveToStorage('portfolio_skills', updated)
    return updated.find(s => s.id === id)
  }

  const deleteSkill = async (id) => {
    const updated = skills.filter(s => s.id !== id)
    setSkills(updated)
    saveToStorage('portfolio_skills', updated)
  }

  // About update
  const updateAbout = async (updates) => {
    const updated = { ...about, ...updates }
    setAbout(updated)
    saveToStorage('portfolio_about', updated)
    return updated
  }

  // Experience CRUD
  const addExperience = async (exp) => {
    const newExp = { ...exp, id: Date.now(), created_at: new Date().toISOString() }
    const updated = [newExp, ...experience]
    setExperience(updated)
    saveToStorage('portfolio_experience', updated)
    return newExp
  }

  const deleteExperience = async (id) => {
    const updated = experience.filter(e => e.id !== id)
    setExperience(updated)
    saveToStorage('portfolio_experience', updated)
  }

  // Send message (contact form)
  const sendMessage = async (msgData) => {
    const newMessage = { ...msgData, id: Date.now(), read: false, created_at: new Date().toISOString() }
    const updated = [newMessage, ...messages]
    setMessages(updated)
    saveToStorage('portfolio_messages', updated)
    return newMessage
  }

  return (
    <DataContext.Provider value={{
      projects, skills, experience, about, messages, loading,
      fetchAll, fetchMessages,
      addProject, updateProject, deleteProject,
      addSkill, updateSkill, deleteSkill,
      updateAbout,
      addExperience, deleteExperience,
      sendMessage,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
