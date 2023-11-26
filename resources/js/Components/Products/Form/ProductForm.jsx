import {useRef} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {useForm} from '@inertiajs/react';
import {currencyFormatter, integerFormatter} from "@/utils/functions";
import FileInput from "@/Components/FileInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ProductForm({className, values = {}, product_id = null}) {
    const nameInput = useRef();
    const descriptionInput = useRef();
    const buy_valueInput = useRef();
    const sell_valueInput = useRef();
    const stockInput = useRef();
    const imageInput = useRef();


    const getInitialValuesData = () => {
        let initialValues = {
            name: '',
            description: '',
            buy_value: '',
            sell_value: '',
            stock: '',
            image: '',
            ...values
        }

        if (initialValues.buy_value !== "") {
            initialValues.buy_value = currencyFormatter(initialValues.buy_value);
        }

        if (initialValues.sell_value !== "") {
            initialValues.sell_value = currencyFormatter(initialValues.sell_value);
        }

        return initialValues;
    }

    const {data, setData, errors, post, put, reset, processing, recentlySuccessful} = useForm(
        getInitialValuesData()
    );

    const onSubmit = (e) => {
        e.preventDefault();

        if (product_id !== null) {
            return update(e);
        }

        return create(e);
    };

    const create = (e) => {
        post(route('products.save'), getStoreOptions());
    }

    const update = (e) => {
        put(route('products.update', [product_id]), getStoreOptions());
    }

    const getStoreOptions = () => {
        return {
            preserveScroll: true,
            onError: () => {
                if (errors.name) {
                    reset('name');
                    nameInput.current.focus();
                }
                if (errors.description) {
                    reset('description');
                    descriptionInput.current.focus();
                }
                if (errors.buy_value) {
                    reset('buy_value');
                    buy_valueInput.current.focus();
                }
                if (errors.sell_value) {
                    reset('sell_value');
                    sell_valueInput.current.focus();
                }
                if (errors.stock) {
                    reset('stock');
                    stockInput.current.focus();
                }
                if (errors.image) {
                    reset('image');
                    imageInput.current.focus();
                }
            },
        };
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{product_id ? "Editar Produto" : "Cadastrar Produto"}</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {product_id ? "Altere os dados abaixo e clique no botão de salvar para atualizar seu produto!" : "Preencha os dados abaixo e clique no botão de salvar para cadastrar seu produto!"}
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nome do Produto"/>

                    <TextInput
                        id="name"
                        ref={nameInput}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Foto do Produto"/>

                    <FileInput
                        id="image"
                        ref={imageInput}
                        initialImage={typeof values.picture_link !== 'undefined' ? values.picture_link : null}
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="mt-1 block flex-1"
                    />

                    <InputError message={errors.image} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Descrição Breve"/>

                    <TextInput
                        id="description"
                        ref={descriptionInput}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.description} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="buy_value" value="Preço de Compra"/>

                    <TextInput
                        id="buy_value"
                        ref={buy_valueInput}
                        value={data.buy_value}
                        onChange={(e) => setData('buy_value', currencyFormatter(e.target.value))}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.buy_value} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="sell_value" value="Preço de Venda"/>

                    <TextInput
                        id="sell_value"
                        ref={sell_valueInput}
                        value={data.sell_value}
                        onChange={(e) => setData('sell_value', currencyFormatter(e.target.value))}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.sell_value} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="stock" value="Total em estoque"/>

                    <TextInput
                        id="stock"
                        ref={stockInput}
                        value={data.stock}
                        onChange={(e) => setData('stock', integerFormatter(e.target.value))}
                        type="number"
                        step="1"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.stock} className="mt-2"/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}>{product_id ? "Salvar Alterações" : "Salvar Novo Produto"}</PrimaryButton>

                </div>
            </form>
        </section>
    );
}
