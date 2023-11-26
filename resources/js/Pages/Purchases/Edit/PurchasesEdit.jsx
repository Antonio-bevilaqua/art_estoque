import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import ProductForm from "@/Components/Products/Form/ProductForm";
import ProductTransactionForm from "@/Components/ProductTransaction/Form/ProductTransactionForm";

export default function PurchasesEdit({auth, ...props}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200 leading-tight">Editar
                Compra</h2>}
            errors={props.errors}
        >
            <Head title="Editar Compra"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-neutral-800 shadow sm:rounded-lg flex">
                        <ProductTransactionForm
                            className="max-w-xl"
                            values={{...props.purchase, date: props.purchase.date_only }}
                            transaction_id={props.purchase.id}
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
