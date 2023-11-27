import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import Button from "@/Components/Buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TableFilter from "@/Components/TableFilter/TableFilter";
import {purchaseFilter} from "./purchaseFilter";
import Select from "@/Components/Select";
import PurchasesListTable from "@/Pages/Purchases/List/Partials/PurchasesListTable";

export default function PurchasesList({auth, ...props}) {
    const productsFilter = {
        'products': {
            label: "Produtos",
            render: (value, onChange) => {
                const handleChange = (newValue) => {
                    onChange({
                        target: {
                            value: newValue
                        }
                    });
                }

                return (
                    <Select
                        value={value}
                        onChange={handleChange}
                        options={props.products.map((product) => {
                            return {
                                label: product.name,
                                value: product.id
                            };
                        })}
                        multiple={true}
                        isSearchable={true}
                        noOptionsMessage={() => "Nenhum produto cadastrado"}
                    />
                )
            },
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200 leading-tight">Listagem
                de Compras</h2>}
            {...props}
        >
            <Head title="Listagem de compras"/>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-4">
                <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex justify-between w-full flex-wrap">
                        <div className="pb-6 text-gray-900 dark:text-neutral-100">Minhas Compras</div>
                        <TableFilter
                            request={props.request}
                            routeName={"purchases.list"}
                            inputs={{...purchaseFilter, ...productsFilter}}
                            buttonClassName={"px-4 py-2"}
                            mappers={{
                                'products': {
                                    'values': props.products,
                                    'key': 'id',
                                    'label': 'name'
                                }
                            }}
                        >
                            <Link href={route("purchases.new")}>
                                <Button type="info" className="px-4 py-2">
                                    <FontAwesomeIcon icon={faPlus} className="mr-1"/> Cadastrar
                                </Button>
                            </Link>
                        </TableFilter>
                    </div>
                    <PurchasesListTable purchases={props.purchases} request={props.request} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
