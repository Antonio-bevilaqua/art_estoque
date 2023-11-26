export const currencyFormatter = (value) => {
    if (typeof value === "number") {
        value = value.toFixed(2).toString();
    }
    if (value === "") return value;
    value = value.replace(/\D/g, "");
    let newValue = "";
    let skipZeros = true;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === '0' && skipZeros) {
            continue;
        }

        newValue += value[i];
        skipZeros = false;
    }
    for (let i = newValue.length; i < 3; i++) {
        newValue = '0' + newValue;
    }
    return newValue.replace(/(\d)(\d{2})$/, "$1.$2");
}

export const integerFormatter = (value) => {
    return value.replace(/\D/g, "");
}

export const countProducts = (products) => {
    let addedProducts = [];
    let toShowProducts = [];

    products.forEach((product) => {
        const productIndex = addedProducts.indexOf(product.id);
        if (productIndex >= 0) {
            toShowProducts[productIndex].total++;
            return;
        }

        toShowProducts.push({...product, total: 1});
        addedProducts.push(product.id);
    });

    return toShowProducts;
}
