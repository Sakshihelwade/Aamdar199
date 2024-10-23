//     import React, { useState, useMemo, useEffect } from "react";
//     import { advancedTable } from "../../../constant/table-data";
//     import Card from "@/components/ui/Card";
//     import Icon from "@/components/ui/Icon";
//     import {
//         useTable,
//         useRowSelect,
//         useSortBy,
//         useGlobalFilter,
//         usePagination,
//     } from "react-table";
//     import GlobalFilter from "../react-tables/GlobalFilter";

//     const COLUMNS = [
//         {
//             Header: "नाव",
//             accessor: "name",
//             Cell: (row) => {
//                 return <span>{row?.cell?.value}</span>;
//             },
//         },
//         {
//             Header: "संख्या",
//             accessor: "count",
//             Cell: (row) => {
//                 return <span>{row?.cell?.value}</span>;
//             }
//         }
//         //   
//     ];

//     const IndeterminateCheckbox = React.forwardRef(
//         ({ indeterminate, ...rest }, ref) => {
//             const defaultRef = React.useRef();
//             const resolvedRef = ref || defaultRef;

//             React.useEffect(() => {
//                 resolvedRef.current.indeterminate = indeterminate;
//             }, [resolvedRef, indeterminate]);

//             return (
//                 <>
//                     <input
//                         type="checkbox"
//                         ref={resolvedRef}
//                         {...rest}
//                         className="table-checkbox"
//                     />
//                 </>
//             );
//         }
//     );

//     const DubarTable1 = ({ title = "दुबार", Props,voterCount,handleDubarVoter}) => {
//     console.log(Props,"PropsPropsProps")

//         const columns = useMemo(() => COLUMNS, []);
//         // const data = useMemo(() => Props, []);
//         const [data,setData]=useState([])
//     console.log(data,"data./////./////.///")

// useEffect(()=>{
//     setData(Props)
// },[Props])

//         const tableInstance = useTable(
//             {
//                 columns,
//                 data,
//             },

//             useGlobalFilter,
//             useSortBy,
//             usePagination,
//             useRowSelect,
//         );
//         const {
//             getTableProps,
//             getTableBodyProps,
//             headerGroups,
//             footerGroups,
//             page,
//             nextPage,
//             previousPage,
//             canNextPage,
//             canPreviousPage,
//             pageOptions,
//             state,
//             gotoPage,
//             pageCount,
//             setPageSize,
//             setGlobalFilter,
//             prepareRow,
//         } = tableInstance;

//         const { globalFilter, pageIndex, pageSize } = state;
//         return (
//             <>
//                 <Card>
//                     <div className="md:flex justify-between items-center mb-6">
//                         <h4 className="card-title">{title}</h4>
//                         {/* <div>
//                             <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
//                         </div> */}
//                     </div>
//                     <div className="overflow-x-auto -mx-6">
//                         <div className="inline-block min-w-full align-middle">
//                             <div className="overflow-hidden ">
//                                 <table
//                                     className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
//                                     {...getTableProps}
//                                 >
//                                     <thead className="bg-slate-200 dark:bg-slate-700">
//                                         {headerGroups.map((headerGroup) => (
//                                             <tr {...headerGroup.getHeaderGroupProps()}>
//                                                 {headerGroup.headers.map((column) => (
//                                                     <th
//                                                         {...column.getHeaderProps(
//                                                             column.getSortByToggleProps()
//                                                         )}
//                                                         scope="col"
//                                                         className=" table-th "
//                                                     >
//                                                         {column.render("Header")}
//                                                         <span>
//                                                             {column.isSorted
//                                                                 ? column.isSortedDesc
//                                                                     ? " 🔽"
//                                                                     : " 🔼"
//                                                                 : ""}
//                                                         </span>
//                                                     </th>
//                                                 ))}
//                                             </tr>
//                                         ))}
//                                     </thead>
//                                     <tbody
//     className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
//     {...getTableBodyProps()}
// >
//     {page.map((row) => {
//         prepareRow(row);
//         return (
//             <tr
//                 {...row.getRowProps()}
//                 onClick={() => handleDubarVoter(row.original)} // Pass row data
//                 className="cursor-pointer" // Add some visual feedback for clickability
//             >
//                 {row.cells.map((cell) => {
//                     return (
//                         <td {...cell.getCellProps()} className="table-td">
//                             {cell.render("Cell")}
//                         </td>
//                     );
//                 })}
//             </tr>
//         );
//     })}
// </tbody>

//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
//                         <div className=" flex items-center space-x-3 rtl:space-x-reverse">
//                             <select
//                                 className="form-control py-2 w-max"
//                                 value={pageSize}
//                                 onChange={(e) => setPageSize(Number(e.target.value))}
//                             >
//                                 {[10, 25, 50].map((pageSize) => (
//                                     <option key={pageSize} value={pageSize}>
//                                         Show {pageSize}
//                                     </option>
//                                 ))}
//                             </select>
//                             <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
//                                 Page{" "}
//                                 <span>
//                                     {pageIndex + 1} of {pageOptions.length}
//                                 </span>
//                             </span>
//                         </div>
//                     </div>

