import { memo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import styles from './Modal.module.scss';

type TModalType = {
  isOpen: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
};

function Modal(props: TModalType) {
  const { isOpen, close, title, children } = props;

  return (
    <AnimatePresence>
      {
        isOpen && (
          <div className={styles.overlay} onClick={close}>
            <motion.div
              className={styles.modal}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={close}>
                <X size={24} />
              </button>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.content}>{children}</div>
            </motion.div>
          </div>
        )
      }
    </AnimatePresence>
  );
}

export default memo(Modal);
