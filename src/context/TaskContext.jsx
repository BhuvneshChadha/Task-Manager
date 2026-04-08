import { useCallback, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TaskContext } from './taskContextInstance'

const FILTERS = {
  all: () => true,
  completed: (task) => task.completed,
  pending: (task) => !task.completed,
}

const createTask = (text) => ({
  id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  text,
  completed: false,
  createdAt: Date.now(),
})

const reorderInArray = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('task-manager-tasks', [])
  const [theme, setTheme] = useLocalStorage('task-manager-theme', 'dark')
  const [filter, setFilter] = useState('all')
  const [isBooting, setIsBooting] = useState(true)

  const filteredTasks = useMemo(() => {
    const matcher = FILTERS[filter] ?? FILTERS.all
    return tasks.filter((task) => !task.deleting && matcher(task))
  }, [filter, tasks])

  const stats = useMemo(() => {
    const activeTasks = tasks.filter((task) => !task.deleting)
    const completed = activeTasks.filter((task) => task.completed).length
    return {
      total: activeTasks.length,
      completed,
      pending: activeTasks.length - completed,
    }
  }, [tasks])

  const addTask = useCallback(
    (text) => {
      const trimmed = text.trim()
      if (!trimmed) {
        throw new Error('Task cannot be empty')
      }
      setTasks((prev) => [createTask(trimmed), ...prev])
    },
    [setTasks],
  )

  const deleteTask = useCallback(
    (taskId) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, deleting: true } : task,
        ),
      )
    },
    [setTasks],
  )

  const toggleTask = useCallback(
    (taskId) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task,
        ),
      )
    },
    [setTasks],
  )

  const filterTasks = useCallback((nextFilter) => {
    setFilter(FILTERS[nextFilter] ? nextFilter : 'all')
  }, [])

  const reorderTasks = useCallback(
    (sourceIndex, destinationIndex) => {
      if (sourceIndex === destinationIndex) {
        return
      }

      const visibleIds = filteredTasks.map((task) => task.id)
      const reorderedVisible = reorderInArray(visibleIds, sourceIndex, destinationIndex)
      const reorderedMap = new Map(
        reorderedVisible.map((id, index) => [id, index]),
      )

      setTasks((prev) => {
        const visible = prev.filter((task) => reorderedMap.has(task.id))
        const hidden = prev.filter((task) => !reorderedMap.has(task.id))
        visible.sort((a, b) => reorderedMap.get(a.id) - reorderedMap.get(b.id))
        return [...visible, ...hidden]
      })
    },
    [filteredTasks, setTasks],
  )

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  const markBooted = useCallback(() => {
    setIsBooting(false)
  }, [])

  const removeDeletedTask = useCallback(
    (taskId) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
    },
    [setTasks],
  )

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      filter,
      theme,
      isBooting,
      stats,
      addTask,
      deleteTask,
      removeDeletedTask,
      toggleTask,
      filterTasks,
      reorderTasks,
      toggleTheme,
      markBooted,
    }),
    [
      tasks,
      filteredTasks,
      filter,
      theme,
      isBooting,
      stats,
      addTask,
      deleteTask,
      removeDeletedTask,
      toggleTask,
      filterTasks,
      reorderTasks,
      toggleTheme,
      markBooted,
    ],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
