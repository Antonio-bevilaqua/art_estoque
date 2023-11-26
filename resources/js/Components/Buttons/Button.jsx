export default function Button({
                                   type,
                                   submit = false,
                                   iconButton = false,
                                   outline = false,
                                   className = '',
                                   disabled = false,
                                   children,
                                   ...props
                               }) {
    const defaultClasses = "inline-flex items-center rounded-md font-semibold text-xs uppercase tracking-widest focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 dark:focus:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150";

    const buttonProperties = {
        "success": " bg-green-800 dark:bg-green-300 text-white dark:text-green-900 hover:bg-neutral-700 dark:hover:bg-green-400",
        "info": " bg-blue-800 dark:bg-blue-300 text-white dark:text-blue-900 hover:bg-neutral-700 dark:hover:bg-blue-400",
        "danger": " bg-red-800 dark:bg-red-300 text-white dark:text-red-900 hover:bg-neutral-700 dark:hover:bg-red-400",
        "warning": " bg-orange-800 dark:bg-orange-300 text-white dark:text-orange-900 hover:bg-neutral-700 dark:hover:bg-orange-400",
        "primary": " bg-violet-800 dark:bg-violet-300 text-white dark:text-violet-900 hover:bg-neutral-700 dark:hover:bg-violet-400",
    }

    const buttonPropertiesOutline = {
        "success": " bg-transparent border border-green-800 dark:border-green-300 text-green-800 dark:text-green-300 hover:bg-green-700 dark:hover:bg-green-300 hover:text-green-300 dark:hover:text-green-900",
        "info": " bg-transparent border border-blue-800 dark:border-blue-300 text-blue-800 dark:text-blue-300 hover:bg-blue-700 dark:hover:bg-blue-300 hover:text-blue-300 dark:hover:text-blue-900",
        "danger": " bg-transparent border border-red-800 dark:border-red-300 text-red-800 dark:text-red-300 hover:bg-red-700 dark:hover:bg-red-300 hover:text-red-300 dark:hover:text-red-900",
        "warning": " bg-transparent border border-orange-800 dark:border-orange-300 text-orange-800 dark:text-orange-300 hover:bg-orange-700 dark:hover:bg-orange-300 hover:text-orange-300 dark:hover:text-orange-900",
        "primary": " bg-transparent border border-violet-800 dark:border-violet-300 text-violet-800 dark:text-violet-300 hover:bg-neutral-700 dark:hover:bg-violet-300 hover:text-violet-300 dark:hover:text-violet-900",
    }

    const getProperties = () => {
        let actualType = type;
        if (typeof buttonProperties[actualType] === 'undefined') actualType = "info";

        if (!outline) {
            return buttonProperties[actualType];
        }

        return buttonPropertiesOutline[actualType];
    }

    return (
        <button
            {...props}
            type={submit ? "submit" : "button"}
            className={
                `${defaultClasses}
                 ${getProperties()}
                 ${iconButton ? 'w-8 h-8 flex justify-center items-center' : 'px-2 py-1'}
                 ${disabled ? 'opacity-25' : ''} ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
