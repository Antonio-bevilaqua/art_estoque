import CustomTable from "@/Components/CustomTable";

const TableFullWidth = ({
                            onPageChange = () => {
                            },
                            actualPage = 1,
                            firstPage = 1,
                            lastPage = 1,
                            children,
                            className = "",
                            hasPagination = false,
                            ...props
                        }) => {
    return (
        <CustomTable
            onPageChange={onPageChange}
            actualPage={actualPage}
            firstPage={firstPage}
            lastPage={lastPage}
        >
            <CustomTable.Table
                className={`border-collapse w-full border border-slate-400 dark:border-neutral-500 bg-neutral-100 text-neutral-800 dark:text-neutral-100 dark:bg-neutral-800 text-sm shadow-sm ${className}`} {...props} >
                {children}
            </CustomTable.Table>
            {hasPagination && <CustomTable.Pagination/>}
        </CustomTable>
    );
}

const Tr = ({children, className = "", ...props}) => {
    return (
        <tr className={`border border-slate-400 dark:border-neutral-500 ${className}`} {...props} >
            {children}
        </tr>
    )
}

const Th = ({children, className = "", ...props}) => {
    return (
        <th className={`p-4 border border-slate-400 dark:border-neutral-500 ${className}`} {...props} >
            {children}
        </th>
    )
}

const Td = ({children, className = "", ...props}) => {
    return (
        <td className={`p-4 border border-slate-400 dark:border-neutral-500 ${className}`} {...props} >
            {children}
        </td>
    )
}

TableFullWidth.Tr = Tr;
TableFullWidth.Th = Th;
TableFullWidth.Td = Td;

export default TableFullWidth;
