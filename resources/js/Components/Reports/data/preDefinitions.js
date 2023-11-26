import moment from "moment";

const getToday = () => {
    return moment().format('YYYY-MM-DD');
}

const getYesterday = () => {
    return moment().subtract(1, 'day').format('YYYY-MM-DD');
}

const getWeek = () => {
    return moment().subtract(1, 'week').format('YYYY-MM-DD');
}

const getMonth = () => {
    return moment().subtract(1, 'month').format('YYYY-MM-DD');
}

const getYear = () => {
    return moment().subtract(1, 'year').format('YYYY-MM-DD');
}

export const preDefinitions = [
    {
        'name': 'Hoje',
        'final_date': getToday(),
        'initial_date': getToday(),
    },
    {
        'name': 'Ontem',
        'final_date': getToday(),
        'initial_date': getYesterday(),
    },
    {
        'name': 'Semana',
        'final_date': getToday(),
        'initial_date': getWeek(),
    },
    {
        'name': 'Mês',
        'final_date': getToday(),
        'initial_date': getMonth(),
    },
    {
        'name': 'Ano',
        'final_date': getToday(),
        'initial_date': getYear(),
    },
]

export const getSelectedPreDefinition = (actual_initial_date, actual_final_date) => {
    const search = preDefinitions.map((preDefinition, idx) => {
        if (actual_initial_date == preDefinition.initial_date && actual_final_date == preDefinition.final_date) {
            return idx;
        }
    });

    if (search.length > 0) {
        return search[0];
    }

    return '';
}
