import { useEffect, useState } from 'react';
import type { responseApi } from '../../../types/res.type';
import { getNmap } from '../../../api/nmap/get_nmap';
import { Loading } from '../../../layouts/Loading';
import { getNikto } from '../../../api/nikto/getNikto';
import { NmapTab } from '../../moleculs/Nmap';
import { NiktoTab } from '../../moleculs/Nikto';
import { getReport } from '../../../api/get_report';
import { SubfinderTab } from '../../moleculs/Subfinder';
import { ResumeTab } from '../../moleculs/Resume';

export const TabScan = ({ ip }: any) => {
  const [nmap_data, set_nmap_data] = useState<responseApi | null>(null);
  const [nikto_data, set_nikto_data] = useState<responseApi | null>(null);
  const [subfinder_data, set_subfinder_data] = useState<responseApi | null>(null);
  const [resume_data, set_resume_data] = useState<any[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true);
  const [tab, setTab] = useState<string>("nmap")

  const TabFitur = async (fitur: string) => {
    setTab(fitur)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res_nmap: responseApi = await getReport(ip || "", "nmap");
      const res_nikto: responseApi = await getReport(ip || "", "nikto");
      const res_subfinder: responseApi = await getReport(ip || "", "subfinder")
      const res_ai: responseApi = await getReport(ip || " ", "ai")

      set_nmap_data(res_nmap);
      set_nikto_data(res_nikto);
      set_subfinder_data(res_subfinder);
      set_resume_data(res_ai.data);

      setLoading(false);
    };

    fetchData();
  }, [ip]);
  // text-white bg-indigo-800'
  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <a onClick={() => TabFitur('nmap')} className={`cursor-pointer inline-block p-4 rounded-t-lg  dark:hover:bg-gray-800 dark:hover:text-gray-300 
          ${
            tab === 'nmap' ? 'text-white bg-indigo-800' : 'hover:text-black hover:bg-gray-50'
          }`}>Nmap</a>
        </li>
        <a onClick={() => TabFitur('nikto')} className={`cursor-pointer	 inline-block p-4 rounded-t-lg  dark:hover:bg-gray-800 dark:hover:text-gray-300 
          ${
            tab === 'nikto' ? 'text-white bg-indigo-800' : 'hover:text-black hover:bg-gray-50'
          }`}>Nikto</a>
        <a onClick={() => TabFitur('subfinder')} className={`cursor-pointer	 inline-block p-4 rounded-t-lg  dark:hover:bg-gray-800 dark:hover:text-gray-300 
          ${
            tab === 'subfinder' ? 'text-white bg-indigo-800' : 'hover:text-black hover:bg-gray-50'
          }`}>Subfinder</a>
        <a onClick={() => TabFitur('resume')} className={`cursor-pointer	 inline-block p-4 rounded-t-lg  dark:hover:bg-gray-800 dark:hover:text-gray-300 
          ${
            tab === 'resume' ? 'text-white bg-indigo-800' : 'hover:text-black hover:bg-gray-50'
          }`}>Resume (AI)</a>
      </ul>

      <div id="scan" className="bg-white p-4">
        {
          loading ? <Loading /> :
            (
              tab === "nmap" ? 
              <div>
                <NmapTab data={nmap_data}/>
              </div>
             : tab === "nikto" ? 
              <div>
              <div className="w-2/3">
                <h1 className="font-bold mb-5 mt-2">Nikto adalah alat open-source yang digunakan untuk melakukan pemindaian kerentanan web server. Nikto mengevaluasi berbagai masalah keamanan seperti file dan direktori yang rentan, software server yang sudah usang, serta masalah konfigurasi server yang dapat dieksploitasi oleh penyerang.</h1>
                <h1>Berikut adalah hasil scaning dari Nmap</h1>
              </div>
              <NiktoTab data={nikto_data}/>
              </div>: tab === 'subfinder' ?
              <div>
                <div className="w-2/3">
                  <h1 className="font-bold mb-5 mt-2">Subfinder adalah alat sumber terbuka yang digunakan untuk melakukan pemindaian subdomain. </h1>
                </div>
                {/* looping list subfinder */}
                {subfinder_data?.data.map((item, index) => (
                  <SubfinderTab item={item} index={index} />
                ))}
              </div>:  tab === 'resume'? 
                <div>
                <div className="w-2/3">
                  <h1 className="font-bold mb-5 mt-2">Subfinder adalah alat sumber terbuka yang digunakan untuk melakukan pemindaian subdomain. </h1>
                </div>
                <ResumeTab resume={resume_data}/>
              </div>:<></>
            )
        }
      </div>
    </div>
  );
}
