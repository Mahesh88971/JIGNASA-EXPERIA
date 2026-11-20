import { useEffect, useState } from 'react';
import { Experience } from '../types';
import { EXPERIENCES_DATA } from './experiences';

export interface PortalContent {
  experiences: Experience[] | null;
  blockedDates: string[];
}

export function usePortalContent() {
  const [content, setContent] = useState<PortalContent>({
    experiences: null,
    blockedDates: [],
  });

  useEffect(() => {
    const refresh = () => {
      fetch('/api/content')
        .then((response) => response.ok ? response.json() : null)
        .then((data: PortalContent | null) => {
          if (data) setContent(data);
        })
        .catch(() => undefined);
    };
    refresh();
    const timer = window.setInterval(refresh, 3000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const refresh = (event: StorageEvent) => {
      if (event.key === 'je_portal_content') {
        try {
          setContent(JSON.parse(event.newValue || '{}'));
        } catch {}
      }
    };
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  return {
    content,
    experiences: content.experiences?.length ? content.experiences : EXPERIENCES_DATA,
  };
}

export async function savePortalContent(payload: PortalContent, token: string) {
  const response = await fetch('/api/admin/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Unable to save portal content');
  return response.json() as Promise<PortalContent>;
}
