import TableFullWidth from "@/Components/Tables/TableFullWidth";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons'
import Button from "@/Components/Buttons/Button";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {Link} from "@inertiajs/react";
import Modal from "@/Components/Modals/Modal";
import {useState} from "react";
import Alert from "@/Components/Alert";
import {router} from '@inertiajs/react'
import ProductCard from "@/Components/Products/ProductCard";
import {countProducts} from "@/utils/functions";

export default function PurchasesListTable({purchases, request}) {
    const [removingPurchase, setRemovingPurchase] = useState(null);

    function handlePageChange(page) {
        router.get(route('purchases.list', {...request, 'page': page}));
    }

    return (
        <>
            <TableFullWidth
                onPageChange={handlePageChange}
                actualPage={purchases.current_page}
                lastPage={purchases.last_page}
                hasPagination={true}
            >
                <thead>
                <TableFullWidth.Tr>
                    <TableFullWidth.Th>ID</TableFullWidth.Th>
                    <TableFullWidth.Th>Data</TableFullWidth.Th>
                    <TableFullWidth.Th>Produtos</TableFullWidth.Th>
                    <TableFullWidth.Th>SubTotal</TableFullWidth.Th>
                    <TableFullWidth.Th>Taxas</TableFullWidth.Th>
                    <TableFullWidth.Th>Desconto</TableFullWidth.Th>
                    <TableFullWidth.Th>Total</TableFullWidth.Th>
                    <TableFullWidth.Th>Opções</TableFullWidth.Th>
                </TableFullWidth.Tr>
                </thead>
                <tbody>
                {purchases.data.length > 0 ? purchases.data.map((purchase) => (
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
                            className="text-neutral-500">{purchase.value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td
                            className="text-red-300">{purchase.taxes.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td
                            className="text-green-300">{purchase.discount.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td>{purchase.total_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td>
                            <div className="flex gap-1">
                                <Link href={route("purchases.edit", {purchase: purchase.id})}>
                                    <Button type={"info"} outline title="Editar compra" iconButton>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                </Link>
                                <Button type={"danger"} outline title="Remover compra" iconButton
                                        onClick={() => setRemovingPurchase(purchase)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </div>
                        </TableFullWidth.Td>
                    </TableFullWidth.Tr>
                )) : (
                    <TableFullWidth.Tr>
                        <TableFullWidth.Td className="text-center" colSpan={9}>Nenhuma compra
                            encontrada.</TableFullWidth.Td>
                    </TableFullWidth.Tr>
                )}
                </tbody>
            </TableFullWidth>
            {removingPurchase && (
                <Modal open={true}>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faTrash}/> Remover compra

                        <span className="absolute top-0 right-0 p-2">
                            <Button type="danger" iconButton onClick={() => setRemovingPurchase(null)}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Button>
                        </span>
                    </Modal.Title>
                    <Modal.Body>
                        <p>Deseja realmente remover a compra #{removingPurchase.id}?</p>
                        <Alert type="danger" title="Atenção!"
                               message="Esta ação removerá a compra completamente, afetando os relatórios de rendimento mas não irá alterar seus estoques!"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link
                            method="delete"
                            href={route('purchases.delete', {purchase: removingPurchase.id})}
                        >
                            <Button type="primary" className="px-3 py-2" onClick={() => setRemovingPurchase(null)}>
                                Sim, remover
                            </Button>
                        </Link>
                        <Button
                            type="danger"
                            className="px-3 py-2"
                            onClick={() => setRemovingPurchase(null)}
                        >
                            Não, cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}
