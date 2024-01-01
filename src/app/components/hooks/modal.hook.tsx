export const ModalWrapper = ({ children, onClose }: { children?: React.ReactNode, onClose?: () => void }) => {
    const HandleClick = (e: any) => {
        const { classList } = e.target;
        if (!classList.contains('modal_body')) return;
        if (!onClose) return;
        onClose(); // Close the modal
    }
    return (
        <div className={`absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.50)] flex items-center justify-center modal_body z-1`} onClick={HandleClick}>
            {children}
        </div>
    )
}