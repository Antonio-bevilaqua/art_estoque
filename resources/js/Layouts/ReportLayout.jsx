import ApplicationLogo from '@/Components/ApplicationLogo';
import "./css/guest.css";
import Button from "@/Components/Buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons/faPrint";

export default function ReportLayout({children}) {

    return (
        <div
            className="w-full">
            <div className="h-20 print:hidden">
                <div className="top-print fixed top-0 left-0 w-full flex justify-center print:hidden h-20 items-center bg-neutral-700">
                    <Button type="danger" onClick={() => window.print()}>
                        <FontAwesomeIcon className="mr-1" icon={faPrint}/> Imprimir
                    </Button>
                </div>
            </div>
            {children}
        </div>
    );
}
