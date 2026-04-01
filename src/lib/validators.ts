/**
 * Input Validation Schemas
 * Zod kullanarak API input'larını validate eder
 */

import { z } from 'zod';

/**
 * XSS ve injection pattern'lerini kontrol eder
 */
const dangerousPatterns = [
  /<script[^>]*>.*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // onclick, onerror, vb.
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /eval\(/gi,
  /expression\(/gi,
  /vbscript:/gi,
  /data:text\/html/gi,
];

/**
 * String'in tehlikeli pattern içerip içermediğini kontrol eder
 */
function containsDangerousPattern(value: string): boolean {
  return dangerousPatterns.some(pattern => pattern.test(value));
}

/**
 * Chat mesajı için validation schema
 */
export const chatMessageSchema = z.object({
  message: z
    .string({
      required_error: 'Message is required',
      invalid_type_error: 'Message must be a string',
    })
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message is too long (max 2000 characters)')
    .refine(
      (val) => !containsDangerousPattern(val),
      'Message contains invalid or potentially dangerous content'
    )
    .refine(
      (val) => val.trim().length > 0,
      'Message cannot be only whitespace'
    ),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'model', 'assistant']),
        content: z.string().max(5000),
      })
    )
    .max(50, 'Conversation history is too long')
    .optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;

/**
 * Dua recommendation için validation schema
 */
export const duaRequestSchema = z.object({
  situation: z
    .string({
      required_error: 'Situation is required',
      invalid_type_error: 'Situation must be a string',
    })
    .min(3, 'Situation description is too short (min 3 characters)')
    .max(500, 'Situation description is too long (max 500 characters)')
    .refine(
      (val) => !containsDangerousPattern(val),
      'Situation contains invalid or potentially dangerous content'
    ),
  language: z
    .enum(['en', 'tr', 'ar'], {
      errorMap: () => ({ message: 'Language must be one of: en, tr, ar' }),
    })
    .optional()
    .default('en'),
});

export type DuaRequestInput = z.infer<typeof duaRequestSchema>;

/**
 * Islamic question için validation schema
 */
export const islamicQuestionSchema = z.object({
  question: z
    .string({
      required_error: 'Question is required',
      invalid_type_error: 'Question must be a string',
    })
    .min(5, 'Question is too short (min 5 characters)')
    .max(1000, 'Question is too long (max 1000 characters)')
    .refine(
      (val) => !containsDangerousPattern(val),
      'Question contains invalid or potentially dangerous content'
    ),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string().max(5000),
      })
    )
    .max(50, 'History is too long')
    .optional(),
  language: z
    .enum(['en', 'tr', 'ar'])
    .optional()
    .default('en'),
  kidsMode: z
    .boolean()
    .optional()
    .default(false),
});

export type IslamicQuestionInput = z.infer<typeof islamicQuestionSchema>;

/**
 * Request body size validator
 * Content-Length header'ını kontrol eder
 */
export function validateRequestSize(
  request: Request,
  maxSizeBytes: number = 10 * 1024 // 10KB default
): { valid: boolean; error?: string } {
  const contentLength = request.headers.get('content-length');
  
  if (!contentLength) {
    return { valid: true }; // Content-Length yoksa devam et
  }

  const size = parseInt(contentLength, 10);
  
  if (isNaN(size)) {
    return { valid: false, error: 'Invalid Content-Length header' };
  }

  if (size > maxSizeBytes) {
    return {
      valid: false,
      error: `Request body too large (max ${maxSizeBytes} bytes)`,
    };
  }

  return { valid: true };
}

/**
 * Generic validation helper
 * Zod schema ile validate eder ve hata mesajlarını formatlar
 */
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
      };
    }
    return {
      success: false,
      error: 'Validation failed',
    };
  }
}

/**
 * Sanitize string - tehlikeli karakterleri temizler
 * NOT: Bu validation'dan sonra kullanılmalı, validation'ın yerini almaz
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // HTML tag karakterlerini kaldır
    .replace(/javascript:/gi, '') // JavaScript protocol'ü kaldır
    .trim();
}

/**
 * Email validation (gelecekte kullanılabilir)
 */
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .max(255, 'Email is too long');

/**
 * URL validation (gelecekte kullanılabilir)
 */
export const urlSchema = z
  .string()
  .url('Invalid URL')
  .max(2048, 'URL is too long')
  .refine(
    (val) => {
      try {
        const url = new URL(val);
        return ['http:', 'https:'].includes(url.protocol);
      } catch {
        return false;
      }
    },
    'URL must use HTTP or HTTPS protocol'
  );