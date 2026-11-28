export const env = {
  assistantApiUrl: import.meta.env.VITE_ASSISTANT_API_URL?.trim() || '',
  assistantApiKey: import.meta.env.VITE_ASSISTANT_API_KEY?.trim() || '',
  isDev: import.meta.env.DEV,
} as const;

export function getAssistantEndpoint(endpointPath: string): string | null {
  if (!env.assistantApiUrl) {
    return null;
  }

  const normalizedPath = endpointPath.startsWith('/')
    ? endpointPath
    : `/${endpointPath}`;

  // In local Vite dev mode, route through Vite's /api proxy (configured from VITE_ASSISTANT_API_URL) to avoid CORS issues.
  if (env.isDev) {
    return normalizedPath;
  }

  return `${env.assistantApiUrl.replace(/\/+$/, '')}${normalizedPath}`;
}
