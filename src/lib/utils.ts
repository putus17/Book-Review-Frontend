import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

/**
 * Tailwind class-merging utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Auth-form validation schemas
 */

/* ── Login: username OR email + password ────────────────────────────── */
export const loginFormSchema = () =>
  z
    .object({
      

      email: z.string().trim().email('Invalid email address').optional(),

      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(64, 'Password must be less than 64 characters')
        .refine((pwd) => /[A-Z]/.test(pwd), {
          message: 'Must contain at least one uppercase letter',
        })
        .refine((pwd) => /[a-z]/.test(pwd), {
          message: 'Must contain at least one lowercase letter',
        })
        .refine((pwd) => /[0-9]/.test(pwd), {
          message: 'Must contain at least one number',
        })
        .refine((pwd) => /[!@#$%^&*()]/.test(pwd), {
          message: 'Must contain at least one special character',
        }),
    })
    /* At least one of username or email is required */
   

/* ── Register: name + username + email + password ───────────────────── */
export const registerFormSchema = () =>
  z.object({

    username: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be less than 30 characters')
      .regex(/^[A-Za-z0-9_]+$/, 'Username may only contain letters, numbers, and underscores'),

    email: z.string().trim().email('Invalid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters')
      .refine((pwd) => /[A-Z]/.test(pwd), {
        message: 'Must contain at least one uppercase letter',
      })
      .refine((pwd) => /[a-z]/.test(pwd), {
        message: 'Must contain at least one lowercase letter',
      })
      .refine((pwd) => /[0-9]/.test(pwd), {
        message: 'Must contain at least one number',
      })
      .refine((pwd) => /[!@#$%^&*()]/.test(pwd), {
        message: 'Must contain at least one special character',
      }),
  })

/**
 * Debounce utility (unchanged)
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: NodeJS.Timeout

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as ((...args: Parameters<T>) => void) & { cancel: () => void }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced
}
