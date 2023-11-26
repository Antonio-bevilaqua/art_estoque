import Button from "@/Components/Buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default function ModalCore({className = "", ...props}) {
    const {open} = props;
    if (!open) {
        return <></>;
    }
    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-neutral-900/70 flex">
            <div className={"relative p-4 bg-neutral-100 w-full max-w-md m-auto flex-col flex rounded-lg " + className}>
                <div>{props.children}</div>
            </div>
        </div>
    );
}
