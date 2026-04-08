import { useEffect } from 'react'
import FilterBar from './components/FilterBar'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import ThemeToggle from './components/ThemeToggle'
import { TaskProvider } from './context/TaskContext'
import { useTaskContext } from './hooks/useTaskContext'

const AppShell = () => {
  const { isBooting, markBooted, stats, theme } = useTaskContext()

  useEffect(() => {
    const timeout = window.setTimeout(markBooted, 450)
    return () => window.clearTimeout(timeout)
  }, [markBooted])

  return (
    <main
      className={`app-layout ${theme === 'light' ? 'light-theme' : 'dark-theme'} ${isBooting ? 'is-booting' : ''}`}
    >
      <div className="app-bg-orb orb-a" />
      <div className="app-bg-orb orb-b" />
      <section className="dashboard-card">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Productivity Studio</p>
            <h1>Task Manager</h1>
            <p className="subtitle">
              Keep momentum with drag-and-drop planning and focused execution.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="summary-strip">
          <div className="metric">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="metric">
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
          <div className="metric">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>
        </div>

        <TaskInput />
        <FilterBar />
        <TaskList />
      </section>
    </main>
  )
}

function App() {
  return (
    <TaskProvider>
      <AppShell />
    </TaskProvider>
  )
}

export default App
