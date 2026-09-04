'use client';

import React, { useId, useState, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { inputVars, labelVars } from './cva_tables';

import { Plus, Minus } from 'lucide-react';

import { Button } from '../ui/button';

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
InputLabel.displayName = 'InputLabel';

interface InputCounterProps extends Omit<InputLabelProps, 'defaultValue' | 'type'> {
  startValue?: number;
  buttonCN?: string;
}

export const InputCounter = React.forwardRef<HTMLInputElement, InputCounterProps>(({
  id,
  className,
  buttonCN,
  wrapperCN,
  labelCN,
  labelText,
  startValue = 0,
  min,
  max,
  step = 1,
  value: controlledValue,
  onChange,
  intent,
  ...props
}, ref) => {
  const autoId = useId();
  const inputId = id || autoId;

  const minVal: number = min !== undefined ? Number(min) : -Infinity;
  const maxVal: number = max !== undefined ? Number(max) : Infinity;
  const stepVal: number = Number(step) || 1;

  const [internalValue, setInternalValue] = useState<string>(
    startValue !== undefined ? String(startValue) : ''
  );

  const currentValue: string = controlledValue !== undefined ? String(controlledValue) : internalValue;

  const sanitizeAndClamp = (val: string): string => {
    if (val === '') return val;

    let sanitized = val.replace(/[^0-9-]/g, '');
    if (minVal >= 0)
      sanitized = sanitized.replace(/-/g, '');
    else sanitized = sanitized.replace(/(?!^)-/g, '');

    if (sanitized === '' || sanitized === '-') return sanitized;

    const numericVal = Number(sanitized);
    if (isNaN(numericVal)) return '';

    const clamped = Math.min(Math.max(numericVal, minVal), maxVal)
    return String(clamped);
  };

  const triggerChange = (newValue: string) => {
    setInternalValue(newValue);

    if (onChange) {
      const event = {
        target: { value: newValue, name: props.name },
        currentTarget: { value: newValue, name: props.name },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const handleIncrement = () => {
    const currentNum = Number(currentValue) || 0;
    const nextNum = Math.min(currentNum + stepVal, maxVal);
    triggerChange(String(nextNum));
  };

  const handleDecrement = () => {
    const currentNum = Number(currentValue) || 0;
    const nextNum = Math.max(currentNum - stepVal, minVal);
    triggerChange(String(nextNum));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = sanitizeAndClamp(e.target.value);
    triggerChange(cleaned);
  };

  return (
    <div className={cn('relative', wrapperCN)}>
      <Input
        ref={ref}
        id={inputId}
        intent={intent}
        type='text'
        inputMode='numeric'
        className={cn(
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        placeholder=' '
        value={currentValue}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        {...props}
      />

      {labelText !== '' && (
        <Label
          htmlFor={inputId}
          intent={intent}
          className={labelCN}
        >{labelText}</Label>
      )}

      <div className='absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-3'>
        <Button
          type='button'
          intent='circle'
          className={cn(
            Number(currentValue) >= maxVal ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto',
            buttonCN
          )}
          onClick={handleIncrement}
          disabled={Number(currentValue) >= maxVal}
        ><Plus /></Button>

        <Button
          type='button'
          intent='circle'
          className={cn(
            Number(currentValue) <= minVal ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto',
            buttonCN
          )}
          onClick={handleDecrement}
          disabled={Number(currentValue) <= minVal}
        ><Minus /></Button>
      </div>
    </div>
  );
});
InputCounter.displayName = 'InputCounter';