import {useRef} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import {getSelectedPreDefinition, preDefinitions} from "@/Components/Reports/data/preDefinitions";

export default function ReportForm({className, generateRoute, reportName}) {
    const initialDateInput = useRef();
    const finalDateInput = useRef();

    const {data, setData, errors, post, put, reset, processing, recentlySuccessful} = useForm(
        {
            initial_date: '',
            final_date: '',
        }
    );

    const setPreDefinition = (e) => {
        const idx = e.target.value;
        setData({
            ...data,
            initial_date: preDefinitions[idx].initial_date,
            final_date: preDefinitions[idx].final_date
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        post(route(generateRoute), {
            preserveScroll: true,
        });
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{reportName}</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {"Preencha os dados abaixo para gerar o relatório, ou selecione uma pré-definição!"}
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="preDefinitions" value="Pré-definições"/>

                    <select
                        id="preDefinitions"
                        className="border rounded-md shadow-sm dark:bg-neutral-900 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700"
                        value={getSelectedPreDefinition(data.initial_date, data.final_date)}
                        onChange={setPreDefinition}
                    >
                        <option value="" disabled>Selectione Uma Pré-Definição</option>
                        {preDefinitions.map((preDefinition, idx) => (
                            <option value={idx} key={"pre-definicao" + idx}>{preDefinition.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <InputLabel htmlFor="initial_date" value={"Data incial da pesquisa:"}/>

                    <TextInput
                        id="initial_date"
                        ref={initialDateInput}
                        value={data.initial_date}
                        onChange={(e) => setData('initial_date', e.target.value)}
                        type="date"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.initial_date} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="final_date" value={"Data final da pesquisa:"}/>

                    <TextInput
                        id="final_date"
                        ref={initialDateInput}
                        value={data.final_date}
                        onChange={(e) => setData('final_date', e.target.value)}
                        type="date"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.final_date} className="mt-2"/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}>Gerar Relatório</PrimaryButton>

                </div>
            </form>
        </section>
    );
}
