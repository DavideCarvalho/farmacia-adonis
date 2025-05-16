import { Head } from '@inertiajs/react'
import { useState } from 'react'
import { Pill, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'Usuário deve ter pelo menos 3 caracteres.',
  }),
  password: z.string().min(6, {
    message: 'Senha deve ter pelo menos 6 caracteres.',
  }),
  rememberMe: z.boolean().default(false).optional(),
})

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Pill className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
                    <Input placeholder="Digite seu usuário" {...field} disabled={isLoading} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Eye className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500 opacity-0 pointer-events-none" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Digite sua senha"
                      {...field}
                      disabled={isLoading}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? 'Esconder senha' : 'Mostrar senha'}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">Lembrar-me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <a href="/esqueci-senha" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Head title="Login - Farmácia Adonis" />
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Lado institucional */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 p-12 text-white">
          <div>
            <div className="flex items-center text-2xl font-bold mb-8">
              <Pill className="mr-3 h-8 w-8" />
              Farmácia Adonis
            </div>
            <h2 className="text-3xl font-bold mb-2">Sistema de Gestão Farmacêutica Hospitalar</h2>
            <p className="text-lg mb-8">Controle, segurança e eficiência para o seu hospital.</p>
          </div>
          <blockquote className="mt-auto text-lg italic opacity-80">
            "Este sistema revolucionou nossa gestão de medicamentos, aumentando a eficiência e reduzindo erros em mais de 40%."
            <footer className="text-sm not-italic mt-2">Dra. Sofia Mendes - Diretora Farmacêutica</footer>
          </blockquote>
        </div>
        {/* Lado do formulário */}
        <div className="flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-slate-100">
            <div className="flex flex-col space-y-2 text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-teal-600 p-2 rounded-full w-12 h-12 flex items-center justify-center">
                  <Pill className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo(a)</h1>
              <p className="text-sm text-gray-500">Entre com suas credenciais para acessar o sistema</p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-gray-400 mt-6">
              Ao fazer login, você concorda com nossos{' '}
              <a href="/terms" className="underline underline-offset-4 hover:text-primary">Termos de Serviço</a>{' '}e{' '}
              <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Política de Privacidade</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}