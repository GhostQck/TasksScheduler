import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type InputVariants = 'transparent' | 'solid';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariants;
}

export const TextField = ({ className, variant = 'transparent', children, ...props }: InputProps) => {
  
};