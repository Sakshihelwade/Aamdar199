// import React, { useEffect, useState } from 'react';
// import Modal from '../../../components/ui/Modal';
// import axios from 'axios';
// import { base_url } from '../../../config/base_url';
// import { toast } from 'react-toastify';
// import Select from "@/components/ui/Select";


// const AddNewVoter = ({handleActiveModal, modal}) => {
//     const token = localStorage.getItem('token');
//     const id = localStorage.getItem('_id')
//     // const [activeModal, setActiveModal] = useState(true);
//     const [villageOptions, setVillageOption] = useState([])
//     const [landmarkOption,setLandMarkOption]=useState([])
// const [nagerOption,setNagerOption]=useState([])
// const [societyOption,setSocietyOption]=useState([])

  

//     const getAllVillages = async () => {
//         try {
//             const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
//             setVillageOption(response.data.village)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     const [voterDetails, setVoterDetails] = useState({
//         name: '',
//         address: '',
//         mobileNo: '',
//         society: '',
//         landmark: '',
//         village: '',
//         city: ''
//     });


//     // const societyOptions = ['Society A', 'Society B', 'Society C'];
//     // const landmarkOptions = ['Landmark X', 'Landmark Y', 'Landmark Z'];
//     // // const villageOptions = ['Village 1', 'Village 2', 'Village 3'];
//     // const cityOptions = ['City A', 'City B', 'City C'];

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setVoterDetails({
//             ...voterDetails,
//             [name]: value
//         });
//     };

//     // const handleCloseModal = () => {
//     //     setActiveModal(false);
//     // };

//     const getLandmarkOption = () => {
//         axios.get(`${base_url}/get-landmark`)
//           .then((resp) => {
//             const landmark = resp.data.data.map((item) => ({
//               label: item.name,
//               value: item.name,
//             }));
//             setLandMarkOption(landmark);
    
//           })
//           .catch((error) => {
//             console.log(error)
//           })
//     }
    
//     const getNager = () => {
//       axios.get(`${base_url}/get-nager`)
//         .then((resp) => {
//           console.log(resp.data.data)
//           const nager = resp.data.data.map((item) => ({
//             label: item.name,
//             value: item.name,
//           }));
//           setNagerOption(nager);
    
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     }
    
//     const getSociety = () => {
//       axios.get(`${base_url}/get-society`)
//         .then((resp) => {
//           const society = resp.data.data.map((item) => ({
//             label: item.name,
//             value: item.name,
//           }));
//           setSocietyOption(society);
    
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     }

//     const handleSelectChange = (val,val2) => {
//         setFormData((prevState) => ({
//            ...prevState,
//            [val]: val2, 
//          }));
//        };

//     useEffect(()=>{
//         getLandmarkOption()
//         getNager()
//         getSociety()
//     },[])

//     useEffect(() => {
//         getAllVillages()
//     }, [])

//     const handleSave = async (e) => {
//         e.preventDefault();
//         try {
//             const payload = {
//                 name: voterDetails.name,
//                 address: voterDetails.address,
//                 mobile: voterDetails.mobileNo,
//                 society: voterDetails.society,
//                 landmark: voterDetails.landmark,
//                 village: voterDetails.village,
//                 city: voterDetails.city,
//             }
//             console.log(payload,"payloaddd")
//             const response = await axios.post(`${base_url}/api/surve/add-newVotter`, payload, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             if(response.status===201 ){
//                 toast.success("Voter Created Successfully!")
//                 handleActiveModal(false);
//             }
//             console.log(response.data)
//         } catch (error) {
//             console.log(error)
//             toast.error("Failed to create voter!")
//         }
//     };

//     return (
//         <div>
//             <Modal
//                 title="New Voter"
//                 activeModal={modal}
//                 themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
//                 onClose={()=>handleActiveModal(false)}
//             >
//                 <form className="space-y-4" onSubmit={handleSave}>
//                     <div>
//                         <label className="block text-sm font-medium">नाव</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={voterDetails.name}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium">पत्ता</label>
//                         <input
//                             type="text"
//                             name="address"
//                             value={voterDetails.address}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium">मोबाईल नं.</label>
//                         <input
//                             type="text"
//                             name="mobileNo"
//                             value={voterDetails.mobileNo}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium">सोसायटी</label>
//                         <select
//                             name="society"
//                             value={voterDetails.society}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         >
//                             <option value="">Select Society</option>
//                             {societyOption.map((society, index) => (
//                                 <option key={index} value={society}>
//                                     {society}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                   <div className="flex w-full mb-4">
//               <label htmlFor="landmark" className="w-28">
//                 लँडमार्क
//               </label>
//               <Select
//                 className="w-full"
//                 placeholder="लँडमार्क"
//                 value={formData.landmark} 
//                 onChange={(e) => handleSelectChange("landmark", e.target.value)}
//                 options={landmarkOption} 
//               />
//             </div>

