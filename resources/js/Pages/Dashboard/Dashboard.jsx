import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import ProductsTable from "@/Pages/Dashboard/Partials/ProductsTable";
import SellingsTable from "@/Pages/Dashboard/Partials/SellingsTable";
import PurchasesTable from "@/Pages/Dashboard/Partials/PurchasesTable";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Olá {props.auth.user.name},
                seja bem vindo!</h2>}
        >
            <Head title="Inicio"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-4">
                    <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="pb-6 text-gray-900 dark:text-neutral-100">Produtos com menor estoque</div>
                        <ProductsTable products={props.produtos}/>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-4">
                    <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="pb-6 text-gray-900 dark:text-neutral-100">Últimas Vendas</div>
                        <SellingsTable sellings={props.vendas}/>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-4">
                    <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="pb-6 text-gray-900 dark:text-neutral-100">Últimas Compras</div>
                        <PurchasesTable purchases={props.compras}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
