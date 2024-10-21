import React, { useState } from 'react';
import BarGraph from './BarGraph';
import { Card, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ReportGraph = () => {
    const [villageId, setVillageId] = useState('');
    const [villageName, setVillageName] = useState('');

    const handleVillageChange = (event) => {
        const selectedValue = event.target.value;
        const selectedVillage = villageOptions.find(v => v.value === selectedValue);
        setVillageId(selectedValue);
        setVillageName(selectedVillage?.label || "");
    };

    const villageOptions = [
        { label: "village1", value: 1 },
        { label: "village2", value: 2 },
    ];

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="lg:col-span-12 col-span-12">
                    <Card className='p-4'>
                        <div className="mb-2 flex justify-between">
                            <h6 className="font-bold text-[#b91c1c]">अहवाल</h6>
                        </div>
                        <hr className="mb-3" />
                        <p>
                            <span className="font-bold">विधानसभा</span>{" "}
                            <span className="font-bold text-lg">199</span>
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            <div>
                                <label className="form-label" htmlFor="mul_1">
                                    वर्ष
                                </label>
                                <Select
                                    // isClearable={true}
                                    placeholder="वर्ष"
                                    name="वर्ष"
                                    value={villageOptions}
                                    options={villageOptions}
                                    onChange={handleVillageChange}
                                    className="react-select"
                                    classNamePrefix="select"
                                />
                            </div>
                            <div>
                                <label className="form-label" htmlFor="mul_1">
                                    गाव
                                </label>
                                <Select
                                    // isClearable={true}
                                    placeholder="गाव"
                                    name="गाव"
                                    value={villageOptions}
                                    options={villageOptions}
                                    onChange={handleVillageChange}
                                    className="react-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-12 col-span-12">
                    <Card>
                        <div className="legend-ring">
                            <BarGraph />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ReportGraph;
