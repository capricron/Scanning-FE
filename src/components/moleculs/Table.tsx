import { useEffect, useState } from "react"
import { getHost } from "../../api/host/get_host"
import '../../css/table.css'
import type { responseApi } from "../../types/res.type"
import type { TableProps } from "../../types/table_props.type"
import { Loading } from "../../layouts/Loading"
import axios from "axios"
import { url } from "../../env"


export const Table: React.FC<TableProps> = ({ columns }) => {

    const [data, setData] = useState<responseApi | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            const res: responseApi = await getHost();
            setData(res);
            setLoading(false);
        };

        fetchData();
    }, []);

    const deleteHost = (host: string) => {
        setLoading(true)
        axios.delete(`${url}/host/${host}`)
        .then(() => {
            const fetchData = async () => {
                const res: responseApi = await getHost();
                setData(res);
                setLoading(false);
            };
    
            fetchData();
        })
    }
    
    return(    
        <div>
           {
                loading ? <Loading/> : 
                (
                    <table className="shadow-md overflow-hidden w-full mt-5 text-sm text-left rtl:text-right">
                        <thead>
                        <tr className="bg-indigo-800">
                            {/* looping columns */}
                            {columns.map((item, index) => (
                                <th key={index} className="text-white p-4 dark:text-white">{item}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>     
                            {/* looping data */}
                            {data?.data.map((item, index) => (
                                <tr key={index} className="bg-white dark:bg-gray-800">
                                    <td className="text-black">{item.name}</td>
                                    <td className="text-black">{item.host}</td>
                                    <td className="text-black">{item.last_scan}</td>
                                    {/* button detail */}
                                    <td className="text-black">
                                        <a href={`/host/${item.host}`}>
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detail</button>
                                        </a>
                                    </td>
                                    <td>
                                        <img onClick={() => deleteHost(item.host)} src="/public/images/close.svg" className="close-icon"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
           }
        </div>
    )
}