//             <div className=" flex">
//                 <label htmlFor="" className=" w-28">
//                   गाव
//                 </label>

//                 <Select
//                   // label="गाव"
//                   className="w-full"
//                   placeholder="गाव"
//                   value={formData.village}
//                   options={villageOptions}
//                   onChange={(e) => handleSelectChange("village", e.target.value)}
//                 />
//               </div>

//                     <div className=" flex ">
//                 <label htmlFor="" className=" w-28">
//                   नगर
//                 </label>

//                 <Select
//                   // label="नगर"
//                   className="w-full"
//                   placeholder="नगर"
//                   value={formData.city}
//                   onChange={(e) => handleSelectChange("city", e.target.value)}
//                   options={nagerOption}
//                 />
//               </div>

//                     <div className="flex justify-end space-x-4 mt-6">
//                         <button
//                             type="button"
//                             onClick={()=>handleActiveModal(false)}
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-gray-600"
//                         >
//                             Close
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// };

// export default AddNewVoter;


import React, { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import axios from 'axios';
import { base_url } from '../../../config/base_url';
import { toast } from 'react-toastify';
import Select from "react-select";

const AddNewVoter = ({ handleActiveModal, modal }) => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('_id');

    const [villageOptions, setVillageOption] = useState([]);
    const [landmarkOptions, setLandmarkOptions] = useState([]);
    const [nagerOptions, setNagerOptions] = useState([]);
    const [societyOptions, setSocietyOptions] = useState([]);

    const [voterDetails, setVoterDetails] = useState({
        name: '',
        address: '',
        mobileNo: '',
        society: null,
        landmark: null,
        village: null,
        city: null
    });

    useEffect(() => {
        getAllVillages();
        getLandmarkOptions();
        getNagerOptions();
        getSocietyOptions();
    }, []);

    const getAllVillages = async () => {
        try {
            const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`);
            setVillageOption(response.data?.village?.map(v => ({ label: v.name, value: v.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const getLandmarkOptions = async () => {
        try {
            const response = await axios.get(`${base_url}/get-landmark`);
            setLandmarkOptions(response.data.data.map(item => ({ label: item.name, value: item.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const getNagerOptions = async () => {
        try {
            const response = await axios.get(`${base_url}/get-nager`);
            setNagerOptions(response.data.data.map(item => ({ label: item.name, value: item.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const getSocietyOptions = async () => {
        try {
            const response = await axios.get(`${base_url}/get-society`);
            setSocietyOptions(response.data.data.map(item => ({ label: item.name, value: item.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoterDetails({
            ...voterDetails,
            [name]: value
        });
    };

    const handleSelectChange = (name, selectedOption) => {
        setVoterDetails(prevState => ({
            ...prevState,
            [name]: selectedOption ? selectedOption.value : null
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: voterDetails.name,
                address: voterDetails.address,
                mobile: voterDetails.mobileNo,
                society: voterDetails.society,
                landmark: voterDetails.landmark,
                village: voterDetails.village,
                city: voterDetails.city,
            };

            const response = await axios.post(`${base_url}/api/surve/add-newVotter`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                toast.success("Voter Created Successfully!");
                handleActiveModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create voter!");
        }
    };

    return (
        <div>
            <Modal
                title="New Voter"
                activeModal={modal}
                themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
                onClose={() => handleActiveModal(false)}
            >
                <form className="space-y-4" onSubmit={handleSave}>
                    <div>
                        <label className="block text-sm font-medium">नाव</label>
                        <input
                            type="text"
                            name="name"
                            value={voterDetails.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">पत्ता</label>
                        <input
                            type="text"
                            name="address"
                            value={voterDetails.address}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">मोबाईल नं.</label>
                        <input
                            type="text"
                            name="mobileNo"
                            value={voterDetails.mobileNo}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">सोसायटी</label>
                        <Select
                            placeholder="सोसायटी"
                            value={societyOptions.find(option => option.value === voterDetails.society)}
                            onChange={selectedOption => handleSelectChange('society', selectedOption)}
                            options={societyOptions}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">लँडमार्क</label>
                        <Select
                            placeholder="लँडमार्क"
                            value={landmarkOptions.find(option => option.value === voterDetails.landmark)}
                            onChange={selectedOption => handleSelectChange('landmark', selectedOption)}
                            options={landmarkOptions}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">गाव</label>
                        <Select
                            placeholder="गाव"
                            value={villageOptions.find(option => option.value === voterDetails.village)}
                            onChange={selectedOption => handleSelectChange('village', selectedOption)}
                            options={villageOptions}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">नगर</label>
                        <Select
                            placeholder="नगर"
                            value={nagerOptions.find(option => option.value === voterDetails.city)}
                            onChange={selectedOption => handleSelectChange('city', selectedOption)}
                            options={nagerOptions}
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => handleActiveModal(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddNewVoter;
