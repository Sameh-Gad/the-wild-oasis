import {
    cloneElement,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
    const [openName, setOpenName] = useState("");

    const close = useCallback(() => setOpenName(""), []);
    const open = useCallback((name) => setOpenName(name), []);

    return (
        <ModalContext.Provider value={{ openName, setOpenName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function useModal() {
    return useContext(ModalContext);
}

function Open({ children, opens }) {
    const { open } = useModal();

    function handleClick(event) {
        children.props.onClick?.(event);
        open(opens);
    }

    return opens ? cloneElement(children, { onClick: handleClick }) : null;
}

Modal.Open = Open;

function Window({ children, name, label }) {
    const { openName, close } = useModal();
    const ref = useOutsideClick({ handler: close });
    const previouslyFocusedRef = useRef(null);
    const isOpen = openName === name;

    useEffect(() => {
        if (!isOpen) return;

        const dialog = ref.current;
        const focusableSelector =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const getFocusableElements = () =>
            Array.from(dialog.querySelectorAll(focusableSelector));

        previouslyFocusedRef.current = document.activeElement;
        (getFocusableElements()[0] ?? dialog).focus();

        function handleKeyDown(event) {
            if (event.key === "Escape") close();
            if (event.key !== "Tab") return;

            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) {
                event.preventDefault();
                dialog.focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (
                event.shiftKey &&
                (document.activeElement === firstElement ||
                    !dialog.contains(document.activeElement))
            ) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                (document.activeElement === lastElement ||
                    !dialog.contains(document.activeElement))
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if (previouslyFocusedRef.current?.isConnected) {
                previouslyFocusedRef.current.focus();
            }
        };
    }, [close, isOpen, ref]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 lg:p-8">
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-label={label}
                tabIndex={-1}
                className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl "
            >
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close dialog"
                    className="absolute right-4 top-4 rounded-full bg-stone-500 p-1 text-white hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                >
                    ✕
                </button>

                {cloneElement(children, { onCloseModal: close })}
            </div>
        </div>,
        document.body,
    );
}

Modal.Window = Window;

export default Modal;
