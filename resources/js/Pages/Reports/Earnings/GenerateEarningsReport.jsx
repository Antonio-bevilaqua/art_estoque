import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import ProductForm from "@/Components/Products/Form/ProductForm";
import ReportForm from "@/Components/Reports/ReportForm";

export default function GenerateSalesReport({auth, ...props}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200 leading-tight">Gerar Relatório de Faturamento</h2>}
            errors={props.errors}
        >
            <Head title="Gerar Relatório de Faturamento"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-neutral-800 shadow sm:rounded-lg flex">
                        <ReportForm className="max-w-xl" generateRoute={"report.earnings.generate"} reportName={"Relatório de Faturamento"} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
