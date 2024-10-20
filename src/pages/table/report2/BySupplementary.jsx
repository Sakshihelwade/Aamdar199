import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select, { components } from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const BySupplementary = () => {
  const id = localStorage.getItem('_id')
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");
  const [fromList, setFromList] = useState('')
  const [toList, setToList] = useState('')
  const [listNo, setListNo] = useState('')
  const [type, setType] = useState('')

  const [allVoter, setAllVoter] = useState('')
  const [voterCount, setVoterCount] = useState()
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption, setBoothOption] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  console.log(voterCount, "voterCount")

  const totalmalefemale = voterCount?.maleCount + voterCount?.femaleCount
  const other = voterCount?.total - totalmalefemale || 0

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleVillageChange = (e) => {
  //   const selectedOption = villageOption.find(option => option.value === e.target.value);
  //   setVillageId(e.target.value); 
  //   setVillageName(selectedOption?.label || ""); 
  // };
  const handleVillageChange = (selectedOption) => {
    setVillageId(selectedOption?.value || "");
    setVillageName(selectedOption?.label || "");
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

  const getBoothNo = () => {
    axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
      .then((resp) => {
        const boothNo = resp.data.booths.map((item) => ({
          label: item.boothNo, value: item.boothNo
        }))
        setBoothOption(boothNo)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getAllVoters = () => {
    axios.get(`${base_url}/api/surve/searchVotter/${id}?name=true&page=${currentPage}&minBooth=${fromList}&maxBooth=${toList}&village=${villageName}&boothNo=${boothNo}`)
      .then((resp) => {
        setAllVoter(resp.data.voters);
        setVoterCount(resp.data);
        toast.success('Filter Sucessfully')
      })
      .catch((error) => {
        console.log(error);
        toast.warning('No results found for the provided search criteria')
      });
  };


  const TypeOption = [
    { label: 'सर्व', value: 'सर्व' },
    { label: "नवीन मतदार", value: "नवीन मतदार" },
    { label: 'वगळणी झालेले', value: 'वगळणी झालेले' }
  ]

  useEffect(() => {
    getVillageOption();

  }, []);

  useEffect(() => {
    getBoothNo()
  }, [villageName])

  useEffect(() => {
    getAllVoters()
  }, [currentPage, boothNo, fromList, toList, type, villageName])

  const clearFields = () => {
    setVillageName('');
    setVillageId('');
    setBoothNo('');
    setFromList('');
    setToList('');
    setType('');
    getAllVoters();
  }

  return (
    <div>
      <div className=" mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">पुरवणी संक्षिप्त मतदार </h6>
            <p className=" flex gap-6">
              <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
              <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
              <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
            </p>
          </div>
          <hr className="py-2" />
          <p>

            <span className="font-bold">विधानसभा</span>{" "}
            <span className="font-bold text-lg">199</span>
          </p>
          <div className=" grid grid-cols-4 gap-2">
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
            <div>
              <label className="form-label" htmlFor="mul_1">
                भाग/बूथ नं
              </label>
              <Select
                // isClearable={true}
                placeholder="भाग/बूथ नं"
                name="भाग/बूथ नं"
                value={boothOption.find(option => option.value === boothNo) || null}
                options={boothOption}
                onChange={(selectedOption) => setBoothNo(selectedOption?.value || null)}
                className="react-select"
                classNamePrefix="select"
              />
            </div>
            <InputGroup
              type="text"
              label="यादी नं. पासून"
              id="ps-1"
              placeholder="यादी नं. पासून"
              value={fromList}
              onChange={(e) => setFromList(e.target.value)}
            />

            <InputGroup
              type="text"
              label="यादी नं. पर्यंत "
              id="ps-1"
              placeholder="यादी नं. पर्यंत "
              value={toList}
              onChange={(e) => setToList(e.target.value)}
            />
            {/* <InputGroup
            type="text"
            label="यादी नं."
            id="ps-1"
            placeholder="यादी नं."
            value={listNo}
            onChange={(e)=>setListNo(e.target.value)}
          /> */}

            {/* <Select
            label="प्रकार"
            className="w-full"
            placeholder="सर्व"
              options={TypeOption}
              onChange={(e)=>setType(e.target.value)}
              value={type}
          /> */}
            <span></span>
            <span></span>
            <span></span>
            <div className=" flex justify-end items-center mt-6">
              {/* <button className=" bg-[#b91c1c] text-white px-5 h-10 rounded-md " onClick={getAllVoters}>
              शोधा
            </button> */}
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                क्लियर करा
              </button>
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <CommonTable Props={allVoter} voterCount={voterCount}
          onPageChange={handlePageChange} />
      </Card>
    </div>
  );
};

export default BySupplementary;
