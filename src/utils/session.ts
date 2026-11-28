const SESSION_STORAGE_KEY = 'portfolio-ai-session-id';

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) {
      return existing;
    }
    const created = generateSessionId();
    sessionStorage.setItem(SESSION_STORAGE_KEY, created);
    return created;
  } catch {
    return generateSessionId();
  }
}

export function resetSessionId(): string {
  const created = generateSessionId();
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, created);
  } catch {
    // Ignore storage errors in restricted environments
  }
  return created;
}
