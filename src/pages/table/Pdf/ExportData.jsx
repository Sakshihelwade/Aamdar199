import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import ExportDataTable from "./ExportDataTable";
import Card from "../../../components/ui/Card";
import InputGroup from "../../../components/ui/InputGroup"; // Assuming you have this component for input fields

const ExportData = () => {
    const id = localStorage.getItem('_id');
    const [villageId, setVillageId] = useState("");
    const [villageName, setVillageName] = useState("");
    const [villageOption, setVillageOption] = useState([]);
    const [boothNo, setBoothNo] = useState("");
    const [boothOption, setBoothOption] = useState([]);
    const [allData, setAllData] = useState([]);
    const [total, setTotal] = useState('');
    const [srNo, setSrNo] = useState('');
    const [voterName, setVoterName] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [fromList, setFromList] = useState('');
    const [toList, setToList] = useState('');
    const [fromAge, setFromAge] = useState('');
    const [toAge, setToAge] = useState('');
    const [gender, setGender] = useState('');
    const [caste, setCaste] = useState('');
    const [color, setColor] = useState('');
    const [karyakartaName, setKaryakartaName] = useState('');
    const [status, setStatus] = useState('');
    const [casteOption, setCastOption] = useState([])
    const [colorOptions,setColorOptions]= useState([])
    const [userOptions, setUserOptions]= useState([])

    const SerachBy = [
        { label: 'पुरुष', value: 'male' },
        { label: 'महिला', value: 'female' },
        { label: 'माहित नाही', value: 'unknown' },
    ];

    const statusOptions = [
        { label: 'जिवंत', value: 'Alive' },
        { label: 'मृत', value: 'Dead' }
    ];

    const handleVillageChange = (selectedOption) => {
        setVillageId(selectedOption?.value || "");
        setVillageName(selectedOption?.label || "");
    };

    const handleKaryakartaChange = (selectedOption) => {
        setKaryakartaName(selectedOption?.value || "");
    };

    const handleSelectChange = (selectedOption) => {
        setColor(selectedOption?.value || "");
    };

    const getVillageOption = () => {
        axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
            .then((resp) => {
                // const villageOptions = resp.data.village?.map((item) => ({
                //     label: item?.name,
                //     value: item?._id
                // }));
                setVillageOption(villageOptions);
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
                setBoothOption(boothNo);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPrintingData = async () => {
        try {
            const response = await axios.get(`${base_url}/print-Report/${id}?printOut=true&boothNo=${boothNo}&serialNo=${srNo}&nameFilter=${voterName}&cardNumber=${cardNo}&minBooth=${fromList}&maxBooth=${toList}&minAge=${fromAge}&maxAge=${toAge}&gender=${gender}&caste=${caste}&colour=${color}&aliveOrDead=${status}&`);
            console.log(response.data, "print Data");
            setAllData(response.data.voters);
            setTotal(response.data.voters.length);
        } catch (error) {
            console.log(error);
        }
    };

    const getCasteOption = () => {
        axios.get(`${base_url}/getCastMeta`)
            .then((resp) => {
                const casteOption = resp.data.data.map((item) => ({
                    label: item.castname,
                    value: item._id,
                }));
                setCastOption(casteOption);

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getColor = () => {
        axios
            .get(`${base_url}/get-colour`)
            .then((resp) => {
                const colors = resp.data.data.map((item) => ({
                    label: item.color,
                    value: item._id,
                }));
                setColorOptions(colors);
                console.log(resp.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUsers = async () => {
        try {
          const response = await axios.get(`${base_url}/api/getAllUser`);
          console.log(response.data, "responseeeeeeeeee");
          const users = response.data.users.map((item) => ({
            label: item.fullName,
            value: item._id,
        }));
          setUserOptions(users)
        } catch (error) {
          console.log(error);
        }
      };

    const clearFields = () => {
        setVillageId("");
        setBoothNo("");
        setAllData([]);
        setSrNo('');
        setVoterName('');
        setCardNo('');
        setFromList('');
        setToList('');
        setFromAge('');
        setToAge('');
        setGender('');
        setCaste('');
        setColor('');
        setKaryakartaName('');
        setStatus('');
    };

    useEffect(() => {
        getVillageOption();
    }, []);

    useEffect(() => {
        getBoothNo();
    }, [villageId]);

    useEffect(() => {
        getPrintingData();
    }, [boothNo,srNo,voterName,fromList,toList,fromAge,toAge,gender,caste,color,status]);

    useEffect(() => {
        getCasteOption();
    }, []);

    useEffect(() => {
        getColor();
    }, []);
    
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <div className="mb-4">
                <Card>
                    <div className="mb-2 flex justify-between">
                        <h6 className="font-bold text-[#b91c1c]">Print PDF</h6>
                        <div className="flex gap-6">
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण: {total}</h6>
                        </div>
                    </div>
                    <hr className="mb-3" />
                    <div className="grid grid-cols-5 gap-2">
                        <div>
                            <label className="form-label">गाव</label>
                            <Select
                                placeholder="गाव"
                                value={villageOption.find(option => option.value === villageId) || null}
                                options={villageOption}
                                onChange={handleVillageChange}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">भाग/बूथ नं</label>
                            <Select
                                placeholder="भाग/बूथ नं"
                                value={boothOption.find(option => option.value === boothNo) || null}
                                options={boothOption}
                                onChange={(selectedOption) => setBoothNo(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <InputGroup
                            type="text"
                            label="अ.क्र."
                            placeholder="अ.क्र."
                            value={srNo}
                            onChange={(e) => setSrNo(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="मतदाराचे नाव"
                            placeholder="मतदाराचे नाव"
                            value={voterName}
                            onChange={(e) => setVoterName(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="EPIC/कार्ड नं"
                            placeholder="EPIC/कार्ड नं"
                            value={cardNo}
                            onChange={(e) => setCardNo(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="यादी नं. पासून"
                            placeholder="यादी नं. पासून"
                            value={fromList}
                            onChange={(e) => setFromList(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="यादी नं. पर्यंत"
                            placeholder="यादी नं. पर्यंत"
                            value={toList}
                            onChange={(e) => setToList(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="वयापासून"
                            placeholder="वयापासून"
                            value={fromAge}
                            onChange={(e) => setFromAge(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="वयापर्यंत"
                            placeholder="वयापर्यंत"
                            value={toAge}
                            onChange={(e) => setToAge(e.target.value)}
                        />

                        <div>
                            <label className="form-label">लिंग</label>
                            <Select
                                placeholder="लिंग"
                                value={SerachBy.find(option => option.value === gender) || null}
                                options={SerachBy}
                                onChange={(selectedOption) => setGender(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">जात</label>
                            <Select
                                placeholder="जात"
                                value={casteOption.find(option => option.value === caste) || null}
                                options={casteOption}
                                onChange={(selectedOption) => setCaste(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">कलर</label>
                            <Select
                                placeholder="कलर"
                                value={colorOptions.find(option => option.value === color) || null}
                                options={colorOptions}
                                onChange={handleSelectChange}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">कायकर्ता नाव</label>
                            <Select
                                placeholder="कायकर्ता नाव"
                                value={userOptions.find(option => option.value === karyakartaName) || null}
                                options={userOptions}
                                onChange={handleKaryakartaChange}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">स्थिती</label>
                            <Select
                                placeholder="स्थिती"
                                value={statusOptions.find(option => option.value === status) || null}
                                options={statusOptions}
                                onChange={(selectedOption) => setStatus(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <div className="flex justify-end items-center mt-6">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                                क्लियर करा
                            </button>
                        </div>
                    </div>
                </Card>
            </div>

            <div>
                <ExportDataTable data={allData} />
            </div>
        </div>
    );
};

export default ExportData;
