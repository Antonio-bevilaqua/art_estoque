import TableFullWidth from "@/Components/Tables/TableFullWidth";
import ProductCard from "@/Components/Products/ProductCard";

export default function ProductsTable({products}) {
    return (
        <TableFullWidth>
            <thead>
            <TableFullWidth.Tr>
                <TableFullWidth.Th>ID</TableFullWidth.Th>
                <TableFullWidth.Th>Produto</TableFullWidth.Th>
                <TableFullWidth.Th>Valor Compra</TableFullWidth.Th>
                <TableFullWidth.Th>Valor Venda</TableFullWidth.Th>
                <TableFullWidth.Th>Estoque</TableFullWidth.Th>
            </TableFullWidth.Tr>
            </thead>
            <tbody>
            {products.length > 0 ? products.map((produto) => (
                <TableFullWidth.Tr key={produto.id}>
                    <TableFullWidth.Td>{produto.id}</TableFullWidth.Td>
                    <TableFullWidth.Td>
                        <ProductCard product={produto}/>
                    </TableFullWidth.Td>
                    <TableFullWidth.Td>{produto.buy_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td>{produto.sell_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                    <TableFullWidth.Td>{produto.stock}</TableFullWidth.Td>
                </TableFullWidth.Tr>
            )) : (
                <TableFullWidth.Tr>
                    <TableFullWidth.Td className="text-center" colSpan={5}>Nenhum produto
                        encontrado.</TableFullWidth.Td>
                </TableFullWidth.Tr>
            )}
            </tbody>
        </TableFullWidth>
    )
}
