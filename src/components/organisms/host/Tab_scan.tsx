import { useEffect, useState } from 'react';
import type { responseApi } from '../../../types/res.type';
import { getNmap } from '../../../api/nmap/getNmap';
import { Loading } from '../../../layouts/Loading';
import { getNikto } from '../../../api/nikto/getNikto';

export const TabScan = ({ ip }: { ip: string | undefined }) => {
  const [nmap_data, set_nmap_data] = useState<responseApi | null>(null);
  const [nikto_data, set_nikto_data] = useState<responseApi | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tab, setTab] = useState<string>("nmap")

  const TabFitur = async (fitur: string) => {
    setTab(fitur)
  }

  useEffect(() => {
    const fetchData = async () => {
      const resNmap: responseApi = await getNmap(ip || "");
      const resNikto: responseApi = await getNikto(ip || "");
      set_nikto_data(resNikto);
      set_nmap_data(resNmap);
      setLoading(false);
      console.log(resNikto);
    };

    fetchData();
  }, [ip]);
  // text-blue-600 bg-gray-100

  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <a onClick={() => TabFitur('nmap')} className={`inline-block p-4 rounded-t-lg  dark:hover:bg-gray-800 dark:hover:text-gray-300 
          ${
            tab === 'nmap' ? 'text-blue-600 bg-gray-100' : 'hover:text-gray-600 hover:bg-gray-50'
          }`}>Nmap</a>
        </li>
        <a onClick={() => TabFitur('nikto')} className={`inline-block p-4 rounded-t-lg  dark:hover:bg-gray-800 dark:hover:text-gray-300 
          ${
            tab === 'nikto' ? 'text-blue-600 bg-gray-100' : 'hover:text-gray-600 hover:bg-gray-50'
          }`}>Nikto</a>
        <li className="me-2">
          <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Nuclei</a>
        </li>
      </ul>

      <div id="nmap-scan">
        {
          loading ? <Loading /> :
            (
              tab === "nmap" ? 
              <div>
                <div className="w-2/3">
                  <h1 className="font-bold mb-5 mt-2">Nmap (Network Mapper) adalah alat sumber terbuka untuk pemindaian dan penemuan jaringan. Ini digunakan untuk mendeteksi host yang aktif, layanan yang berjalan, sistem operasi, dan firewall di jaringan</h1>
                  <h1>Berikut adalah hasil scaning dari Nmap</h1>
                </div>
                {
                  nmap_data?.data.map((item, index) => (
                    <div key={index} id="kotak-hasil" className='border-[0.1px] w-full border-[#939393] my-4'>
  
                      <div className="flex flex-row p-5">
                        {/* 4 colom */}
                        <div className="w-1/4">
                          <h1 className="font-bold">Name</h1>
                          <p>{item.service._attributes.name}</p>
                        </div>
                        <div className="w-1/4">
                          <h1 className="font-bold">Port</h1>
                          <p>{item.portid}</p>
                        </div>
                        <div className="w-1/4">
                          <h1 className="font-bold">Product</h1>
                          <p>{item.service._attributes.product || "-"}</p>
                        </div>
                        <div className="w-1/4">
                          <h1 className="font-bold">Version</h1>
                          <p>{item.service._attributes.version || "-"}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
             : tab === "nikto" ? 
              <div>
              <div className="w-2/3">
                <h1 className="font-bold mb-5 mt-2">Nikto adalah alat open-source yang digunakan untuk melakukan pemindaian kerentanan web server. Nikto mengevaluasi berbagai masalah keamanan seperti file dan direktori yang rentan, software server yang sudah usang, serta masalah konfigurasi server yang dapat dieksploitasi oleh penyerang.</h1>
                <h1>Berikut adalah hasil scaning dari Nmap</h1>
              </div>
              {nikto_data?.data.map((item, index) => (
                <div key={index} id="kotak-hasil" className='border-[0.1px] w-full border-[#939393] my-4'>
                  <div className="flex flex-row p-5">
                    {/* 4 colom */}
                    <div className="w-1/4">
                      <h1 className="font-bold">Link</h1>
                      <p>{item.namelink}</p>
                    </div>
                    <div className="w-1/4">
                      <h1 className="font-bold">Uri</h1>
                      <p>{item.uri}</p>
                    </div>
                    <div className="w-1/4">
                      <h1 className="font-bold">Method</h1>
                      <p>{item.method}</p>
                    </div>
                    <div className="w-1/4">
                      <h1 className="font-bold">Description</h1>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              </div>: null
            )
        }
      </div>
    </div>
  );
}
