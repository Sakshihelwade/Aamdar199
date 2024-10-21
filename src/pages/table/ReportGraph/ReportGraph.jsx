import React, { useEffect, useState } from 'react';
import BarGraph from './BarGraph';
// import { Card, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { components } from "react-select";

import axios from 'axios';
import { base_url } from '../../../config/base_url';
import { Card } from '@mui/material';

const ReportGraph = () => {
    const [villageId, setVillageId] = useState('');
    const [villageName, setVillageName] = useState('दौंड');
    const [yearId,setYearId]=useState('')
    const [yearName,setYearName]=useState('2019')
    const [villageOption,setVillageOption]=useState([])
    const [yearOption,setYearOption]=useState([])
const id=localStorage.getItem('_id')

 console.log(villageName)
 console.log(yearName)

    const handleVillageChange = (selectedOption) => {
        setVillageId(selectedOption?.value || "");
        setVillageName(selectedOption?.label || "");
      };

      const handleYearChange = (selectedOption) => {
        setYearId(selectedOption?.value || "");
        setYearName(selectedOption?.label || "");
      };

    const getVillageOption = () => {
        axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
          .then((resp) => {
           
            const villageoption = resp.data.village.map((item) => ({
              label: item.name,
              value: item._id
            }));
            setVillageOption(villageoption);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    

      const getYear = () => {
        axios.get(`${base_url}/getYear`)
          .then((resp) => {
            const year = resp.data.year.map((item) => ({
              label: item.year,
              value: item._id
            }));
            setYearOption(year);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      useEffect(()=>{
        getVillageOption()
        getYear()
      },[])

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                {/* <div className="lg:col-span-12 col-span-12">
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
                                    // value={}
                                    // options={villageOption}
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
  value={villageOption.find(option => option.value === villageId) || null} 
  options={villageOption}
  onChange={handleVillageChange} 
  className="react-select"
  classNamePrefix="select"
/>
</div>
                        </div>
                    </Card>
                </div> */}

                <div className="lg:col-span-12 col-span-12">
                    <Card>
                    <div className="mb-2 flex justify-between mx-2">
                            <h6 className="font-bold text-[#b91c1c]">अहवाल</h6>
                        </div>
                        <hr className="mb-3" />
                        <p className=' mx-2'>
                            <span className="font-bold">विधानसभा</span>{" "}
                            <span className="font-bold text-lg">199</span>
                        </p>

                        <div className=' grid grid-cols-4 gap-2 mx-2'>
                        <div>
        <label className="form-label" htmlFor="mul_1">
        वर्ष
        </label>
  <Select
  // isClearable={true}
  placeholder="वर्ष"
  name="वर्ष" 
  value={yearOption.find(option => option.value === yearId) || null} 
  options={yearOption}
  onChange={handleYearChange} 
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
  value={villageOption.find(option => option.value === villageId) || null} 
  options={villageOption}
  onChange={handleVillageChange} 
  className="react-select"
  classNamePrefix="select"
/>
</div>

                        </div>
                        <div className="legend-ring">
                            <BarGraph  year={yearName} village={villageName}/>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ReportGraph;
