import {useState, useEffect} from 'react';

export default function Alert({
                                  type = "info",
                                  className = "",
                                  title = "",
                                  message = "",
                              }) {
    const getBgColor = () => {
        if (type === "danger") {
            return 'border-l-4 py-1 px-2 border bg-red-600 dark:bg-red-300 border-red-600 dark:border-red-500 text-red-900 dark:text-red-900';
        }
        if (type === "warning") {
            return 'border-l-4 py-1 px-2 bg-orange-600 dark:bg-orange-300 border-orange-900 dark:border-orange-500 text-orange-900 dark:text-orange-900';
        }
        if (type === "primary") {
            return 'border-l-4 py-1 px-2 bg-violet-600 dark:bg-violet-300 border-violet-900 dark:border-violet-500 text-violet-900 dark:text-violet-900';
        }
        if (type === "success") {
            return 'border-l-4 py-1 px-2 bg-green-600 dark:bg-green-300 border-green-900 dark:border-green-500 text-green-900 dark:text-green-900';
        }
        if (type === "info") {
            return 'border-l-4 py-1 px-2 bg-blue-600 dark:bg-blue-300 border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-900';
        }

        return 'border-l-4 py-1 px-2 bg-neutral-600 dark:bg-neutral-300 border border-neutral-900 dark:border-neutral-500 text-neutral-900 dark:text-neutral-900';
    }

    return (
        <>
            {(
                <div className={`w-full ${getBgColor()} ${className}`} >
                    {title !== "" && (
                        <p className="font-bold">{title}</p>
                    )}
                    <p>{message}</p>
                </div>
            )}
        </>
    )
}
