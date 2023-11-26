import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import Button from "@/Components/Buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TableFilter from "@/Components/TableFilter/TableFilter";
import Select from "@/Components/Select";
import {purchaseFilter} from "@/Pages/Purchases/List/purchaseFilter";
import SellingsListTable from "@/Pages/Sellings/List/Partials/SellingsListTable";

export default function SellingsList({auth, ...props}) {
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
                de Vendas</h2>}
            {...props}
        >
            <Head title="Listagem de vendas"/>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-4">
                <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex justify-between w-full flex-wrap">
                        <div className="pb-6 text-gray-900 dark:text-neutral-100">Minhas Vendas</div>
                        <TableFilter
                            request={props.request}
                            routeName={"sellings.list"}
                            inputs={{...purchaseFilter, ...productsFilter}}
                            buttonClassName={"px-4 py-2"}
                            mappers={{
                                'sellings': {
                                    'values': props.sellings,
                                    'key': 'id',
                                    'label': 'name'
                                }
                            }}
                        >
                            <Link href={route("sellings.new")}>
                                <Button type="info" className="px-4 py-2">
                                    <FontAwesomeIcon icon={faPlus} className="mr-1"/> Cadastrar
                                </Button>
                            </Link>
                        </TableFilter>
                    </div>
                    <SellingsListTable sellings={props.sellings}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
