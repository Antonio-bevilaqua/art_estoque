import ModalCore from "@/Components/Modals/ModalCore";
import Button from "@/Components/Buttons/Button";

function Modal({open, children, className = ""}) {
    if (!open) {
        return <></>;
    }

    return (
        <ModalCore open={open} className={className}>
            {children}
        </ModalCore>
    );
}

function ModalTitle({children, className = ""}) {
    return <h2 className={"text-xl " + className}>{children}</h2>;
}

function ModalBody({children, className = ""}) {
    return <div className={"py-4 " + className}>{children}</div>;
}

function ModalFooter({children, withCloseButton = false, className = ""}) {
    return (
        <div className={"p-1 flex justify-end gap-2" + className}>
            {children}
            {withCloseButton && (
                <Button
                    type="danger"
                    onClick={() => onClose()}
                >
                    Fechar
                </Button>
            )}
        </div>
    )
}

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
export default Modal;
