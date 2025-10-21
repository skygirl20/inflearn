'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal Context Interface
 */
interface ModalContextType {
  /** 모달 열기 */
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  /** 모달 닫기 */
  closeModal: () => void;
  /** 모달 열림 상태 */
  isOpen: boolean;
}

/**
 * Modal Options Interface
 */
interface ModalOptions {
  /** 배경 클릭으로 닫기 가능 여부 */
  closeOnBackdropClick?: boolean;
  /** ESC 키로 닫기 가능 여부 */
  closeOnEsc?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
}

/**
 * Modal State Interface
 */
interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  options: ModalOptions;
}

/**
 * Modal Context
 */
const ModalContext = createContext<ModalContextType | null>(null);

/**
 * Modal Hook
 */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

/**
 * Modal Component
 */
interface ModalProps {
  state: ModalState;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ state, onClose }) => {
  const { isOpen, content, options } = state;
  const {
    closeOnBackdropClick = true,
    closeOnEsc = true,
    className = '',
  } = options;

  // ESC 키 이벤트 처리
  React.useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, closeOnEsc, onClose]);

  // 스크롤 방지
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>,
    document.body
  );
};

/**
 * Modal Provider Props
 */
interface ModalProviderProps {
  children: ReactNode;
}

/**
 * Modal Provider Component
 * 
 * 모달 상태 관리 및 포털을 통한 모달 렌더링을 제공합니다.
 * max-w-md, w-full 클래스는 제거되어 유연한 크기 조정이 가능합니다.
 */
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    content: null,
    options: {},
  });

  const openModal = useCallback((content: ReactNode, options: ModalOptions = {}) => {
    setModalState({
      isOpen: true,
      content,
      options,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      content: null,
      options: {},
    });
  }, []);

  const contextValue: ModalContextType = {
    openModal,
    closeModal,
    isOpen: modalState.isOpen,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal state={modalState} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

/**
 * Default Export
 */
export default ModalProvider;
