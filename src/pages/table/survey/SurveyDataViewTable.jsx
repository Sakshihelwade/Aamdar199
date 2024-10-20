


import React, { useState, useEffect } from 'react';
// import EditModal from './EditModal';

const SurveyDataViewTable = ({ Props, onPageChange, voterCount }) => {
    console.log(Props, "//")
    // console.log(voterCount.total)
    const [activeModal, setActiveModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [inputPage, setInputPage] = useState();
    console.log(currentPage, "/////////")
    const data = Props?.length > 0 ? Props : [];
    const totalPages = Math.ceil(voterCount?.total / rowsPerPage);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    let currentRows = data;

    const ActiveDiactiveModal = (value) => {
        setActiveModal(value);
    };

    useEffect(() => {
        if (onPageChange) {
            onPageChange(currentPage);
        }
    }, [currentPage, onPageChange, currentRows]);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        setInputPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        setInputPage(currentPage + 1);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
        setInputPage(1);
    };

    const handleRowClick = (row) => {
        setSelectedRowData(row);
        setActiveModal(true);
    };

    const handlePageInputChange = (e) => {
        const page = Number(e.target.value);
        if (page > 0 && page <= totalPages) {
            setInputPage(page);
        }
    };

    const handlePageJump = () => {
        if (inputPage > 0 && inputPage <= totalPages) {
            setCurrentPage(inputPage);
            setInputPage('')
        }
    };

    return (
        <div className="p-1">
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            {/* Table Headers */}
                            <th className="px-1 py-2 border border-gray-300">दिनांक</th>
                            <th className="px-1 py-2 border border-gray-300">एकूण सर्व्हर फाईल</th>
                            <th className="px-1 py-2 border border-gray-300">सर्वेअरचे नाव</th>
                            <th className="px-1 py-2 border border-gray-300">मोबाईल नं</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {currentRows.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100"
                                onClick={() => handleRowClick(row)}
                            >
                                {/* Table Data */}
                                <td className="px-1 py-2 border border-gray-300">{row.name}</td>
                                <td className="px-1 py-2 border border-gray-300">{row.MOBILE_NO}</td>
                                <td className="px-1 py-2 border border-gray-300">{row.address}</td>
                                <td className="px-1 py-2 border border-gray-300">{row.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-2">
                <button
                    onClick={handlePrevious}
                    className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <div className="flex items-center">
                    <span>Page No</span>
                    <input
                        type="text"
                        value={inputPage}
                        onChange={handlePageInputChange}
                        className="border border-gray-300 text-center w-16 mx-2"
                    />
                    <button
                        onClick={handlePageJump}
                        className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md"
                    >
                        Go
                    </button>
                </div>


                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default SurveyDataViewTable;
