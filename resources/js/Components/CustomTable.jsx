import {useState, createContext, useContext} from 'react';
import ReactPaginate from "react-paginate";

const TableContext = createContext();


const CustomTable = ({
                         actualPage = 1,
                         onPageChange = () => {
                         },
                         firstPage = 1,
                         lastPage = 1,
                         children
                     }) => {
    const [page, setPage] = useState(actualPage);

    return (
        <TableContext.Provider value={{page, setPage, onPageChange, firstPage, lastPage}}>
            <div className="flex flex-col items-center justify-center">
                {children}
            </div>
        </TableContext.Provider>
    );
};

const Table = ({className = "", children, ...props}) => {
    return (
        <div className="relative overflow-x-auto w-full">
            <table
                className={`${className}`} {...props} >
                {children}
            </table>
        </div>
    )
}

const paginationDefaultClasses = "inline-flex items-center px-2 py-1 rounded-md font-semibold text-xs uppercase tracking-widest focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 dark:focus:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150";
const paginationNotActiveClasses = paginationDefaultClasses + " bg-transparent border border-gray-800 dark:border-neutral-200 text-neutral-800 dark:text-white hover:bg-gray-700 dark:hover:bg-white dark:hover:text-neutral-800";
const paginationActiveClasses = " rounded-sm bg-gray-800 dark:bg-gray-600 text-neutral-900 dark:text-neutral-900";
const paginationDisabledClasses = " text-neutral-600 dark:text-neutral-900";

const Pagination = () => {
    const {page, onPageChange, lastPage} = useContext(TableContext);

    const handlePageChanged = (pg) => {
        if (pg.selected === page - 1) return;

        onPageChange(pg.selected + 1);
    }

    return (
        <div className="flex w-full ">
            <ReactPaginate
                pageCount={lastPage}
                initialPage={page - 1}
                forcePage={page - 1}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChanged}
                previousLabel="&#x276E;"
                nextLabel="&#x276F;"
                containerClassName={"flex w-full gap-1 mt-1"}
                previousLinkClassName={paginationNotActiveClasses}
                nextLinkClassName={paginationNotActiveClasses}
                disabledClassName={paginationDisabledClasses}
                pageLinkClassName={paginationNotActiveClasses}
                activeClassName={paginationActiveClasses}
            />
        </div>
    );
};

CustomTable.Table = Table;
CustomTable.Pagination = Pagination;

export default CustomTable;
