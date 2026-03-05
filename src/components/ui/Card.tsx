import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={hoverEffect ? { y: 0 } : undefined}
        whileHover={hoverEffect ? { y: -5 } : undefined}
        className={cn(
          'glass-card rounded-2xl p-6 transition-all duration-300',
          hoverEffect && 'hover:shadow-[0_10px_30px_-10px_rgba(0,240,255,0.2)] hover:border-primary/30',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
