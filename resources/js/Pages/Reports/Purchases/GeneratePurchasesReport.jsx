import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import ReportForm from "@/Components/Reports/ReportForm";

export default function GenerateSalesReport({auth, ...props}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200 leading-tight">Gerar Relatório de Compras</h2>}
            errors={props.errors}
        >
            <Head title="Gerar Relatório de Compras"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-neutral-800 shadow sm:rounded-lg flex">
                        <ReportForm className="max-w-xl" generateRoute={"report.purchases.generate"} reportName={"Relatório de Compras"} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
