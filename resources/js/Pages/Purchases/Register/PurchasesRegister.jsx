import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import ProductTransactionForm from "@/Components/ProductTransaction/Form/ProductTransactionForm";

export default function PurchasesRegister({auth, ...props}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200 leading-tight">Cadastrar
                Compra</h2>}
            errors={props.errors}
        >
            <Head title="Cadastrar Compra"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-neutral-800 shadow sm:rounded-lg flex">
                        <ProductTransactionForm
                            className="max-w-xl"
                            products={props.products}
                            transactionRoute={"purchases"}
                            transactionName={"compra"}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
