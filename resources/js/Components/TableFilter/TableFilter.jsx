import {Fragment, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "@/Components/Buttons/Button";
import Modal from "@/Components/Modals/Modal";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {router} from '@inertiajs/react'

function TableFilter({request, inputs, routeName, buttonClassName = "", mappers = {}, className = "", children}) {
    const getInputData = () => {
        let filterInitialValues = {};
        for (let key in inputs) {
            filterInitialValues[key] = typeof request[key] !== 'undefined' ? request[key] ?? '' : '';
        }
        return filterInitialValues;
    }

    const [openFilterModal, setOpenFilterModal] = useState(false);
    const {data, setData, errors, get, reset, processing} = useForm(
        getInputData()
    );

    const onSubmit = (e) => {
        e.preventDefault();
        get(route(routeName), {
            preserveScroll: true,
        });
    };

    const clearFilter = (key) => {
        let newData = {...request};
        newData[key] = "";
        if (typeof newData.page !== "undefined") {
            newData.page = 1;
        }
        router.get(route(routeName), newData);
    };

    const clearFilterArrayValue = (key, value) => {
        let newData = {...request};
        newData[key] = newData[key].filter((val) => val !== value);
        router.get(route(routeName), newData);
    };

    const getLabelFromMapping = (key, value) => {
        if (typeof mappers[key] === 'undefined') return request[key];

        const filtered = mappers[key].values.filter((mapper) => {
            return mapper[mappers[key].key] === value
        });

        if (filtered.length === 0) return request[key];

        return filtered[0][mappers[key].label];
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-end  gap-2 flex-1 flex-wrap">
                    <Button type="primary" className={buttonClassName} onClick={() => setOpenFilterModal(true)}>
                        <FontAwesomeIcon icon={faFilter} className="mr-1"/> Filtrar
                    </Button>
                    {children}
                </div>

                <div className="flex items-end flex-wrap gap-2 mb-2">
                    {
                        Object.keys(inputs).map((key, idx) => {
                            if (typeof request[key] === "undefined" || !request[key]) return (
                                <Fragment key={`filtro_${idx}`}></Fragment>);

                            if (Array.isArray(request[key])) {
                                return (
                                    <Fragment key={`filtro_${idx}`}>
                                        {
                                            request[key].map((val, id) => {
                                                const valueLabel = getLabelFromMapping(key, val);

                                                return (
                                                    <div
                                                        className="flex px-2 py-1 bg-orange-200 text-orange-700 font-bold rounded-md text-xs"
                                                        key={`filtro_array_${idx}_${id}`}>
                                                        {inputs[key].label}: {valueLabel}
                                                        <button
                                                            type="button"
                                                            className="pl-1 transition ease-in-out duration-150 text-orange-500 hover:text-orange-800"
                                                            title="Remover Filtro Aplicado"
                                                            onClick={(e) => {
                                                                clearFilterArrayValue(key, val);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes}/>
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Fragment>
                                )
                            }

                            return (
                                <div
                                    className="flex px-2 py-1 bg-orange-200 text-orange-700 font-bold rounded-md text-xs"
                                    key={`filtro_${idx}`}>
                                    {inputs[key].label}: {request[key]}
                                    <button
                                        type="button"
                                        className="pl-1 transition ease-in-out duration-150 text-orange-500 hover:text-orange-800"
                                        title="Remover Filtro Aplicado"
                                        onClick={(e) => {
                                            clearFilter(key);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {openFilterModal && (
                <Modal open={true} className="bg-neutral-800">
                    <form onSubmit={onSubmit} method="get">
                        <Modal.Title className="text-white">
                            <FontAwesomeIcon icon={faFilter}/> Filtrar

                            <span className="absolute top-0 right-0 p-2">
                            <Button type="danger" iconButton onClick={() => setOpenFilterModal(false)}
                                    submit={false}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Button>
                        </span>
                        </Modal.Title>
                        <Modal.Body>
                            <div className="mt-6 flex flex-wrap items-center gap-2">
                                {Object.keys(data).map((key) => {
                                    if (typeof inputs[key].render === "function") {
                                        return (
                                            <div className="flex-grow md:wd-full" key={key}>
                                                <InputLabel htmlFor={key} value={inputs[key].label}/>

                                                {inputs[key].render(data[key], (e) => {
                                                    setData(key, e.target.value);
                                                })}

                                                <InputError message={errors[key]} className="mt-2"/>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div className="flex-grow md:wd-full" key={key}>
                                            <InputLabel htmlFor={key} value={inputs[key].label}/>

                                            <TextInput
                                                id={key}
                                                value={data[key]}
                                                onChange={(e) => {
                                                    let value = typeof inputs[key].mask === 'function' ? inputs[key].mask(e.target.value) : e.target.value;
                                                    setData(key, value);
                                                }}
                                                type={typeof inputs[key].type === "string" ? inputs[key].type : "string"}
                                                className="mt-1 block w-full"
                                            />

                                            <InputError message={errors[key]} className="mt-2"/>
                                        </div>
                                    )
                                })}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button submit type="primary" disabled={processing} className="px-3 py-2">
                                Buscar
                            </Button>
                            <Button
                                type="danger"
                                submit={false}
                                className="px-3 py-2"
                                onClick={() => setOpenFilterModal(false)}
                            >
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )}
        </>
    )
}

export default TableFilter;
