import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { url } from "../env"
import { Loading } from "../layouts/Loading"
import { ResumeTab } from "./moleculs/Resume"
import jsPDF  from "jspdf";
import html2canvas from 'html2canvas'

export default function LaporanComponent ({ip}: any) {
    
    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const pdfRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        axios.get(`${url}/host/${ip}`).then(res => {
            setData(res.data.data)
            setLoading(false)
        })
    }, [])
    
    const downloadPDF = async () => {
        const input = pdfRef.current;
        if (input) {
            const subreport = document.getElementById('sub-report')
            const unduh = document.getElementById('unduh')
            setLoading(true)
            unduh?.classList.add('hidden')
            subreport?.classList.remove('max-w-4xl')
            await html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
    
                // Height of the content in the canvas
                const canvasHeight = canvas.height;
                const canvasWidth = canvas.width;
    
                // Scale factor to maintain aspect ratio
                const ratio = canvasWidth / width;
                const scaledHeight = canvasHeight / ratio;
    
                // Number of pages needed
                const pages = Math.ceil(scaledHeight / height);
    
                for (let i = 0; i < pages; i++) {
                    if (i !== 0) {
                        pdf.addPage();
                    }
                    const position = -i * height;
                    pdf.addImage(imgData, 'PNG', 0, position, width, scaledHeight);
                }
    
                pdf.save('report.pdf');
            });
            subreport?.classList.add('max-w-4xl');
            unduh?.classList.remove('hidden')
            setLoading(false)
        }
    }
    
    return (
        loading ? <Loading /> : (
            <div id="report" ref={pdfRef}>
                <div id="sub-report" className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-white text-white p-4 flex justify-between items-center">
                    <h1 className="text-xl text-black font-bold">Scan Report - Scanned at {data.host.last_scan}</h1>
                    <button id="unduh" onClick={downloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Unduh   
                    </button>
                </div>
                <div className="p-4">
                    <div className="bg-gray-200 p-4 rounded-lg my-2">
                        <p>Target Name</p>
                        <h3 className="text-green-600 font-bold text-xl ">{data.host.name}</h3>
                        <br/>
                        <p>Target Address</p>
                        <h3 className="text-green-600 font-bold text-xl ">{data.host.host}</h3>
                    </div>
                    <div id="nmap">
                        <h1 className="font-bold text-xl mt-5 mb-3">Nmap Report</h1>
                        <p className="text-lg"> Scan result</p>
                        <table className="table-auto w-full text-left border-collapse my-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Port</th>
                                    <th className="border p-2">State</th>
                                    <th className="border p-2">Service</th>
                                    <th className="border p-2">Reason</th>
                                    <th className="border p-2">Product</th>
                                    <th className="border p-2">Version</th>
                                    <th className="border p-2">Extra info</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.nmap_data.map((item: any, index: number) => (
                                <>
                                <tr key={index} id="kotak-hasil">
                                    <td className="border p-2">{item.portid}</td>
                                    <td className="border p-2 text-green-600">{item.state._attributes.state}</td>
                                    <td className="border p-2">{item.service._attributes.name}</td>
                                    <td className="border p-2">{item.state._attributes.reason}</td>
                                    <td className="border p-2">{item.service._attributes.product}</td>
                                    <td className="border p-2">{item.service._attributes.version}</td>
                                    <td className="border p-2"></td>
                                </tr>
                                {
                                    item.hasOwnProperty('script') ? 
                                    // cek apakah item.script array
                                    Array.isArray(item.script) ?
                                    item.script.map((item: any) => {
                                    return (
                                        <tr key={item._attributes.id}>
                                        <td className='border p-2'></td>
                                        <td className='border p-2'>{item._attributes.id}</td>
                                        <td className='border p-2' colSpan={6}>{item._attributes.output}</td>
                                        </tr>
                                    )
                                    }) : (
                                    <>
                                        { console.log(item) }
                                        <tr key={item.script._attributes.id}>
                                        <td className='border p-2'></td>
                                        <td className='border p-2'>{item.script._attributes.id}</td>
                                        <td className='border p-2' colSpan={6}>{item.script._attributes.output}</td>
                                        </tr>
                                    </>
                                    )
                                    : null
                                }
                                </>
                            ))} 
                            </tbody>
                        </table>
                        <p className="text-lg">Explanation</p>
                        {
                            data.report_data.nmap.map((data: any, index: number) => {
                                return (
                                    <table className="table-auto w-full text-left border-collapse my-4 border-4 border-gray-300">
                                        <tbody>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Port</td>
                                                <td className="border-2 border-gray-400 p-2">{data.port}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Description</td>
                                                <td className="border-2 border-gray-400 p-2">{data.description}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Threat</td>
                                                <td className="border-2 border-gray-400 p-2">{data.threat}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Solution</td>
                                                <td className="border-2 border-gray-400 p-2">{data.solution}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            })
                        }
                    </div>
                    <div id="nikto">
                        <h1 className="font-bold text-xl mt-5 mb-3">Nikto Report</h1>
                        <p className="text-lg">Scan result</p>
                        <table className="w-full text-left border-collapse my-4 table-fixed">
                            <thead>
                                <tr className="bg-gray-200">
                                    <td className="border p-2">Uri</td>
                                    <th className="border p-2">Namelink</th>
                                    <th className="border p-2">Method</th>
                                    <th className="border p-2">Description</th>
                                </tr>
                            </thead>
                        {
                            data.nikto_data.map((item: any) => {
                                return (
                                    <tr id="kotak-hasil">
                                        <td className="border p-2 text-green-600">{item.uri}</td>
                                        <td className="border p-2 break-words">{item.namelink}</td>
                                        <td className="border p-2">{item.method}</td>
                                        <td className="border p-2 break-words">{item.description}</td>
                                    </tr>
                                )
                            })
                        }
                        </table>
                        <p className="text-lg">Explanation</p>
                        {
                            data.report_data.nikto.map((data: any, index: number) => {
                                return (
                                    <table className="table-auto w-full text-left border-collapse my-4 border-4 border-gray-300">
                                        <tbody>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Link</td>
                                                <td className="border-2 border-gray-400 p-2">{data.port}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Description</td>
                                                <td className="border-2 border-gray-400 p-2">{data.description}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Threat</td>
                                                <td className="border-2 border-gray-400 p-2">{data.threat}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-2 border-gray-400 p-2">Solution</td>
                                                <td className="border-2 border-gray-400 p-2">{data.solution}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            })
                        }
                    </div>
                    <div id="subfinder">
                        <h1 className="font-bold text-xl mt-5 mb-3">Subfinder</h1>
                        <ul className="m-2 list-disc list-inside">
                        {
                            data.subfinder_data.map((item: any) => {
                                return (
                                    <li>
                                        {item.subdomain}
                                        <span
                                        // jika status 200 maka warna tulisan hijau selain itu merah
                                        className={`text-xs font-bold ${
                                            item.status === 200 ? "text-green-600" : "text-red-600"
                                        }`}
                                        >
                                            {" "}{item.status}
                                        </span>
                                    </li>
                                )
                            }) 
                        }
                        </ul>
                    </div>
                    <div id="Resume">
                        <h1 className="font-bold text-xl mt-5 mb-3">Resume AI</h1>
                        <ResumeTab resume={data.resume_data}/>
                    </div>
                </div>
                </div>
            </div>
        )
    )
}