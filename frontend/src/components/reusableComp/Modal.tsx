import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const Modal = ({ isOpen, message, onClose }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                        <p className="text-gray-700 text-center font-medium">{message}</p>
                        <button
                            onClick={onClose}
                            className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
                            OK
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;