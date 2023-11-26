import ProductCard from "@/Components/Products/ProductCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {integerFormatter} from "@/utils/functions";

export default function TransactionProducts({products, ids, changeQuantity, removeProductHandler}) {
    const maskQuantity = (value) => {
        value = integerFormatter(value);
        if (value < 1) value = 1;
        return value;
    }

    return (
        <div className="flex flex-col">
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">Produtos Adicionados</h4>
            <div className="flex flex-col gap-2">
                {products.filter((product) => ids.includes(product.id)).map((product) => {
                    const quantity = ids.filter((id) => id === product.id).length;
                    return (
                        <div className="flex-1" key={product.id}>
                            <div className="flex justify-between border border-neutral-400 rounded-md p-2 w-full"
                                 key={product.id}>
                                <ProductCard product={product}/>

                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1">
                                        <InputLabel htmlFor="products_qtd" value="QTD:"/>

                                        <TextInput
                                            id="products_qtd"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => changeQuantity(product.id, quantity, maskQuantity(e.target.value))}
                                            type="number"
                                            step="1"
                                            className="w-20"
                                        />
                                    </div>
                                    <button className="text-red-300" type="button"
                                            onClick={() => removeProductHandler(product.id)}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
