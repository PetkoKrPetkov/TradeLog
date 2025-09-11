import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext({
  addToast: (_type, _message) => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type, message, timeout = 2500) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((list) => [...list, { id, type, message }]);
    if (timeout > 0) {
      setTimeout(() => remove(id), timeout);
    }
  }, [remove]);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', bottom: 12, right: 12, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map((t) => (
          <div key={t.id}
               role="status"
               onClick={() => remove(t.id)}
               style={{
                 padding: '10px 12px',
                 borderRadius: 8,
                 color: '#fff',
                 cursor: 'pointer',
                 background: t.type === 'error' ? '#dc2626' : t.type === 'warning' ? '#f59e0b' : '#16a34a',
                 boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
               }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
