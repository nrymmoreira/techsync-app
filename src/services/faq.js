// Minimal FAQ service: send feedback to API if available, else queue in localStorage
export async function sendFaqFeedback({ category, article, questionIndex, helpful }) {
  const payload = { category, article, questionIndex, helpful, timestamp: new Date().toISOString() };

  // Try to POST to a backend endpoint; if it fails, store locally
  try {
    const res = await fetch('/api/faq/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('server responded ' + res.status);

    return { ok: true };
  } catch (err) {
    // fallback: push to localStorage queue
    try {
      const key = 'techsync:faqFeedbackQueue';
      const raw = localStorage.getItem(key);
      const queue = raw ? JSON.parse(raw) : [];
      queue.push(payload);
      localStorage.setItem(key, JSON.stringify(queue));
      return { ok: false, queued: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
}

// Utility to flush queued feedback (can be wired to a background sync)
export async function flushFaqFeedbackQueue() {
  const key = 'techsync:faqFeedbackQueue';
  const raw = localStorage.getItem(key);
  if (!raw) return { flushed: 0 };
  const queue = JSON.parse(raw);
  let flushed = 0;
  const remaining = [];

  for (const item of queue) {
    try {
      const res = await fetch('/api/faq/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) flushed++;
      else remaining.push(item);
    } catch (e) {
      remaining.push(item);
    }
  }

  if (remaining.length > 0) localStorage.setItem(key, JSON.stringify(remaining));
  else localStorage.removeItem(key);

  return { flushed, remaining: remaining.length };
}
