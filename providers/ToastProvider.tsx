import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast as useGluestackToast,
} from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { Icon, AlertCircleIcon, CheckCircleIcon } from '@/components/ui/icon';
import { HStack } from '@/components/ui/hstack';

interface ToastProps {
    type: 'success' | 'error' | 'info';
    message: string;
    title?: string;
}

interface ToastContextType {
    showToast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const gluestackToast = useGluestackToast();
  const showToast = useCallback(({ type, message, title }: ToastProps) => {
    gluestackToast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = `toast-${id}`;
        const isError = type === 'error';
        const toastTitle = title || (isError ? 'Erro' : 'Successo');
        return (
          <Toast nativeID={toastId} action={isError ? 'error' : 'success'} variant="solid" className="mt-4">
            <HStack space="sm" className={'flex-row items-center'}>
              <Icon as={isError ? AlertCircleIcon : CheckCircleIcon} color="white" size="lg" />
              <VStack>
                <ToastTitle>
                  {toastTitle}
                </ToastTitle>
                <ToastDescription>
                  {message}
                </ToastDescription>
              </VStack>
            </HStack>
          </Toast>
        );
      },
    });
  }, [gluestackToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};