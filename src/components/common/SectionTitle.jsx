import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

/**
 * SectionTitle Component - Consistent section headings with animation
 */
const SectionTitle = ({
  subtitle,
  decorativeText,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
  animated = true,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const Wrapper = animated ? motion.div : 'div';
  const Item = animated ? motion.div : 'div';

  const wrapperMotionProps = animated
    ? {
        variants: containerVariants,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
      }
    : {};

  return (
    <Wrapper
      className={cn(
        'max-w-3xl mb-12 md:mb-16',
        alignmentClasses[align],
        className
      )}
      {...wrapperMotionProps}
    >
      {/* Subtitle */}
      {subtitle && (
        <Item {...(animated ? { variants: itemVariants } : {})}>
          <span
            className={cn(
              'inline-block text-sm tracking-[0.2em] uppercase font-medium mb-4',
              dark ? 'text-primary-400' : 'text-primary-500'
            )}
          >
            {subtitle}
          </span>
        </Item>
      )}

      {/* Decorative Text */}
      {decorativeText && (
        <Item {...(animated ? { variants: itemVariants } : {})}>
          <span
            className={cn(
              'block font-serif italic text-4xl md:text-5xl lg:text-6xl mb-2',
              dark ? 'text-white/10' : 'text-gray-200/80'
            )}
          >
            {decorativeText}
          </span>
        </Item>
      )}

      {/* Main Title */}
      {title && (
        <Item {...(animated ? { variants: itemVariants } : {})}>
          <h2
            className={cn(
              'font-serif text-3xl md:text-4xl lg:text-5xl leading-tight',
              decorativeText && '-mt-6 md:-mt-8 relative z-10',
              dark ? 'text-white' : 'text-gray-900'
            )}
          >
            {title}
          </h2>
        </Item>
      )}

      {/* Description */}
      {description && (
        <Item {...(animated ? { variants: itemVariants } : {})}>
          <p
            className={cn(
              'mt-4 md:mt-6 text-base md:text-lg leading-relaxed max-w-2xl',
              align === 'center' && 'mx-auto',
              dark ? 'text-gray-400' : 'text-gray-600'
            )}
          >
            {description}
          </p>
        </Item>
      )}
    </Wrapper>
  );
};

export default SectionTitle;
