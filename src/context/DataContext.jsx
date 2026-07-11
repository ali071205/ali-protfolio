import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [trophies, setTrophies] = useState([])
  const [experience, setExperience] = useState([])
  const [about, setAbout] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    try {
      setLoading(true)
      
      const [
        { data: projectsData },
        { data: skillsData },
        { data: trophiesData },
        { data: experienceData },
        { data: aboutData }
      ] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('id', { ascending: true }),
        supabase.from('trophies').select('*').order('id', { ascending: true }),
        supabase.from('experience').select('*').order('created_at', { ascending: false }),
        supabase.from('about').select('*').single()
      ])

      setProjects(projectsData || [])
      setSkills(skillsData || [])
      setTrophies(trophiesData || [])
      setExperience(experienceData || [])
      setAbout(aboutData || null)
    } catch (error) {
      console.error('Error fetching data from Supabase:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async () => {
    try {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
      if (data) setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  // Projects CRUD
  const addProject = async (project) => {
    const { data, error } = await supabase.from('projects').insert([project]).select()
    if (error) throw error
    setProjects([data[0], ...projects])
    return data[0]
  }

  const updateProject = async (id, updates) => {
    const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select()
    if (error) throw error
    setProjects(projects.map(p => p.id === id ? data[0] : p))
    return data[0]
  }

  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
    setProjects(projects.filter(p => p.id !== id))
  }

  // Skills CRUD
  const addSkill = async (skill) => {
    const { data, error } = await supabase.from('skills').insert([skill]).select()
    if (error) throw error
    setSkills([...skills, data[0]])
    return data[0]
  }

  const updateSkill = async (id, updates) => {
    const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select()
    if (error) throw error
    setSkills(skills.map(s => s.id === id ? data[0] : s))
    return data[0]
  }

  const deleteSkill = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) throw error
    setSkills(skills.filter(s => s.id !== id))
  }

  // Trophies CRUD
  const addTrophy = async (trophy) => {
    const { data, error } = await supabase.from('trophies').insert([trophy]).select()
    if (error) throw error
    setTrophies([...trophies, data[0]])
    return data[0]
  }

  const updateTrophy = async (id, updates) => {
    const { data, error } = await supabase.from('trophies').update(updates).eq('id', id).select()
    if (error) throw error
    setTrophies(trophies.map(t => t.id === id ? data[0] : t))
    return data[0]
  }

  const deleteTrophy = async (id) => {
    const { error } = await supabase.from('trophies').delete().eq('id', id)
    if (error) throw error
    setTrophies(trophies.filter(t => t.id !== id))
  }

  // About update
  const updateAbout = async (updates) => {
    let idToUpdate = about?.id || 1
    const { data, error } = await supabase
      .from('about')
      .upsert({ id: idToUpdate, ...updates })
      .select()
    if (error) throw error
    setAbout(data[0])
    return data[0]
  }

  // Experience CRUD
  const addExperience = async (exp) => {
    const { data, error } = await supabase.from('experience').insert([exp]).select()
    if (error) throw error
    setExperience([data[0], ...experience])
    return data[0]
  }

  const updateExperience = async (id, updates) => {
    const { data, error } = await supabase.from('experience').update(updates).eq('id', id).select()
    if (error) throw error
    setExperience(experience.map(e => e.id === id ? data[0] : e))
    return data[0]
  }

  const deleteExperience = async (id) => {
    const { error } = await supabase.from('experience').delete().eq('id', id)
    if (error) throw error
    setExperience(experience.filter(e => e.id !== id))
  }

  // Send message (contact form)
  const sendMessage = async (msgData) => {
    const { data, error } = await supabase.from('messages').insert([msgData]).select()
    if (error) throw error
    setMessages([data[0], ...messages])
    return data[0]
  }

  return (
    <DataContext.Provider value={{
      projects, skills, trophies, experience, about, messages, loading,
      fetchAll, fetchMessages,
      addProject, updateProject, deleteProject,
      addSkill, updateSkill, deleteSkill,
      addTrophy, updateTrophy, deleteTrophy,
      updateAbout,
      addExperience, updateExperience, deleteExperience,
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
