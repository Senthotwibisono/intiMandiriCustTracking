import { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const Home = () => {
  const [tipe, setTipe] = useState("null");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulasi proses selesai dalam 2 detik
    }, 2000);
  };

  const [formData, setFormData] = useState({
    no_bl_awb: "",
    tgl_bl_awb: "",
    nocontainer: "",
    no_hbl_awb: "",
    tgl_hbl_awb: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Mencegah reload atau redirect
    setIsLoading(true);
  
    console.log(tipe, formData);
    if (!tipe || (tipe !== 'FCL' && tipe !== 'LCL')) {
      Swal.fire({
        icon: 'error',
        text: 'Anda belum memilih layanan',
      });
      setIsLoading(false);
      return;
    }
  
    if (tipe === 'FCL' && (!formData.no_bl_awb || !formData.tgl_bl_awb || !formData.nocontainer)) {
      Swal.fire({
        icon: 'error',
        text: 'Informasi anda belum lengkap',
      });
      setIsLoading(false);
      return;
    }

    if (tipe === 'LCL' && (!formData.no_hbl_awb || !formData.tgl_hbl_awb || !formData.nocontainer)) {
      Swal.fire({
        icon: 'error',
        text: 'Informasi anda belum lengkap',
      });
      setIsLoading(false);
      return;
    }

    let url ='';
    switch (tipe) {
      case 'FCL':
          url = 'https://inti-mandiri.com/api/tracking/searchContainer'
        break;
    
      default:
          url = 'https://inti-mandiri.com/api/tracking/searchCargo'
        break;
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Authorization": "PcmMcozpCr2KjcuXmipJZ5LYMq3OZhxsiUyVVZ4ldzfviRZi9DU9JbKltPo3qrEo",  
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tipe, ...formData })
      });
      const result = await response.json();
      console.log(response);
      if (response.ok) {
        if (result.success) {
          Swal.fire({
            title: "Success!",
            text: "Data found successfully.",
            icon: "success"
          }).then(() => {
            if (tipe == 'FCL') {
              navigate("/detil", { state: { data: result.data } });
            }

            if (tipe == 'LCL') {
              navigate("/manifest", { state: { data: result.data } });
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong...',
            text: result.message,
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: response.statusText || "Something went wrong.",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.statusText || "Failed to fetch data.",
        icon: "error"
      });
    }
  
    setIsLoading(false);
  };
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="/logo/IntiMandiri.png" className="mx-auto h-20 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Masukan semua informasi yang kami butuhkan!
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div className="sm:col-span-3">
            <label htmlFor="tipe" className="block text-sm font-medium text-gray-900">Tipe Cargo</label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="tipe"
                name="tipe"
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                className="w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm">
                <option selected value>Pilih Satu!</option>
                <option value="FCL">FCL</option>
                <option value="LCL">LCL</option>
              </select>
              <ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
            </div>
          </div>

          {tipe === "FCL" && (
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Nomor BL Awb
                </label>
                <div className="mt-2">
                  <input
                    id="no_bl_awb"
                    name="no_bl_awb"
                    type="text"
                    value={formData.no_bl_awb}
                    onChange={(e) => setFormData({ ...formData, no_bl_awb: e.target.value })}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Tgl BL Awb
                </label>
                <div className="mt-2">
                  <input
                    id="tgl_bl_awb"
                    name="tgl_bl_awb"
                    type="date"
                    value={formData.tgl_bl_awb}
                    onChange={(e) => setFormData({ ...formData, tgl_bl_awb: e.target.value })}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>


                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Nomor Container
                </label>
                <div className="mt-2">
                  <input
                    id="nocontainer"
                    name="nocontainer"
                    type="text"
                    value={formData.nocontainer}
                    onChange={(e) => setFormData({ ...formData, nocontainer: e.target.value })}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            )}

            {tipe === "LCL" && (
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Nomor HBL Awb
                </label>
                <div className="mt-2">
                  <input
                    id="no_hbl_awb"
                    name="no_hbl_awb"
                    type="text"
                    value={formData.no_hbl_awb}
                    onChange={(e) => setFormData({ ...formData, no_hbl_awb: e.target.value })}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Tgl HBL Awb
                </label>
                <div className="mt-2">
                  <input
                    id="tgl_hbl_awb"
                    name="tgl_hbl_awb"
                    type="date"
                    value={formData.tgl_hbl_awb}
                    onChange={(e) => setFormData({ ...formData, tgl_hbl_awb: e.target.value })}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>


                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Nomor Container
                </label>
                <div className="mt-2">
                  <input
                    id="nocontainer"
                    name="nocontainer"
                    type="text"
                    value={formData.nocontainer}
                    onChange={(e) => setFormData({ ...formData, nocontainer: e.target.value })}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            )}

          <div>
            <button type="submit" className="w-full mt-4 flex items-center justify-center bg-indigo-600 text-white p-2 rounded-md">
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-search"></i>}
              <span className="ml-2">Search Cargo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;