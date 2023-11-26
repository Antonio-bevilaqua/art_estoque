import {useEffect, useRef, useState} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {useForm} from '@inertiajs/react';
import {currencyFormatter} from "@/utils/functions";
import moment from "moment";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TransactionProducts from "@/Components/ProductTransaction/Form/Parts/TransactionProducts";

export default function ProductTransactionForm({
                                                   products,
                                                   transactionRoute,
                                                   transactionName,
                                                   values = {},
                                                   className = "",
                                                   transaction_id = null
                                               }) {
    const discountInput = useRef();
    const taxesInput = useRef();
    const dateInput = useRef();
    const productsInput = useRef();

    const [subTotal, setSubTotal] = useState(0.00);
    const [total, setTotal] = useState(0.00);

    const getInitialValuesData = () => {
        let initialValues = {
            discount: '0.00',
            taxes: '0.00',
            date: moment().format("YYYY-MM-DD"),
            products: [],
            change_stock: true,
            ...values
        }

        if (initialValues.products.length > 0) {
            initialValues.products = initialValues.products.map((product) => {
                return product.id;
            });
        }

        if (initialValues.discount !== "") {
            initialValues.discount = currencyFormatter(initialValues.discount);
        }

        if (initialValues.taxes !== "") {
            initialValues.taxes = currencyFormatter(initialValues.taxes);
        }

        return initialValues;
    }

    const {data, setData, errors, post, put, reset, processing, recentlySuccessful} = useForm(getInitialValuesData());

    const onSubmit = (e) => {
        e.preventDefault();

        if (transaction_id !== null) {
            return update(e);
        }

        return create(e);
    };

    const create = (e) => {
        post(route(transactionRoute + '.save'), getStoreOptions());
    }

    const update = (e) => {
        put(route(transactionRoute + '.update', [transaction_id]), getStoreOptions());
    }

    const getStoreOptions = () => {
        return {
            preserveScroll: true, onError: () => {
                if (errors.discount) {
                    reset('discount');
                    discountInput.current.focus();
                }
                if (errors.taxes) {
                    reset('taxes');
                    taxesInput.current.focus();
                }
                if (errors.date) {
                    reset('date');
                    dateInput.current.focus();
                }
                if (errors.products) {
                    reset('products');
                    productsInput.current.focus();
                }
            },
        };
    }

    const addProductHandler = (product_id) => {
        let productsData = [...data.products];
        productsData.push(product_id);
        setData({...data, products: [...productsData]});
    }

    const removeProductHandler = (product_id) => {
        let productsData = data.products.filter((dataProduct_id) => {
            return dataProduct_id !== product_id
        });
        setData({...data, products: [...productsData]});
    }

    const changeProductQuantity = (product_id, actualQuantity, nextQuantity) => {
        if (nextQuantity > actualQuantity) {
            return addProducts(product_id, nextQuantity - actualQuantity);
        }

        setProductsQuantity(product_id, nextQuantity);
    }

    const addProducts = (product_id, total) => {
        let productsData = [...data.products];
        for (let i = 0; i < total; i++) {
            productsData.push(product_id);
        }
        setData({...data, products: [...productsData]});
    }

    const setProductsQuantity = (product_id, quantity) => {
        let comparator = 0;
        let productsData = data.products.filter((dataProduct_id) => {
            if (dataProduct_id !== product_id) {
                return dataProduct_id;
            }
            if (comparator < quantity) {
                comparator++;
                return dataProduct_id;
            }
        });
        setData({...data, products: [...productsData]});
    }

    useEffect(() => {
        calculateSubTotal();
    }, [data.products])

    useEffect(() => {
        calculateTotal();
    }, [data.taxes, data.discount, subTotal])

    const calculateSubTotal = () => {
        setSubTotal(data.products.reduce((total, product) => {
            console.log(product, total);
            let filtered = products.filter((prd) => {
                console.log(prd.id);
                return prd.id === product;
            });

            console.log(filtered);
            let sumValue = transactionName === "compra" ? "buy_value" : "sell_value";
            return total + filtered[0][sumValue];
        }, 0));
    }

    const calculateTotal = () => {
        let taxes = data.taxes !== "" ? parseFloat(data.taxes) ?? 0.00 : 0.00;
        let discount = data.discount !== "" ? parseFloat(data.discount) ?? 0.00 : 0.00;

        setTotal(subTotal + taxes - discount);
    }

    return (<section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">{transaction_id ? "Editar " + transactionName : "Cadastrar " + transactionName}</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {transaction_id ? "Altere os dados abaixo e clique no botão de salvar para atualizar a " + transactionName + "!" : "Preencha os dados abaixo e clique no botão de salvar para cadastrar a " + transactionName + "!"}
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="date" value={"Data da " + transactionName}/>

                    <TextInput
                        id="date"
                        ref={dateInput}
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        type="date"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.date} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="produtos" value="Produtos"/>

                    <Select
                        value={''}
                        onChange={addProductHandler}
                        options={products.filter((product) => {
                            return !data.products.includes(product.id);
                        }).map((product) => {
                            return {
                                label: product.name, value: product.id
                            };
                        })}
                        isSearchable={true}
                        noOptionsMessage={() => "Nenhuma " + transactionName + " cadastrada"}
                    >

                    </Select>

                    <InputError message={errors.products} className="mt-2"/>
                </div>
                <TransactionProducts
                    products={products}
                    ids={data.products}
                    changeQuantity={changeProductQuantity}
                    removeProductHandler={removeProductHandler}
                />
                <div className="flex gap-2 items-center">
                    <input type="checkbox" className="w-4 h-4 rounded-sm"
                           value={data.change_stock}
                           checked={data.change_stock}
                           onChange={(e) => setData('change_stock', e.target.checked)}
                    />
                    <InputLabel htmlFor="change_stock"
                                value={"Alterar Estoque Baseado Nos Produtos Da " + transactionName}/>
                </div>

                <div>
                    <InputLabel htmlFor="subTotal" value="SubTotal"/>
                    <TextInput
                        id="subTotal"
                        value={subTotal.toFixed(2)}
                        readOnly={true}
                        type="text"
                        className="mt-1 block w-full opacity-60"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="discount" value="Descontos"/>

                    <TextInput
                        id="discount"
                        ref={discountInput}
                        value={data.discount}
                        onChange={(e) => setData('discount', currencyFormatter(e.target.value))}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.discount} className="mt-2"/>
                </div>


                <div>
                    <InputLabel htmlFor="taxes" value="Taxas"/>

                    <TextInput
                        id="taxes"
                        ref={taxesInput}
                        value={data.taxes}
                        onChange={(e) => setData('taxes', currencyFormatter(e.target.value))}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.taxes} className="mt-2"/>
                </div>


                <div>
                    <InputLabel htmlFor="total" value="Total"/>
                    <TextInput
                        id="total"
                        value={total.toFixed(2)}
                        readOnly={true}
                        type="text"
                        className="mt-1 block w-full opacity-60"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton className="capitalize"
                                   disabled={processing}>{transaction_id ? "Salvar Alterações" : "Salvar Nova " + transactionName}</PrimaryButton>

                </div>
            </form>
        </section>);
}
