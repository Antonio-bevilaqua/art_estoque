import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import ProductsListTable from "@/Pages/Products/List/Partials/ProductsListTable";
import Button from "@/Components/Buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TableFilter from "@/Components/TableFilter/TableFilter";
import {currencyFormatter} from "@/utils/functions";

const productsFilter = {
    'name': {
        label: "Nome",
        type: "text",
    },
    'description': {
        label: "Descrição",
        type: "text",
    },
    'min_buy_value': {
        label: "Valor Mínimo de Compra",
        mask: currencyFormatter,
        type: "text",
    },
    'max_buy_value': {
        label: "Valor Máximo de Compra",
        mask: currencyFormatter,
        type: "text",
    },
    'min_sell_value': {
        label: "Valor Mínimo de Venda",
        mask: currencyFormatter,
        type: "text",
    },
    'max_sell_value': {
        label: "Valor Máximo de Venda",
        mask: currencyFormatter,
        type: "text",
    },
    'min_stock': {
        label: "Valor Mínimo de Estoque",
        type: "number",
    },
    'max_stock': {
        label: "Valor Máximo de Estoque",
        type: "number",
    }
}

export default function ProductsList({auth, ...props}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200 leading-tight">Listagem
                de Produtos</h2>}
            {...props}
        >
            <Head title="Listagem de produtos"/>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-4">
                <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex justify-between w-full flex-wrap">
                        <div className="pb-6 text-gray-900 dark:text-neutral-100">Meus Produtos</div>
                        <TableFilter request={props.request} routeName={"products.list"} inputs={productsFilter} buttonClassName={"px-4 py-2"}>
                            <Link href={route("products.new")}>
                                <Button type="info" className="px-4 py-2">
                                    <FontAwesomeIcon icon={faPlus} className="mr-1"/> Cadastrar
                                </Button>
                            </Link>
                        </TableFilter>
                    </div>
                    <ProductsListTable products={props.products} request={props.request} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
