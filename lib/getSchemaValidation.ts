import { ZodSchema, ZodIssue } from "zod";

export const getSchemaValidation = <T extends Record<string, string|null>>({
  schema,
  data,
}: {
  schema: ZodSchema<T>;
  data: T;
}): { success: boolean; error: Partial<Record<keyof T, string>> } => {
  const result = schema.safeParse(data);

  const errors: Partial<Record<keyof T, string>> = {};

  if (result.success) {
    return { success: true, error: errors };
  }

  result.error.issues.forEach((issue: ZodIssue) => {
    const field = issue.path[0] as keyof T;
    errors[field] = issue.message;
  });

  return { success: false, error: errors };
};
