import { useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTaskContext } from '../hooks/useTaskContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTaskContext()

  useEffect(() => {
    document.documentElement.classList.remove('light-theme', 'dark-theme')
    document.documentElement.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme')
  }, [theme])

  return (
    <button
      aria-label="Toggle theme"
      className="btn btn-theme"
      onClick={toggleTheme}
      type="button"
    >
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
    </button>
  )
}

export default ThemeToggle
