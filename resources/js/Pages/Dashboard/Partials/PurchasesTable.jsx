import TableFullWidth from "@/Components/Tables/TableFullWidth";
import ProductCard from "@/Components/Products/ProductCard";
import {countProducts} from "@/utils/functions";

export default function PurchasesTable({purchases}) {
    return (
        <TableFullWidth>
            <thead>
            <TableFullWidth.Tr>
                <TableFullWidth.Th>ID</TableFullWidth.Th>
                <TableFullWidth.Th>Data</TableFullWidth.Th>
                <TableFullWidth.Th>Produtos</TableFullWidth.Th>
                <TableFullWidth.Th>Valor</TableFullWidth.Th>
                <TableFullWidth.Th>Desconto</TableFullWidth.Th>
                <TableFullWidth.Th>Taxas</TableFullWidth.Th>
                <TableFullWidth.Th>Total</TableFullWidth.Th>
            </TableFullWidth.Tr>
            </thead>
            <tbody>
            {purchases.length > 0 ? purchases.map((purchase) => (
                <TableFullWidth.Tr key={purchase.id}>
                    <TableFullWidth.Td>{purchase.id}</TableFullWidth.Td>
                    <TableFullWidth.Td>{purchase.formatted_date}</TableFullWidth.Td>
                    <TableFullWidth.Td>
                        <div className="flex flex-col gap-3">
                            {countProducts(purchase.products).map((product) => (
                                <div className="flex gap-2 items-center justify-between">
                                    <ProductCard product={product} key={`produtos_${product.id}`}/>
                                    <span>x{product.total}</span>
                                </div>
                            ))}
                        </div>
                    </TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-neutral-400">{purchase.value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-green-300">{purchase.discount.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-red-300">{purchase.taxes.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-blue-300">{purchase.total_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                </TableFullWidth.Tr>
            )) : (
                <TableFullWidth.Tr>
                    <TableFullWidth.Td className="text-center" colSpan={6}>Nenhuma Compra
                        Encontrada.</TableFullWidth.Td>
                </TableFullWidth.Tr>
            )}
            </tbody>
        </TableFullWidth>
    )
}
