import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * AnimatedSection Component - Wrapper for scroll animations
 */
const AnimatedSection = forwardRef(({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  as = 'section',
  ...props
}, ref) => {
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    slideUp: {
      hidden: { y: '100%' },
      visible: { y: 0 },
    },
  };

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  const Component = motion[as] || motion.section;

  return (
    <Component
      ref={ref}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedAnimation}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      {...props}
    >
      {children}
    </Component>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

/**
 * StaggerContainer Component - For staggered children animations
 */
export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  as = 'div',
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * StaggerItem Component - Children of StaggerContainer
 */
export const StaggerItem = forwardRef(({
  children,
  className = '',
  animation = 'fadeInUp',
  ...props
}, ref) => {
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={animations[animation] || animations.fadeInUp}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

StaggerItem.displayName = 'StaggerItem';

export default AnimatedSection;
