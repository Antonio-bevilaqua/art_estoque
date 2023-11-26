import {forwardRef, useEffect, useRef, useState} from 'react';
import Avatar from "@/Components/Avatar";

export default forwardRef(function FileInput({
                                                 className = '',
                                                 isFocused = false,
                                                 initialImage = null,
                                                 onChange = () => {
                                                 },
                                                 ...props
                                             }, ref) {
    const input = ref ? ref : useRef();
    const [file, setFile] = useState(initialImage);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));

        if (typeof onChange === "function") {
            return onChange(e);
        }
    }

    return (
        <div className="flex items-start items-center gap-4 flex-wrap md:flex-nowrap">
            {file && (
                <Avatar src={file} width={100} height={100} radius={10} />
            )}
            <input
                type="file"
                {...props}
                onChange={handleChange}
                className={
                    'border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            />
        </div>
    );
});
