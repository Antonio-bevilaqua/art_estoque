import ReactSelect from "react-select";

export default function Select({
                                   value,
                                   onChange,
                                   options,
                                   multiple = false,
                                   hasError = false,
                                   className = "",
                                   ...props
                               }) {
    const defaultClasses = "border rounded-md shadow-sm dark:bg-neutral-900 dark:text-neutral-300";
    const notFocusedClasses = " border-neutral-300 dark:border-neutral-700";
    const focusedClasses = " border-indigo-500 dark:border-indigo-600 ring-indigo-500 dark:ring-indigo-600";
    const notFocusedErrorClasses = " border-red-300 dark:border-red-700";
    const focusedErrorClasses = " border-red-500 dark:border-red-600 ring-red-500 dark:ring-red-600"
    const textInputClasses = " dark:text-neutral-300 shadow-none";
    const menuClasses = "dark:bg-neutral-900 dark:text-neutral-300";
    const optionClasses = "dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700 cursor-pointer";
    const optionSelectedClasses = "dark:bg-neutral-900 dark:text-blue-300 dark:hover:bg-neutral-700 cursor-pointer";

    const getSelectorValue = () => {
        if (options === null) return '';

        if (multiple) return getSelectorMultipleValues();

        const filter = options.filter((opt) => {
            return opt.value === value;
        });

        if (filter.length > 0) {
            return filter[0];
        }

        return '';
    };

    const getSelectorMultipleValues = () => {
        console.log("selector multiple values", value);
        const filter = options.filter((opt) => {
            console.log(opt.value);
            return value.includes(opt.value);
        });
        console.log("selector multiple values filtered", filter);

        if (filter.length > 0) {
            return filter;
        }

        return '';
    }

    const mountClasses = (isFocused = false) => {
        if (hasError) {
            return isFocused ? defaultClasses + " " + focusedErrorClasses : defaultClasses + " " + notFocusedErrorClasses;
        }
        return isFocused ? defaultClasses + " " + focusedClasses : defaultClasses + " " + notFocusedClasses;
    }

    const mountOptionClasses = (isSelected = false) => {
        return isSelected ? optionSelectedClasses : optionClasses;
    }

    const setSelectorValue = (option) => {
        if (multiple) {
            return setSelectorMultipleValues(option);
        }
        onChange(option.value ?? "");
    }

    const setSelectorMultipleValues = (option) => {
        if (Array.isArray(option)) {
            return onChange(option.map((opt) => {
                return opt.value;
            }));
        }

        onChange([option.value]);
    }

    const stylesRemoval = (baseStyles) => {
        let newStyles = {...baseStyles};
        delete newStyles.borderColor;
        delete newStyles["&:hover"];
        delete newStyles["backgroundColor"];
        delete newStyles["borderRadius"];
        delete newStyles["outline"];
        delete newStyles["borderWidth"];
        delete newStyles["borderStyle"];
        delete newStyles["boxShadow"];
        delete newStyles["boxSizing"];
        return ({
            ...newStyles,
        })
    }

    const controlStylesRemoval = (baseStyles, state) => {
        let newStyles = stylesRemoval(baseStyles);
        newStyles["padding"] = "0.1rem 0.2rem";
        if (state.isFocused) {
            newStyles["outline"] = "2px solid transparent";
            newStyles["outlineOffset"] = "2px";
            newStyles["boxShadow"] = "0 0 0 0px #fff, 0 0 0 1px rgb(79 70 229), 0 1px 2px 0 rgb(0 0 0 / 0.05)";
        }
        return newStyles;
    }

    const inputStylesRemoval = (baseStyles, state) => {
        let newStyles = stylesRemoval(baseStyles);
        delete newStyles["color"];
        return newStyles;
    }

    const optionStylesRemoval = (baseStyles, state) => {
        let newStyles = inputStylesRemoval(baseStyles);
        delete newStyles["cursor"];
        return newStyles;
    }

    return (
        <ReactSelect
            classNames={{
                control: (state) => mountClasses(state.isFocused),
                input: () => textInputClasses,
                valueContainer: () => textInputClasses,
                singleValue: () => textInputClasses,
                multiValue: () => textInputClasses,
                placeholder: () => textInputClasses,
                option: (state) => mountOptionClasses(state.isSelected),
                menu: () => menuClasses
            }}
            styles={{
                control: controlStylesRemoval,
                container: stylesRemoval,
                input: inputStylesRemoval,
                valueContainer: stylesRemoval,
                singleValue: inputStylesRemoval,
                multiValue: inputStylesRemoval,
                multiValueLabel: inputStylesRemoval,
                indicatorsContainer: inputStylesRemoval,
                placeholder: stylesRemoval,
                option: optionStylesRemoval,
                menu: stylesRemoval,
            }}
            classNamePrefix="select"
            options={options}
            value={getSelectorValue()}
            isMulti={multiple}
            noOptionsMessage={() => "Sem opções"}
            onChange={setSelectorValue}
            placeholder={"Clique para selecionar..."}
            {...props}
        />
    )
}
