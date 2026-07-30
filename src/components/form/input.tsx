import React, { useId, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVars = cva(
  'peer block rounded-full py-3 px-4 w-full text-sm text-txt ring-2 duration-200 transition-all ease-in-out focus:outline-none',
  {
    variants: {
      intent: {
        solid: 'bg-fg-800 shadow-lg hover:bg-fg-600 hover:shadow-xl focus:bg-fg-600 focus:ring-txt/30',

        transparent_bg: 'bg-bg ring-txt/30 hover:ring-txt focus:ring-txt',
      },
    },
    defaultVariants: {
      intent: 'solid',
    }
  }
);

const labelVars = cva(
  'pointer-events-none absolute bg-transparent rounded-full p-1 text-sm left-4 top-1/2 -translate-y-1/2 opacity-50 uppercase duration-200 transition-all  peer-focus:top-0 peer-focus:text-xs peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:opacity-100',
  {
    variants: {
      intent: {
        solid: 'peer-focus:bg-fg-600 peer-[:not(:placeholder-shown)]:bg-fg-800',

        transparent_bg: 'peer-focus:bg-bg peer-[:not(:placeholder-shown)]:bg-bg',
      },
    },
    defaultVariants: {
      intent: 'solid',
    }
  }
);

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

interface InputFieldProps extends Omit<InputProps, 'placeholder'> {
  wrapperCN?: string;
  labelCN?: string;
  labelText: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({
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