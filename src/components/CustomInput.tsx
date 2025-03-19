'use client';

import { useFormContext, Controller, FieldErrors } from 'react-hook-form';
import { Input } from "@/components/ui/input";

interface CustomInputProps {
  name: string;
  label: string;
  type?: string;
}

export function CustomInput({ name, label, type = 'text' }: CustomInputProps) {
  const { control, formState: { errors } } = useFormContext();

  // Define the type for errors
  const errorMessage = (errors[name as keyof FieldErrors] as { message?: string })?.message;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Input {...field} type={type} id={name} className="w-full p-2 border rounded" />
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </>
        )}
      />
    </div>
  );
}