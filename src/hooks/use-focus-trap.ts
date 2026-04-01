import { useEffect, useRef } from 'react';

/**
 * Focus trap hook for modal dialogs and popups
 * Traps keyboard focus within a container element
 * 
 * @param isActive - Whether the focus trap is active
 * @returns Ref to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(isActive: boolean) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    
    // Get all focusable elements
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store the previously focused element
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    // Handle Tab key navigation
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab: Move focus backwards
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        // Tab: Move focus forwards
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    // Handle Escape key to close
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Dispatch custom event that parent can listen to
        container.dispatchEvent(new CustomEvent('escapekeydown', { bubbles: true }));
      }
    };

    // Add event listeners
    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscapeKey);

    // Focus the first element when trap activates
    firstElement?.focus();

    // Cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscapeKey);
      
      // Restore focus to previously focused element
      previouslyFocusedElement?.focus();
    };
  }, [isActive]);

  return containerRef;
}