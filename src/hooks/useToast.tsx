import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

import { Toast, ToastTone } from '../components/Toast';

type ShowOptions = { tone?: ToastTone; durationMs?: number };

type ToastCtx = {
  show: (message: string, options?: ShowOptions) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

const DEFAULT_DURATION_MS = 2000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState<ToastTone>('info');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback<ToastCtx['show']>((next, options) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(next);
    setTone(options?.tone ?? 'info');
    setVisible(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, options?.durationMs ?? DEFAULT_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <Toast message={message} tone={tone} visible={visible} />
    </Ctx.Provider>
  );
}

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
