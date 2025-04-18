import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { cn } from '@/lib/utils';

const backgroundClassName = cva(
  'fixed inset-0 z-50 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-grey-50',
        transparent: 'bg-grey-900/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ModalProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backgroundClassName> {
  isVisible?: boolean;
  onOutSlideClick?: () => void;
}

export const ModalFloatBackground = ({
  children,
  variant,
  isVisible,
  onOutSlideClick,
}: ModalProps) => {
  return (
    <div
      className={cn(backgroundClassName({ variant }))}
      onClick={onOutSlideClick}
    >
      <div
        className={`flex w-full max-w-sm flex-col gap-[60px] rounded-2xl bg-white p-6 pt-[40px] text-center shadow-lg ${isVisible === undefined || isVisible ? 'animate-popup' : 'animate-popout'}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalBackgroundWithHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <GlobalNavigationBar />
      <div
        className={cn(
          'flex flex-1 flex-col items-center justify-center bg-grey-50',
          className,
        )}
      >
        <div className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white px-[34px] pb-[30px] pt-10 shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};
