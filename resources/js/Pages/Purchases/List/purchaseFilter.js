import {currencyFormatter} from "@/utils/functions";

export const purchaseFilter = {
    'initial_date': {
        label: "Data Inicial",
        type: "date",
    },
    'final_date': {
        label: "Data Final",
        type: "date",
    },
    'min_discount': {
        label: "Valor Mínimo de Desconto",
        mask: currencyFormatter,
        type: "text",
    },
    'max_discount': final_date
        label: "Valor Máximo de Desconto",
        mask: currencyFormatter,
        type: "text",
    },
    'min_taxes': {
        label: "Valor Mínimo de Taxas",
        mask: currencyFormatter,
        type: "text",
    },
    'max_taxes': {
        label: "Valor Máximo de Taxas",
        mask: currencyFormatter,
        type: "text",
    },
    'min_total_value': {
        label: "Valor Mínimo Total",
        type: "number",
    },
    'max_total_value': {
        label: "Valor Máximo Total",
        type: "number",
    },
};