//                     <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
//                         <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
//                             <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                                 <button
//                                     className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
//                                         }`}
//                                     onClick={() => gotoPage(0)}
//                                     disabled={!canPreviousPage}
//                                 >
//                                     <Icon icon="heroicons:chevron-double-left-solid" />
//                                 </button>
//                             </li>
//                             <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                                 <button
//                                     className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
//                                         }`}
//                                     onClick={() => previousPage()}
//                                     disabled={!canPreviousPage}
//                                 >
//                                     Prev
//                                 </button>
//                             </li>
//                             {pageOptions.map((page, pageIdx) => (
//                                 <li key={pageIdx}>
//                                     <button
//                                         href="#"
//                                         aria-current="page"
//                                         className={` ${pageIdx === pageIndex
//                                             ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
//                                             : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
//                                             }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
//                                         onClick={() => gotoPage(pageIdx)}
//                                     >
//                                         {page + 1}
//                                     </button>
//                                 </li>
//                             ))}
//                             <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                                 <button
//                                     className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
//                                         }`}
//                                     onClick={() => nextPage()}
//                                     disabled={!canNextPage}
//                                 >
//                                     Next
//                                 </button>
//                             </li>
//                             <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                                 <button
//                                     onClick={() => gotoPage(pageCount - 1)}
//                                     disabled={!canNextPage}
//                                     className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
//                                         }`}
//                                 >
//                                     <Icon icon="heroicons:chevron-double-right-solid" />
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                     {/*end*/}
//                 </Card>
//             </>
//         );
//     };

//     export default DubarTable1;

import React, { useState, useMemo, useEffect } from "react";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const COLUMNS = [
    {
        Header: "नाव",
        accessor: "name",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: "संख्या",
        accessor: "count",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        }
    }
    // Add more columns as needed
];

const DubarTable1 = ({ title = "", Props, voterCount, handleDubarVoter }) => {
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState([]);
    // console.log(prop,"propss")
    useEffect(() => {
        setData(Props);
    }, [Props]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
    } = tableInstance;

    const { pageIndex, pageSize } = state;

    // Function to create pagination with ellipsis
    const renderPageNumbers = () => {
        const visiblePageCount = 3; // Number of pages to show before/after the current page
        const totalPages = pageCount;
        const pages = [];

        if (totalPages <= 5) {
            // If total pages are 5 or less, show all
            for (let i = 0; i < totalPages; i++) {
                pages.push(
                    <li key={i}>
                        <button
                            className={` ${i === pageIndex
                                ? "bg-slate-900 dark:bg-slate-600 text-white font-medium"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400"
                                } text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center`}
                            onClick={() => gotoPage(i)}
                        >
                            {i + 1}
                        </button>
                    </li>
                );
            }
        } else {
            // If there are more than 5 pages, add ellipsis logic
            if (pageIndex > visiblePageCount) {
                pages.push(
                    <li key="first">
                        <button
                            className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400 text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center"
                            onClick={() => gotoPage(0)}
                        >
                            1
                        </button>
                    </li>,
                    <li key="start-ellipsis">...</li>
                );
            }

            // Show pages around current page
            for (let i = Math.max(0, pageIndex - visiblePageCount); i <= Math.min(pageIndex + visiblePageCount, totalPages - 1); i++) {
                pages.push(
                    <li key={i}>
                        <button
                            className={` ${i === pageIndex
                                ? "bg-slate-900 dark:bg-slate-600 text-white font-medium"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400"
                                } text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center`}
                            onClick={() => gotoPage(i)}
                        >
                            {i + 1}
                        </button>
                    </li>
                );
            }

            if (pageIndex < totalPages - visiblePageCount - 1) {
                pages.push(
                    <li key="end-ellipsis">...</li>,
                    <li key="last">
                        <button
                            className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400 text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center"
                            onClick={() => gotoPage(totalPages - 1)}
                        >
                            {totalPages}
                        </button>
                    </li>
                );
            }
        }

        return pages;
    };

    return (
        <>
            {/* <div className="md:flex justify-between items-center mb-6">
                <h4 className="card-title">{title}</h4>
            </div> */}
            <div className="overflow-x-auto -mx-6 mt-1">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table
                            className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                            {...getTableProps()}
                        >
                            <thead className="bg-gray-300 dark:bg-slate-700">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="table-th h-[26px]"
                                            >
                                                {column.render("Header")}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? " 🔽"
                                                            : " 🔼"
                                                        : ""}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody
                                className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                {...getTableBodyProps()}
                            >
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            onClick={() => handleDubarVoter(row.original)}
                                            className="cursor-pointer"
                                        >
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} className="table-td py-3">
                                                    {cell.render("Cell")}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* <select
                        className="form-control py-2 w-max"
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[10, 25, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select> */}
                    {/* <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Page{" "}
                        <span>
                            {pageIndex + 1} of {pageOptions.length}
                        </span>
                    </span> */}
                </div>
            </div>

            {/* <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                <ul className="flex items-center space-x-3 rtl:space-x-reverse">
                    <li>
                        <button
                            className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            <Icon icon="heroicons:chevron-double-left-solid" />
                        </button>
                    </li>
                    <li>
                        <button
                            className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            Prev
                        </button>
                    </li>
                    {renderPageNumbers()}
                    <li>
                        <button
                            className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            Next
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                            className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <Icon icon="heroicons:chevron-double-right-solid" />
                        </button>
                    </li>
                </ul>
            </div> */}
        </>
    );
};

export default DubarTable1;
