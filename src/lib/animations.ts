import { Variants, Transition } from 'framer-motion';

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base transition with reduced motion support
export const getTransition = (duration = 0.3): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 };
  }
  return {
    duration,
    ease: [0.4, 0, 0.2, 1], // Custom easing
  };
};

// GPU-accelerated transform properties
const gpuAcceleration = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    ...gpuAcceleration,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: getTransition(0.4),
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: getTransition(0.3),
  },
};

export const pageFadeVariants: Variants = {
  initial: {
    opacity: 0,
    ...gpuAcceleration,
  },
  animate: {
    opacity: 1,
    transition: getTransition(0.3),
  },
  exit: {
    opacity: 0,
    transition: getTransition(0.2),
  },
};

export const pageSlideVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20,
    ...gpuAcceleration,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: getTransition(0.4),
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: getTransition(0.3),
  },
};

export const pageScaleVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    ...gpuAcceleration,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: getTransition(0.4),
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: getTransition(0.3),
  },
};

// ============================================
// MICRO-INTERACTIONS
// ============================================

export const buttonVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: prefersReducedMotion() ? 1 : 1.05,
    transition: getTransition(0.2),
  },
  tap: {
    scale: prefersReducedMotion() ? 1 : 0.95,
    transition: getTransition(0.1),
  },
};

export const iconVariants: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: prefersReducedMotion() ? 1 : 1.1,
    rotate: prefersReducedMotion() ? 0 : 5,
    transition: getTransition(0.2),
  },
  tap: {
    scale: prefersReducedMotion() ? 1 : 0.9,
    transition: getTransition(0.1),
  },
};

export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    ...gpuAcceleration,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: getTransition(0.3),
  },
  hover: {
    scale: prefersReducedMotion() ? 1 : 1.02,
    y: prefersReducedMotion() ? 0 : -4,
    transition: getTransition(0.2),
  },
  tap: {
    scale: prefersReducedMotion() ? 1 : 0.98,
    transition: getTransition(0.1),
  },
};

export const linkVariants: Variants = {
  initial: {
    opacity: 0.8,
  },
  hover: {
    opacity: 1,
    x: prefersReducedMotion() ? 0 : 2,
    transition: getTransition(0.2),
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1,
      delayChildren: prefersReducedMotion() ? 0 : 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    ...gpuAcceleration,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: getTransition(0.3),
  },
};

export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    ...gpuAcceleration,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: getTransition(0.3),
  },
};

// ============================================
// SPECIAL ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
    ...gpuAcceleration,
  },
  animate: {
    opacity: 1,
    transition: getTransition(0.3),
  },
  exit: {
    opacity: 0,
    transition: getTransition(0.2),
  },
};

export const slideUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    ...gpuAcceleration,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: getTransition(0.3),
  },
};

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    ...gpuAcceleration,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: getTransition(0.5),
  },
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    ...gpuAcceleration,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: getTransition(0.4),
  },
};

export const slideInFromLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    ...gpuAcceleration,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: getTransition(0.4),
  },
};

export const slideInFromRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    ...gpuAcceleration,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: getTransition(0.4),
  },
};

// ============================================
// ROTATION ANIMATIONS (for Qibla compass)
// ============================================

export const rotateVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: (degrees: number) => ({
    rotate: degrees,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export const pulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: prefersReducedMotion() ? 1 : [1, 1.05, 1],
    opacity: prefersReducedMotion() ? 1 : [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// MODAL/DIALOG ANIMATIONS
// ============================================

export const modalBackdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: getTransition(0.2),
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    ...gpuAcceleration,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: getTransition(0.3),
  },
};

// ============================================
// LOADING ANIMATIONS
// ============================================

export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const skeletonVariants: Variants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getStaggerDelay = (index: number, baseDelay = 0.1): number => {
  if (prefersReducedMotion()) return 0;
  return index * baseDelay;
};

export const getSpringTransition = (stiffness = 300, damping = 30): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 };
  }
  return {
    type: 'spring',
    stiffness,
    damping,
  };
};