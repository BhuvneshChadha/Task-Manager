import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { FiClipboard } from 'react-icons/fi'
import { useTaskContext } from '../hooks/useTaskContext'
import TaskItem from './TaskItem'

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => setEnabled(true))
    return () => {
      window.cancelAnimationFrame(animationFrame)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

const TaskList = () => {
  const { filteredTasks, reorderTasks, filter } = useTaskContext()

  const onDragEnd = useCallback(
    (result) => {
      if (
        !result.destination ||
        result.source.index === result.destination.index
      ) {
        return
      }
      reorderTasks(result.source.index, result.destination.index)
    },
    [reorderTasks],
  )

  if (!filteredTasks.length) {
    return (
      <div className="empty-state">
        <FiClipboard />
        <h3>{filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}</h3>
        <p>Create your first task and keep your workflow on track.</p>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="task-list">
        {(provided) => (
          <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
            {filteredTasks.map((task, index) => (
              <Draggable draggableId={task.id} index={index} key={task.id}>
                {(draggableProvided, snapshot) => {
                  const taskNode = (
                    <TaskItem
                      task={task}
                      innerRef={draggableProvided.innerRef}
                      draggableProps={draggableProvided.draggableProps}
                      dragHandleProps={draggableProvided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
                  )

                  if (snapshot.isDragging && typeof document !== 'undefined') {
                    return createPortal(taskNode, document.body)
                  }

                  return taskNode
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}

export default TaskList
