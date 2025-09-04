import * as React from 'react';

import { cn } from '@/lib/utils';

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('animate-pulse rounded-md bg-accent', className)}
      data-slot="skeleton"
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export { Skeleton };
