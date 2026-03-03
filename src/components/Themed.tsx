import React from 'react';

export function View({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function Text({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement | HTMLSpanElement>) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}