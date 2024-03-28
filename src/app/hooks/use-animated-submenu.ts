import { v4 } from '@/utils/uuid'
import { useRef, useState } from 'react'

/**
 * Custom hook for controlling an animated submenu.
 * @returns {{
 *    isOpen: boolean,
 *    close: (e: MouseEvent) => void,
 *    alternate: () => void,
 *    buttonId: string,
 *    deployEvents: () => () => void
 * }} - Object containing the state and functions for controlling the submenu.
 */
export const useAnimatedSubmenuController = () => {
  const [isOpen, setIsOpen] = useState(false)
  const id = useRef(v4())

  /**
     * Closes the submenu if the target of the event is not the submenu itself.
     * @param {MouseEvent} e - The mouse event.
     */
  const close = (e: MouseEvent) => {
    if (e.target === document.getElementById(id.current)) return
    setIsOpen(false)
  }

  /**
     * Toggles the state of the submenu between open and closed.
     */
  const alternate = () => setIsOpen(prev => !prev)

  /**
     * Deploys the event listener to close the submenu when a mouse click occurs outside of it.
     * @returns {() => void} - Function to remove the event listener.
     */
  const deployEvents = () => {
    window.addEventListener('mousedown', close)

    return () => {
      window.removeEventListener('mousedown', close)
    }
  }

  return {
    isOpen,
    close,
    alternate,
    buttonId: id.current,
    deployEvents
  }
}
