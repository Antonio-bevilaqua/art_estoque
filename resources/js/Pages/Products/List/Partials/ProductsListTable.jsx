import TableFullWidth from "@/Components/Tables/TableFullWidth";
import ProductCard from "@/Components/Products/ProductCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons'
import Button from "@/Components/Buttons/Button";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {Link} from "@inertiajs/react";
import Modal from "@/Components/Modals/Modal";
import {useState} from "react";
import Alert from "@/Components/Alert";
import {router} from '@inertiajs/react'

export default function ProductsListTable({products}) {
    const [removingProduct, setRemovingProduct] = useState(null);

    function handlePageChange(page) {
        window.location.href = route('products.list', {'page': page});
    }

    return (
        <>
            <TableFullWidth
                onPageChange={handlePageChange}
                actualPage={products.current_page}
                lastPage={products.last_page}
                hasPagination={true}
            >
                <thead>
                <TableFullWidth.Tr>
                    <TableFullWidth.Th>ID</TableFullWidth.Th>
                    <TableFullWidth.Th>Produto</TableFullWidth.Th>
                    <TableFullWidth.Th>Valor Compra</TableFullWidth.Th>
                    <TableFullWidth.Th>Valor Venda</TableFullWidth.Th>
                    <TableFullWidth.Th>Estoque</TableFullWidth.Th>
                    <TableFullWidth.Th>Opções</TableFullWidth.Th>
                </TableFullWidth.Tr>
                </thead>
                <tbody>
                {products.data.length > 0 ? products.data.map((produto) => (
                    <TableFullWidth.Tr key={produto.id}>
                        <TableFullWidth.Td>{produto.id}</TableFullWidth.Td>
                        <TableFullWidth.Td>
                            <ProductCard product={produto}/>
                        </TableFullWidth.Td>
                        <TableFullWidth.Td>{produto.buy_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td>{produto.sell_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td>{produto.stock}</TableFullWidth.Td>
                        <TableFullWidth.Td>
                            <div className="flex gap-1">
                                <Link href={route("products.edit", {produto: produto.id})}>
                                    <Button type={"info"} outline title="Editar Produto" iconButton>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                </Link>
                                <Button type={"danger"} outline title="Remover Produto" iconButton
                                        onClick={() => setRemovingProduct(produto)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </div>
                        </TableFullWidth.Td>
                    </TableFullWidth.Tr>
                )) : (
                    <TableFullWidth.Tr>
                        <TableFullWidth.Td className="text-center" colSpan={6}>Nenhum produto
                            encontrado.</TableFullWidth.Td>
                    </TableFullWidth.Tr>
                )}
                </tbody>
            </TableFullWidth>
            {removingProduct && (
                <Modal open={true}>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faTrash}/> Remover Produto

                        <span className="absolute top-0 right-0 p-2">
                            <Button type="danger" iconButton onClick={() => setRemovingProduct(null)}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Button>
                        </span>
                    </Modal.Title>
                    <Modal.Body>
                        <p>Deseja realmente remover o produto {removingProduct.name}?</p>
                        <Alert type="danger" title="Atenção!"
                               message="Esta ação removerá o produto completamente e é irreversível!"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link
                            method="delete"
                            href={route('products.delete', {produto: removingProduct.id})}
                        >
                            <Button type="primary" className="px-3 py-2" onClick={() => setRemovingProduct(null)}>
                                Sim, remover
                            </Button>
                        </Link>
                        <Button
                            type="danger"
                            className="px-3 py-2"
                            onClick={() => setRemovingProduct(null)}
                        >
                            Não, cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}
