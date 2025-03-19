'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

interface CustomSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export function CustomSelect({ name, label, options }: CustomSelectProps) {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field}>
            <SelectTrigger id={name} className="w-full p-2 border rounded">
              {field.value ? options.find(option => option.value === field.value)?.label : 'Select an option'}
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}