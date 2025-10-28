import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts(t => t.filter(ti => ti.id !== id));
  }, []);

  const show = useCallback(({ type = 'info', title = '', message = '', ttl = 6000 }) => {
    const id = Math.random().toString(36).slice(2, 9);
    const ts = Date.now();
    setToasts(t => [{ id, ts, type, title, message }, ...t]);
    if (ttl > 0) setTimeout(() => remove(id), ttl);
    return id;
  }, [remove]);

  const api = {
    show,
    success: (msg, title = '') => show({ type: 'success', message: msg, title }),
    error: (msg, title = '') => show({ type: 'error', message: msg, title }),
    warn: (msg, title = '') => show({ type: 'warning', message: msg, title }),
    info: (msg, title = '') => show({ type: 'info', message: msg, title }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`pointer-events-auto max-w-sm w-full px-4 py-3 rounded-lg shadow-lg text-sm text-left border ${t.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : t.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : t.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
            <div className="flex justify-between items-start gap-2">
              <div>
                {t.title && <div className="font-semibold">{t.title}</div>}
                {t.message && <div className="mt-1 whitespace-pre-wrap">{t.message}</div>}
              </div>
              <button className="text-xs opacity-60 ml-3" onClick={() => remove(t.id)}>Close</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Provide a no-op fallback to avoid crashes if provider not mounted
    return {
      show: () => null,
      success: () => null,
      error: () => null,
      warn: () => null,
      info: () => null,
    };
  }
  return ctx;
}

export default ToastContext;
