// utils/notifications.js
import { useNotify } from 'react-admin';

// Hook untuk notifikasi cerdas
export const useSmartNotification = () => {
    const notify = useNotify();
    
    const showSuccess = (message, undoable = true) => {
        notify(message, { type: 'success', undoable });
    };
    
    const showError = (message) => {
        notify(message, { type: 'error' });
    };
    
    const showWarning = (message) => {
        notify(message, { type: 'warning' });
    };
    
    const showInfo = (message) => {
        notify(message, { type: 'info' });
    };
    
    return {
        showSuccess,
        showError,
        showWarning,
        showInfo
    };
};

// Fungsi untuk validasi cerdas
export const smartValidation = {
    // Validasi URL
    url: (value) => {
        if (!value) return undefined;
        const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp)$/i;
        if (!urlPattern.test(value)) {
            return 'Please enter a valid image URL (JPG, PNG, GIF, WEBP, or BMP)';
        }
        return undefined;
    },
    
    // Validasi panjang teks
    minLength: (minLength) => (value) => {
        if (!value) return undefined;
        if (value.length < minLength) {
            return `Text must be at least ${minLength} characters long`;
        }
        return undefined;
    },
    
    // Validasi format email
    email: (value) => {
        if (!value) return undefined;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return 'Please enter a valid email address';
        }
        return undefined;
    },
    
    // Validasi format nomor telepon
    phone: (value) => {
        if (!value) return undefined;
        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phonePattern.test(value.replace(/[\s\-\(\)]/g, ''))) {
            return 'Please enter a valid phone number';
        }
        return undefined;
    }
};