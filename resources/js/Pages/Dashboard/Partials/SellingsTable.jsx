import TableFullWidth from "@/Components/Tables/TableFullWidth";
import {countProducts} from "@/utils/functions";
import ProductCard from "@/Components/Products/ProductCard";

export default function SellingsTable({sellings}) {
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
            {sellings.length > 0 ? sellings.map((selling) => (
                <TableFullWidth.Tr key={selling.id}>
                    <TableFullWidth.Td>{selling.id}</TableFullWidth.Td>
                    <TableFullWidth.Td>{selling.formatted_date}</TableFullWidth.Td>
                    <TableFullWidth.Td>
                        <div className="flex flex-col gap-3">
                            {countProducts(selling.products).map((product) => (
                                <div className="flex gap-2 items-center justify-between">
                                    <ProductCard product={product} key={`produtos_${product.id}`}/>
                                    <span>x{product.total}</span>
                                </div>
                            ))}
                        </div>
                    </TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-neutral-400">{selling.value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-green-300">{selling.discount.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-red-300">{selling.taxes.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td
                        className="text-blue-300">{selling.total_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                </TableFullWidth.Tr>
            )) : (
                <TableFullWidth.Tr>
                    <TableFullWidth.Td className="text-center" colSpan={6}>Nenhuma Venda
                        Encontrada.</TableFullWidth.Td>
                </TableFullWidth.Tr>
            )}
            </tbody>
        </TableFullWidth>
    )
}
