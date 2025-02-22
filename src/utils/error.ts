export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}

export async function handleAPIError<T>(
  promise: Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error('API Error:', error);
    return fallback;
  }
}
