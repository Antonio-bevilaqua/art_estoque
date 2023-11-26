import ApplicationLogo from '@/Components/ApplicationLogo';
import "./css/guest.css";

export default function Guest({children}) {
    return (
        <div
            className="min-h-screen flex flex-col sm:justify-center items-center pt-0 sm:pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900 guestBackground">
            <div
                className="w-full flex flex-col justify-center sm:justify-start sm:max-w-md sm:mt-6 px-6 py-0 sm:py-4 bg-white dark:bg-neutral-800 dark:bg-opacity-90 dark:sm:bg-opacity-100 shadow-md overflow-hidden sm:rounded-lg h-screen sm:h-auto">
                <div className="w-full flex justify-center align-center pt-4 pb-4">
                    <ApplicationLogo className="w-48 fill-current text-gray-500"/>
                </div>

                {children}
            </div>
        </div>
    );
}
