import {Head, Link} from '@inertiajs/react';
import ReportLayout from "@/Layouts/ReportLayout";
import {countProducts} from "@/utils/functions";
import ProductCard from "@/Components/Products/ProductCard";
import moment from "moment";

export default function GeneratedReport({auth, ...props}) {
    const requestHas = (key) => {
        if (typeof props.request[key] === 'undefined') return false;
        if (props.request[key] === "") return false;

        return true;
    }

    const requestDate = (key) => {
        console.log(props.request[key]);
        return moment(props.request[key], 'YYYY-MM-DD').format("DD/MM/YYYY");
    }

    const totalSales = props.earnings.sales.reduce((total, sale) => {
        return total + parseFloat(sale.total_value)
    }, 0).toFixed(2);

    const totalPurchases = props.earnings.purchases.reduce((total, sale) => {
        return total + parseFloat(sale.total_value)
    }, 0).toFixed(2);

    const totalEarnings = (totalSales - totalPurchases).toFixed(2);

    return (
        <ReportLayout>
            <Head title="Relatório de Compras"/>

            <div className="w-full text-center">
                <h2>Relatório de Faturamento
                    {requestHas('initial_date') && ` De ${requestDate('initial_date')}`}
                    {requestHas('final_date') && ` Até ${requestDate('final_date')}`}
                </h2>
            </div>


            <table className="bg-white text-neutral-700  text-xs w-full">
                <thead>
                <tr className="border border-neutral-600 bg-neutral-200">
                    <th className="text-center" colSpan="5"><h4>Soma Total</h4></th>
                </tr>
                <tr className="border border-neutral-600">
                    <th className="border border-neutral-500 px-2">Total Em Vendas</th>
                    <th className="border border-neutral-500 px-2">Total Em Compras</th>
                    <th className="border border-neutral-500 px-2">Lucro Total</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border border-neutral-600">
                    <td className="border border-neutral-500 px-2">
                        {totalSales}
                    </td>
                    <td className="border border-neutral-500 px-2">
                        {totalPurchases}
                    </td>
                    <td className={`border border-neutral-500 px-2 ${totalEarnings < 0 ? "text-red-600" : totalEarnings > 0 ? "text-green-600" : "text-orange-600"}`}>
                        {totalEarnings}
                    </td>
                </tr>
                </tbody>
            </table>

            <table className="bg-white text-neutral-700  text-xs w-full mt-4">
                <thead>
                <tr className="border border-neutral-600 bg-neutral-200">
                    <th className="text-center" colSpan="5"><h4>Dados Totais de Vendas</h4></th>
                </tr>
                <tr className="border border-neutral-600">
                    <th className="border border-neutral-500 px-2">Total de Vendas</th>
                    <th className="border border-neutral-500 px-2">Total de Descontos Dados</th>
                    <th className="border border-neutral-500 px-2">Total de Taxas Cobradas</th>
                    <th className="border border-neutral-500 px-2">Total Bruto Recebido</th>
                    <th className="border border-neutral-500 px-2">Total Líquido Recebido</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border border-neutral-600">
                    <td className="border border-neutral-500 px-2">{props.earnings.sales.length}</td>
                    <td className="border border-neutral-500 px-2">
                        {props.earnings.sales.reduce((total, sale) => {
                            return total + parseFloat(sale.discount)
                        }, 0).toFixed(2)}
                    </td>
                    <td className="border border-neutral-500 px-2">
                        {props.earnings.sales.reduce((total, sale) => {
                            return total + parseFloat(sale.taxes)
                        }, 0).toFixed(2)}
                    </td>
                    <td className="border border-neutral-500 px-2">
                        {props.earnings.sales.reduce((total, sale) => {
                            return total + parseFloat(sale.value)
                        }, 0).toFixed(2)}
                    </td>
                    <td className="border border-neutral-500 px-2">{totalSales}</td>
                </tr>
                </tbody>
            </table>

            <table className="bg-white text-neutral-700  text-xs w-full mt-4">
                <thead>
                <tr className="border border-neutral-600 bg-neutral-200">
                    <th className="text-center" colSpan="5"><h4>Dados Totais De Compras</h4></th>
                </tr>
                <tr className="border border-neutral-600">
                    <th className="border border-neutral-500 px-2">Total de Compras</th>
                    <th className="border border-neutral-500 px-2">Total de Descontos Recebidos</th>
                    <th className="border border-neutral-500 px-2">Total de Taxas Pagas</th>
                    <th className="border border-neutral-500 px-2">Total Bruto Pago</th>
                    <th className="border border-neutral-500 px-2">Total Líquido Pago</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border border-neutral-600">
                    <td className="border border-neutral-500 px-2">{props.earnings.purchases.length}</td>
                    <td className="border border-neutral-500 px-2">
                        {props.earnings.purchases.reduce((total, purchase) => {
                            return total + parseFloat(purchase.discount)
                        }, 0).toFixed(2)}
                    </td>
                    <td className="border border-neutral-500 px-2">
                        {props.earnings.purchases.reduce((total, purchase) => {
                            return total + parseFloat(purchase.taxes)
                        }, 0).toFixed(2)}
                    </td>
                    <td className="border border-neutral-500 px-2">
                        {props.earnings.purchases.reduce((total, purchase) => {
                            return total + parseFloat(purchase.value)
                        }, 0).toFixed(2)}
                    </td>
                    <td className="border border-neutral-500 px-2">{totalPurchases}</td>
                </tr>
                </tbody>
            </table>

            <table className="bg-white text-neutral-700  text-xs w-full mt-4">
                <thead>
                <tr className="border border-neutral-600 bg-neutral-200">
                    <th colSpan="7"><h4>Vendas Realizadas</h4></th>
                </tr>
                <tr className="border border-neutral-600">
                    <th className="border border-neutral-500 px-2">ID</th>
                    <th className="border border-neutral-500 px-2">Data</th>
                    <th className="border border-neutral-500 px-2">Produtos</th>
                    <th className="border border-neutral-500 px-2">SubTotal</th>
                    <th className="border border-neutral-500 px-2">Taxas</th>
                    <th className="border border-neutral-500 px-2">Desconto</th>
                    <th className="border border-neutral-500 px-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {props.earnings.sales.map((sell) => (
                    <tr key={sell.id} className="border border-neutral-600">
                        <td className="border border-neutral-500 px-2">{sell.id}</td>
                        <td className="border border-neutral-500 px-2">{sell.formatted_date}</td>
                        <td className="border border-neutral-500 px-2">
                            <div className="flex flex-col gap-3">
                                {countProducts(sell.products).map((product) => (
                                    <div className="flex gap-2 items-center justify-between">
                                        <ProductCard product={product} key={`produtos_${product.id}`}
                                                     className={"text-neutral-800"}/>
                                        <span>x{product.total}</span>
                                    </div>
                                ))}
                            </div>
                        </td>
                        <td
                            className="border border-neutral-500 px-2 text-neutral-500">{sell.value.toFixed(2).replace(".", ",")}</td>
                        <td
                            className="border border-neutral-500 px-2 text-red-300">{sell.taxes.toFixed(2).replace(".", ",")}</td>
                        <td
                            className="border border-neutral-500 px-2 text-green-300">{sell.discount.toFixed(2).replace(".", ",")}</td>
                        <td>{sell.total_value.toFixed(2).replace(".", ",")}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <table className="bg-white text-neutral-700 text-xs w-full mt-4">
                <thead>
                <tr className="border border-neutral-600 bg-neutral-200">
                    <th colSpan="7"><h4>Compras Realizadas</h4></th>
                </tr>
                <tr className="border border-neutral-600">
                    <th className="border border-neutral-500 px-2">ID</th>
                    <th className="border border-neutral-500 px-2">Data</th>
                    <th className="border border-neutral-500 px-2">Produtos</th>
                    <th className="border border-neutral-500 px-2">SubTotal</th>
                    <th className="border border-neutral-500 px-2">Taxas</th>
                    <th className="border border-neutral-500 px-2">Desconto</th>
                    <th className="border border-neutral-500 px-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {props.earnings.purchases.map((purchase) => (
                    <tr key={purchase.id} className="border border-neutral-600">
                        <td className="border border-neutral-500 px-2">{purchase.id}</td>
                        <td className="border border-neutral-500 px-2">{purchase.formatted_date}</td>
                        <td className="border border-neutral-500 px-2">
                            <div className="flex flex-col gap-3">
                                {countProducts(purchase.products).map((product) => (
                                    <div className="flex gap-2 items-center justify-between">
                                        <ProductCard product={product} key={`produtos_${product.id}`}
                                                     className={"text-neutral-800"}/>
                                        <span>x{product.total}</span>
                                    </div>
                                ))}
                            </div>
                        </td>
                        <td
                            className="border border-neutral-500 px-2 text-neutral-500">{purchase.value.toFixed(2).replace(".", ",")}</td>
                        <td
                            className="border border-neutral-500 px-2 text-red-300">{purchase.taxes.toFixed(2).replace(".", ",")}</td>
                        <td
                            className="border border-neutral-500 px-2 text-green-300">{purchase.discount.toFixed(2).replace(".", ",")}</td>
                        <td>{purchase.total_value.toFixed(2).replace(".", ",")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </ReportLayout>
    );
}
