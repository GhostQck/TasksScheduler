import React, { useId, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { inputVars, labelVars } from './cva_tables';

interface InputProps
extends InputHTMLAttributes<HTMLInputElement>,
VariantProps<typeof inputVars> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  intent,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      className={cn(inputVars({ intent }), className)}
      {...props}
    />
  );
});
Input.displayName = 'Input';

interface LabelProps
extends LabelHTMLAttributes<HTMLLabelElement>,
VariantProps<typeof labelVars> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  className,
  intent,
  children,
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(labelVars({ intent }), className)}
      {...props}
    >{children}</label>
  );
});
Label.displayName = 'Label';

interface InputLabelProps extends Omit<InputProps, 'placeholder'> {
  wrapperCN?: string;
  labelCN?: string;
  labelText: string;
}

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(({
  id,
  className,
  wrapperCN,
  labelCN,
  labelText,
  intent,
  ...props
}, ref) => {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={cn('relative', wrapperCN)}>
      <Input
        ref={ref}
        id={inputId}
        intent={intent}
        className={className}
        placeholder=' '
        {...props}
      />

      <Label
        htmlFor={inputId}
        intent={intent}
        className={labelCN}
      >{labelText}</Label>
    </div>
  );
}); 