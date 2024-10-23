import React, { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import Flatpickr from "react-flatpickr";
import { base_url } from "../../../config/base_url";
import axios from "axios";
import AddNewVoter from "./AddNewVoter";
import { toast } from "react-toastify";
import AddFamilyMember from "./AddFamilyMember";

const EditModal = ({ ActiveDiactiveModal, activeModal, selectedRowData }) => {
  const [selectedFamily, setSelectedFamily] = useState([])
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [mulgav,setMulgav]=useState('')
  const [addFamilyModal, setAddFamilyModal] = useState(false)
  const [businessOption, setBusinessOption] = useState([])
  const [casteOption, setCasteOption] = useState([])
  const [karyakartaOption, setKaryakartaOption] = useState([])
  const [colourOption, setColourOption] = useState([])
  const [data, setData] = useState([])
  const id = localStorage.getItem('_id')
// const [FamilyMember,setFamilyMember]=useState( [...(selectedRowData?.namesOfMembers || []), ...data])
  const FamilyMember = [...(selectedRowData?.namesOfMembers || []), ...data];

const [landmarkOption,setLandMarkOption]=useState([])
const [nagerOption,setNagerOption]=useState([])
const [societyOption,setSocietyOption]=useState([])
const [yojnaOption,setYojnaOption]=useState([])

console.log(mulgav,"mulgav")

const [selectedRow, setSelectedRow] = useState(null); 

const HeadOfFamily = {
  id: selectedRow?._id,
  name: selectedRow?.name
};
  const handleSelectRow = (member) => {
   
    if (selectedRow && selectedRow === member) {
      setSelectedRow(null); 
    } else {
      setSelectedRow(member); 
    }
  };


  useEffect(() => {
    const data = selectedFamily?.map((item) => ({
      name: item.name,
      id: item._id,
    })) || [];
    setData(data);
  }, [selectedFamily]);


  const [formData, setFormData] = useState({
    name:"",
    houseNo: "",
    landmark: "",
    city: "",
    mobileNo: "",
    aadhaarNo: "",
    caste: "",
    houseType: "",
    worker: "",
    society: "",
    village: "",
    marriageAnniversary: "",
    yojna: "",
    status: "",
    nativeVillage: "",
    occupation: "",
    color: "",
    dateOfBirth: "",
    sandharbha: "",
    outsideVoters: null,
    bachatGat: null,
    society: null,
    bankAccountHolder: null,
    grampanchayatMember: null, 
    apleNaraj: null,           
    tyancheNaraj: null,   

  });
console.log(formData.nativeVillage)
console.log(formData.aadhaarNo)

  const handleClear = () => {
    setFormData({
      name:"",
      houseNo: "",
      landmark: "",
      city: "",
      mobileNo: "",
      aadhaarNo: "",
      caste: "",
      houseType: "",
      worker: "",
      society: "",
      village: "",
      marriageAnniversary: "",
      status: "",
      nativeVillage: "",
      occupation: "",
      color: "",
      dateOfBirth: "",
      sandharbha: "",
      outsideVoters:"",
      bankAcHolder:"",
      bachatGat:"",
       
      grampanchayatMember:"",
      outsideVoters: null,
      bachatGat: null,
      society: null,
      bankAccountHolder: null,
      grampanchayatMember: null, 
      apleNaraj: null,           
      tyancheNaraj: null,       
      // setFamilyMember:[]
    });
    setModal(false);
  };


  const handelSelectedFamily = (val) => {
    setSelectedFamily(val)
  }

  const handleActiveModal = (value) => {
    setModal(value);
  };

  const handleFamilyModal = (val) => {
    setAddFamilyModal(val)
  }

  const [villageOptions, setVillageOptions] = useState([]);


  const homeTypeOptions = [
    { label: "स्वतःचे घर", value: "स्वतःचे घर" },
    { label: "भाडेकरू", value: "भाडेकरू" },
    { label: "स्थानांतरित", value: "स्थानांतरित" },
    { label: "घर बंद", value: "घर बंद" },
  ];

  const aliveOptions = [
    { label: "जिवंत", value: "जिवंत" },
    { label: "मृत", value: "मृत" },
  ];

  const getVillageOptions = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/surve/getAllVoterVillages/${id}`
      );
      const options = response.data.village.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setVillageOptions(options);
    } catch (error) {
      console.error("Error fetching village options:", error);
    }
  };

  const getBusinessOption = () => {
    axios.get(`${base_url}/get-BusinessMeta`)
      .then((resp) => {
        const businessoption = resp.data.data.map((item) => ({
          label: item.business,

          value: item.business,

        }));
        setBusinessOption(businessoption);

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getColourOption = () => {
    axios.get(`${base_url}/get-colour`)
      .then((resp) => {
        const colouroption = resp.data.data.map((item) => ({
          label: item.color,

          value: item.color,

        }));
        setColourOption(colouroption);

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getCasteOption = () => {
    axios.get(`${base_url}/getCastMeta`)
      .then((resp) => {
        const casteOption = resp.data.data.map((item) => ({
          label: item.castname,
          value: item.castname,
        }));
        setCasteOption(casteOption);

      })
      .catch((error) => {
        console.log(error)
      })

  }

  const getLandmarkOption = () => {
    axios.get(`${base_url}/get-landmark`)
      .then((resp) => {
        const landmark = resp.data.data.map((item) => ({
          label: item.name,
          value: item.name,
        }));
        setLandMarkOption(landmark);

      })
      .catch((error) => {
        console.log(error)
      })
}

const getNager = () => {
  axios.get(`${base_url}/get-nager`)
    .then((resp) => {
      console.log(resp.data.data)
      const nager = resp.data.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setNagerOption(nager);

    })
    .catch((error) => {
      console.log(error)
    })
}

const getSociety = () => {
  axios.get(`${base_url}/get-society`)
    .then((resp) => {
      const society = resp.data.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setSocietyOption(society);

    })
    .catch((error) => {
      console.log(error)
    })
}

const getYojna = () => {
  axios.get(`${base_url}/api/surve/getYogna`)
    .then((resp) => {
      const yojna = resp.data.yogna.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setYojnaOption(yojna);

    })
    .catch((error) => {
      console.log(error)
    })
}

  const getKaryakartaOption = () => {
    axios.get(`${base_url}/api/get-All-karykarte`)
      .then((resp) => {
        const casteOption = resp.data.users.map((item) => ({
          label: item.fullName,

          value: item.fullName,

        }));
        setKaryakartaOption(casteOption);

      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getLandmarkOption()
    getNager()
    getSociety()
    getYojna()
    getVillageOptions();
    getBusinessOption()
    getCasteOption()
    getColourOption()
    getKaryakartaOption()
  }, []);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
   
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (val,val2) => {
   setFormData((prevState) => ({
      ...prevState,
      [val]: val2, 
    }));
  };


  const handleDateChange = (id, date) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: date[0],
    }));
  };

  const UpdateVoter = () => {
    const payload = {
      dateOfBirth: formData.dateOfBirth,
      mobile: formData.mobileNo,
      aadharCard: formData.aadhaarNo,
      caste: formData.caste,
      weddingAnniversary: formData.marriageAnniversary,
      aliveOrDead: formData.status,
      nativePlace: mulgav,
      business: formData.occupation,
      colour: formData.color,
      houseNo: formData.houseNo,
      landMark: formData.landmark,
      city: formData.city,
      homeType: formData.houseType,
      karyakarta: formData.worker,
      society: formData.society,
      village: formData.village,
      referenceFrom: formData.sandharbha,
      outSideVoter:formData.outsideVoters,
      mahilaBachatGath:formData.bachatGat,
      societyPad:formData.society,
      voterWithBankAc:formData.bankAccountHolder,
      panchayatPad:formData.grampanchayatMember,
      apleNaraj:formData.apleNaraj,
      tyncheNaraj:formData.tyancheNaraj,
      namesOfMembers: FamilyMember,
      nameOfHeadOfFamily:HeadOfFamily

   };
    axios
      .post(
        `${base_url}/api/surve/update-voter/${selectedRowData?._id}`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((resp) => {
        ActiveDiactiveModal(false)
        toast.success('Update Sucessfully')
        handleClear()
       setMulgav('')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        title="Edit Record"
        activeModal={activeModal}
        className="max-w-5xl"
        themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
        onClose={() => ActiveDiactiveModal(false)}
      >
        <div>
          <div className="mb-2 bg-blue-200 px-3 py-2 rounded-md flex justify-between">
            <div>
            <p className="text-3xl">{selectedRowData?.name}</p>
            <p>{selectedRowData?.address}</p>
            </div>
            <div className=" flex justify-center items-center gap-2">
              <label htmlFor="">Head Of Family</label>
            <input
                  type="checkbox"
                  checked={selectedRow} 
                  onChange={() => handleSelectRow(selectedRowData)} 
                />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            {/* First Column */}
            <div className="col-span-1 space-y-4">

            <div className=" flex">
                <label htmlFor="" className=" w-20">
                नाव
                </label>
                <InputGroup
                  type="text"
                  // label="घर क्र."
                  id="name"
                  placeholder="नाव"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>



              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  घर क्र.
                </label>
                <InputGroup
                  type="text"
                  // label="घर क्र."
                  id="houseNo"
                  placeholder="घर क्र"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                />
              </div>

<div className="flex w-full mb-4">
              <label htmlFor="landmark" className="w-28">
                लँडमार्क
              </label>
              <Select
                className="w-full"
                placeholder="लँडमार्क"
                value={formData.landmark} 
                onChange={(e) => handleSelectChange("landmark", e.target.value)}
                options={landmarkOption} 
              />
            </div>

              <div className=" flex ">
                <label htmlFor="" className=" w-28">
                  नगर
                </label>

                <Select
                  // label="नगर"
                  className="w-full"
                  placeholder="नगर"
                  value={formData.city}
                  onChange={(e) => handleSelectChange("city", e.target.value)}
                  options={nagerOption}
                />
              </div>
              <div className=" flex">
                <label className="block text-sm font-medium  w-28 text-gray-700">
                  जन्मतारीख
                </label>
                <Flatpickr
                  className="form-control  py-2 mt-0 w-full"
                  value={formData.dateOfBirth}
                  onChange={(date) => handleDateChange("dateOfBirth", date)}
                  options={{ dateFormat: "d/m/Y" }}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  मोबाईल नं
                </label>

                <InputGroup
                  type="text"
                  // label="मोबाईल नं"
                  id="mobileNo"
                  placeholder="मोबाईल नं"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  आधार नं
                </label>

                <InputGroup
                  type="text"
                  // label="आधार कार्ड नं"
                  id="aadhaarNo"
                  placeholder="आधार कार्ड नं"
                  value={formData.aadhaarNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  जात
                </label>

                <Select
                  // label="जात"
                  className="w-full"
                  placeholder="जात"
                  options={casteOption}
                  value={formData.caste}
                  onChange={(e) => handleSelectChange("caste", e.target.value)}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  घराचा प्रकार
                </label>

                <Select
                  // label="घराचा प्रकार"
                  className="w-full"
                  placeholder="घराचा प्रकार"
                  options={homeTypeOptions}
                  value={formData.houseType}
                  onChange={(e) => handleSelectChange("houseType", e.target.value)}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  कार्यकर्ता
                </label>

                <Select
                  // label="कार्यकर्ता"
                  className="w-full"
                  placeholder="कार्यकर्ता"
                  options={karyakartaOption}
                  value={formData.worker}
                  onChange={(e) => handleSelectChange("worker", e.target.value)}
                />
              </div>
              <div className="flex items-center mb-2  pt-2">
        <label htmlFor="outsideVoters" className="w-64">
          बाहेरचे मतदार
        </label>
        <div className="w-full">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="outsideVoters"
              value={true}
              checked={formData.outsideVoters === true}
              onChange={() => handleSelectChange("outsideVoters", true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">आहे</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="outsideVoters"
              value={false}
              checked={formData.outsideVoters === false}
              onChange={() => handleSelectChange("outsideVoters", false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">नाही</span>
          </label>
        </div>
      </div>

      <div className="flex items-center mb-4 pt-0">
        <label htmlFor="bachatGat" className="w-64">
          महिला बचत गट
        </label>
        <div className="w-full">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="bachatGat"
              value={true}
              checked={formData.bachatGat === true}
              onChange={() => handleSelectChange("bachatGat", true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">आहे</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="bachatGat"
              value={false}
              checked={formData.bachatGat === false}
              onChange={() => handleSelectChange("bachatGat", false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">नाही</span>
          </label>
        </div>
      </div>

      <div className="flex items-center mb-4 pt-0">
        <label htmlFor="society" className="w-64">
          सोसायटी पदाधिकारी
        </label>
        <div className="w-full">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="society"
              value={true}
              checked={formData.society === true}
              onChange={() => handleSelectChange("society", true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">आहे</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="society"
              value={false}
              checked={formData.society === false}
              onChange={() => handleSelectChange("society", false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">नाही</span>
          </label>
        </div>
      </div>

      <div className="flex items-center mb-4 pt-0">
        <label htmlFor="bankAccountHolder" className="w-64">
          बँक खातेदार
        </label>
        <div className="w-full">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="bankAccountHolder"
              value={true}
              checked={formData.bankAccountHolder === true}
              onChange={() => handleSelectChange("bankAccountHolder", true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">आहे</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="bankAccountHolder"
              value={false}
              checked={formData.bankAccountHolder === false}
              onChange={() => handleSelectChange("bankAccountHolder", false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">नाही</span>
          </label>
        </div>
      </div>

              <div
                className="bg-blue-500 flex justify-center items-center rounded-md py-1 mt-4"
                onClick={UpdateVoter}
              >
                <button className="text-white">Save</button>
              </div>
            </div>

            {/* Second Column */}
            <div className="col-span-1 space-y-4">
              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  सोसायटी
                </label>

                <Select
                  // label="सोसायटी"
                  className="w-full"
                  placeholder="सोसायटी"
                  value={formData.society}
                  onChange={(e) => handleSelectChange("society", e.target.value)}
                  options={societyOption}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  गाव
                </label>

                <Select
                  // label="गाव"
                  className="w-full"
                  placeholder="गाव"
                  value={formData.village}
                  options={villageOptions}
                  onChange={(e) => handleSelectChange("village", e.target.value)}
                />
              </div>
              <div className="pt-1 pb-1">Detail Address</div>

              <div className=" flex ">
                <label className="block text-sm font-medium w-28 text-gray-700">
                  लग्नाचा वाढदिवस
                </label>
                <Flatpickr
                  className="form-control py-2 mt-0 w-full"
                  value={formData.marriageAnniversary}
                  onChange={(date) =>
                    handleDateChange("marriageAnniversary", date)
                  }
                  options={{ dateFormat: "d/m/Y" }}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  जिवंत/ मृत
                </label>

                <Select
                  // label="जिवंत/ मृत"
                  className="w-full"
                  placeholder="जिवंत/ मृत"
                  options={aliveOptions}
                  value={formData.status}
                  onChange={(e) => handleSelectChange("status", e.target.value)}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  मुळगाव
                </label>

                <InputGroup
                  type="text"
                  // label="मुळगाव"
                  id="mulgav"
                  placeholder="मुळगाव"
                  value={mulgav}
                  onChange={(e)=>setMulgav(e.target.value)}
                />
              </div>
              {/* <Select
                label="मुळगाव"
                className="w-full"
                placeholder="मुळगाव"
                value={formData.nativeVillage}
                onChange={(value) => handleSelectChange('nativeVillage', value)}
                options={[
                  { label: "Native Village 1", value: "nativeVillage1" },
                  { label: "Native Village 2", value: "nativeVillage2" },
                  // Add more options as needed
                ]}
              /> */}

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  व्यवसाय
                </label>

                <Select
                  // label="व्यवसाय"
                  className="w-full"
                  placeholder="व्यवसाय"
                  value={formData.occupation}
                  onChange={(e) => handleSelectChange("occupation", e.target.value)}
                  options={businessOption}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  रंग
                </label>

                <Select
                  // label="रंग"
                  className="w-full"
                  placeholder="रंग"
                  value={formData.color}
                  onChange={(e) => handleSelectChange("color", e.target.value)}
                  options={colourOption}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  संदर्भ
                </label>

                <Select
                  // label="संदर्भ"
                  className="w-full"
                  placeholder="संदर्भ"
                  value={formData.sandharbha}
                  onChange={(e) => handleSelectChange("sandharbha", e.target.value)}
                  options={[
                    { label: "Reference 1", value: "reference1" },
                    { label: "Reference 2", value: "reference2" },
                    // Add more options as needed
                  ]}
                />
              </div>

              <div className="flex mb-4">
        <label htmlFor="" className="w-28">
          योजना
        </label>
        <Select
          className="w-full"
          placeholder="योजना"
          value={formData.yojna}
          onChange={(e) => handleSelectChange("yojna", e.target.value)}
          options={yojnaOption}
        />
      </div>

   
              <div className="flex items-center mb-4 pt-2 ">
        <label htmlFor="grampanchayatMember" className="w-64">
          ग्रामपंचायत पदाधिकारी
        </label>
        <div className="w-full">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="grampanchayatMember"
              value={true}
              checked={formData.grampanchayatMember === true}
              onChange={() => handleSelectChange("grampanchayatMember", true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">आहे</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="grampanchayatMember"
              value={false}
              checked={formData.grampanchayatMember === false}
              onChange={() => handleSelectChange("grampanchayatMember", false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">नाही</span>
          </label>
        </div>
      </div>

      <div className="flex items-center mb-4 pt-3">
        <label className="w-64">आपले नाराज</label>
        <div className="w-full flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="apleNaraj"
              value={true}
              checked={formData.apleNaraj === true}
              onChange={() => handleSelectChange("apleNaraj", true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">आहे</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="apleNaraj"
              value={false}
              checked={formData.apleNaraj === false}
              onChange={() => handleSelectChange("apleNaraj", false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">नाही</span>
          </label>
        </div>
      </div>

      <div className="flex items-center mb-4 pt-2">
        <label className="w-64">त्यांचे नाराज</label>
        <div className="w-full flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tyancheNaraj"
              value={true}
              checked={formData.tyancheNaraj === true}
              onChange={() => handleSelectChange("tyancheNaraj", true)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">आहे</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tyancheNaraj"
              value={false}
              checked={formData.tyancheNaraj === false}
              onChange={() => handleSelectChange("tyancheNaraj", false)}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">नाही</span>
          </label>
        </div>
        </div>


              <div className="bg-blue-500 flex justify-center items-center rounded-md py-1 mt-4">
                <button className="text-white" onClick={handleClear}>Cancel</button>
              </div>
            </div>

            {/* Third Column */}
            <div className="col-span-1 space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <button
                  className="bg-blue-500 text-white rounded-md py-1"
                  onClick={() => setModal(true)}
                >
                  New
                </button>
                <button className="bg-blue-500 text-white rounded-md py-1" onClick={() => setAddFamilyModal(true)}>
                  Select Family
                </button>
              </div>
              <div className="mt-5 border h-[43rem] overflow-y-auto overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              नाव
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              मोबाईल नं.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              जन्मतारीख
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              आधार
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              अ क्र.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              वय
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              लिंग
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {FamilyMember.map((member, index) => (
            <tr key={index}>
              
              <td className="px-6 py-2 whitespace-nowrap">{member.name}</td>
              <td className="px-6 py-2 whitespace-nowrap">{member.MOBILE_NO}</td>
              <td className="px-6 py-2 whitespace-nowrap">{member.dateOfBirth}</td>
              <td className="px-6 py-2 whitespace-nowrap">{member.aadhar}</td>
              <td className="px-6 py-2 whitespace-nowrap">{member.serialNo}</td>
              <td className="px-6 py-2 whitespace-nowrap">{member.age}</td>
              <td className="px-6 py-2 whitespace-nowrap">{member.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            </div>
          </div>
        </div>
      </Modal>
      <AddNewVoter handleActiveModal={handleActiveModal} modal={modal} />
      <AddFamilyMember handleFamilyModal={handleFamilyModal} addFamilyModal={addFamilyModal} handelSelectedFamily={handelSelectedFamily} familyMember={selectedRowData?.namesOfMembers} />
    </div>
  );
};

export default EditModal;
