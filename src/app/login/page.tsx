'use client';

import { useForm, FormProvider, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CustomInput } from '@/components/CustomInput';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending: isLoading, error } = useLogin();

  const methods = useForm({
    resolver: zodResolver(loginSchema) as Resolver<{
      email: string;
      password: string;
    }>,
    defaultValues: {
      email: 'emonno13@gmail.com',
      password: '12345678',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    login(data, {
      onSuccess: async () => {
        window.location.href = '/'; // Redirect to me page on success
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-4 rounded border p-4"
      >
        <h1 className="text-xl font-bold">Login</h1>
        {error && (
          <div className="rounded bg-red-100 p-2 text-red-600">
            {error.message}
          </div>
        )}
        <CustomInput name="email" label="Email" type="text" />
        <CustomInput name="password" label="Password" type="password" />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </FormProvider>
  );
}
