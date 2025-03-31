import { useLocation } from "react-router-dom";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useRef } from "react";

const ResultPage = () => {
const location = useLocation();
const manifest = location.state?.data?.manifest || {};
const container = manifest.cont || {};
const job = manifest.job || {};
const customer = location.state?.data.manifest.customer || {};
const tglMasuk = manifest.tglmasuk ?? 'Belum Masuk';
const tglKeluar = manifest.tglrelease ?? 'Belum Keluar';
const tglStripping = manifest.tglstripping ?? 'Belum Stripping';
const dokumen = manifest.dokumen?.name ?? 'Belum tersedia';
const spjm = manifest.jenis_spjm ?? 'Belum tersedia';
const photos = location.state?.data.photoContainers;
const groupedPhotos = photos.reduce((acc, photo) => {
    if (!acc[photo.action]) {
        acc[photo.action] = [];
    }
    acc[photo.action].push(photo);
    return acc;
}, {});
const photosManifest = location.state?.data.photoManifestes;
const groupedPhotosManifest = photosManifest.reduce((acc, photosManifest) => {
    if (!acc[photosManifest.action]) {
        acc[photosManifest.action] = [];
    }
    acc[photosManifest.action].push(photosManifest);
    return acc;
}, {});
console.log(photos);
    const printRef = useRef();

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload untuk mengembalikan tampilan
    };  
  return (
    <div ref={printRef} className="flex items-start gap-4">
        <div  key="1" className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
              <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">Manifest Information</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Manifest details and application.</p>
              </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">House BL</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{manifest.nohbl} - {manifest.tgl_hbl}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Contianers</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{container.nocontainer} - {container.size} Feet</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">TPS Asal</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{job.sandar.kd_tps_asal}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">PLP</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{job.noplp} - {job.ttgl_plp}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">BC 11</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{job.tno_bc11} - {job.ttgl_bc11}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Manifest</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{manifest.quantity} - {manifest.packing.code}</dd>
                          <dt className="text-sm/6 font-medium text-gray-900"></dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Meas: {new Intl.NumberFormat('en-US').format(manifest.meas)} - Weight: {new Intl.NumberFormat('en-US').format(manifest.weight)}</dd>
                          <dt className="text-sm/6 font-medium text-gray-900"></dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{manifest.quantity} - {manifest.descofgoods}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Tgl Masuk</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{tglMasuk} - {manifest.jammasuk}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Tgl Stripping</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{tglStripping} - {manifest.jamstripping}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Dokumen Pengeluaran</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{dokumen} - {manifest.no_dok} - {manifest.tgl_dok}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Tgl Keluar</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{tglKeluar} - {manifest.jamrelease}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <div className="divider divider-center">
                              <div className="divider-text text-center">
                                  Additioal Data
                              </div>
                          </div>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Customer</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{customer.name}</dd>
                          <dt className="text-sm/6 font-medium text-gray-900"></dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{customer.npwp}</dd>
                          <dt className="text-sm/6 font-medium text-gray-900"></dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{customer.alamat}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">SPJM</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{spjm} - {manifest.no_spjm} - {manifest.tgl_spjm}</dd>
                          <dt className="text-sm/6 font-medium text-gray-900"></dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Selesai Behandle Pd {manifest.date_ready_behandle} - {manifest.date_finish_behandle}</dd>
                          <dt className="text-sm/6 font-medium text-gray-900"></dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Dg Catatan :  {manifest.desc_finish_behandle}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-gray-900">Segel Merah</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{manifest.nosegel} - {manifest.tanggal_segel_merah}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <button 
                                onClick={handlePrint}
                                type="button" className="w-full mt-4 flex items-center justify-center bg-indigo-600 text-white p-2 rounded-md">
                                <i className="fa fa-search"></i>
                                <span className="ml-2">Print</span>
                            </button>
                            <button onClick={() => (window.location.href = "/")} className="w-full mt-4 flex items-center justify-center bg-yellow-600 text-white p-2 rounded-md">
                                Back
                            </button>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg">
             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
               <h2 className="text-2xl font-bold tracking-tight text-gray-900">Photo Kegiatan Container</h2>

               <div className="mt-6 space-y-6">
                 {Object.entries(groupedPhotos).map(([action, photos]) => (
                   <div key={action}>
                     {/* Judul Action */}
                     <h2 className="text-lg font-semibold text-gray-900 mb-2">{action}</h2>            

                     {/* Grid untuk Foto */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                       {photos.map((photo) => (
                         <div key={photo.id} className="group relative">
                           <img
                             alt={photo.url}
                             src={photo.url}
                             className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                           />
                           <div className="mt-2">
                             <p className="text-sm text-gray-500">{photo.detil}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
        </div>
        {/* Manifest */}
        <div className="bg-white shadow-lg rounded-lg">
             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
               <h2 className="text-2xl font-bold tracking-tight text-gray-900">Photo Kegiatan Manifest</h2>

               <div className="mt-6 space-y-6">
                 {Object.entries(groupedPhotosManifest).map(([action, photos]) => (
                   <div key={action}>
                     {/* Judul Action */}
                     <h2 className="text-lg font-semibold text-gray-900 mb-2">{action}</h2>            

                     {/* Grid untuk Foto */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                       {photos.map((photo) => (
                         <div key={photo.id} className="group relative">
                           <img
                             alt={photo.url}
                             src={photo.url}
                             className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                           />
                           <div className="mt-2">
                             <p className="text-sm text-gray-500">{photo.detil}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
        </div>
    </div>
  )
};

export default ResultPage;
