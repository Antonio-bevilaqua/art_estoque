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

export default function SellingsListTable({sellings}) {
    const [removingSell, setRemovingSell] = useState(null);

    function handlePageChange(page) {
        router.get(route('sellings.list', {'page': page}));
    }

    return (
        <>
            <TableFullWidth
                onPageChange={handlePageChange}
                actualPage={sellings.current_page}
                lastPage={sellings.last_page}
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
                {sellings.data.length > 0 ? sellings.data.map((sell) => (
                    <TableFullWidth.Tr key={sell.id}>
                        <TableFullWidth.Td>{sell.id}</TableFullWidth.Td>
                        <TableFullWidth.Td>{sell.formatted_date}</TableFullWidth.Td>
                        <TableFullWidth.Td>
                            <div className="flex flex-col gap-3">
                                {countProducts(sell.products).map((product) => (
                                    <div className="flex gap-2 items-center justify-between">
                                        <ProductCard product={product} key={`produtos_${product.id}`}/>
                                        <span>x{product.total}</span>
                                    </div>
                                ))}
                            </div>
                        </TableFullWidth.Td>
                        <TableFullWidth.Td
                            className="text-neutral-500">{sell.value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td
                            className="text-red-300">{sell.taxes.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td
                            className="text-green-300">{sell.discount.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td>{sell.total_value.toFixed(2).replace(".", ",")}</TableFullWidth.Td>
                        <TableFullWidth.Td>
                            <div className="flex gap-1">
                                <Link href={route("sellings.edit", {selling: sell.id})}>
                                    <Button type={"info"} outline title="Editar venda" iconButton>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                </Link>
                                <Button type={"danger"} outline title="Remover venda" iconButton
                                        onClick={() => setRemovingSell(sell)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </div>
                        </TableFullWidth.Td>
                    </TableFullWidth.Tr>
                )) : (
                    <TableFullWidth.Tr>
                        <TableFullWidth.Td className="text-center" colSpan={9}>Nenhuma venda
                            encontrada.</TableFullWidth.Td>
                    </TableFullWidth.Tr>
                )}
                </tbody>
            </TableFullWidth>
            {removingSell && (
                <Modal open={true}>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faTrash}/> Remover venda

                        <span className="absolute top-0 right-0 p-2">
                            <Button type="danger" iconButton onClick={() => setRemovingSell(null)}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Button>
                        </span>
                    </Modal.Title>
                    <Modal.Body>
                        <p>Deseja realmente remover a venda #{removingSell.id}?</p>
                        <Alert type="danger" title="Atenção!"
                               message="Esta ação removerá a venda completamente, afetando os relatórios de rendimento mas não irá alterar seus estoques!"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link
                            method="delete"
                            href={route('sellings.delete', {purchase: removingSell.id})}
                        >
                            <Button type="primary" className="px-3 py-2" onClick={() => setRemovingSell(null)}>
                                Sim, remover
                            </Button>
                        </Link>
                        <Button
                            type="danger"
                            className="px-3 py-2"
                            onClick={() => setRemovingSell(null)}
                        >
                            Não, cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}
