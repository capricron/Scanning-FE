import React from 'react'
import { useState } from "react"
import Swal from 'sweetalert2'
import { Loading } from '../layouts/Loading'
import axios from 'axios'
import { url } from '../env'

export default function ModalAddScan () {

    const [name, setName] = useState<string>('')
    const [host, setHost] = useState<string>('')
    const [nmap, setNmap] = useState<boolean>(false)
    const [nikto, setNikto] = useState<boolean>(true)
    const [nuclei, setNuclei] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    const scanTarget = () => {
        console.log("scan start")
        // host tidak boleh kosong
        if(host === ''){
            Swal.fire({
                title: 'Error!',
                text: 'Nama Host tidak boleh kosong',
                icon: 'error',
                confirmButtonText: 'Oke'
            })
            return
        }
        
        axios.post(`${url}/host`, {
            name,
            host,
            nmap,
            nikto,
            nuclei
        }).then(
            (res) => {
                Swal.fire({
                    title: 'Selesai',
                    text: 'yee',
                    icon: 'success',
                    confirmButtonText: 'Oke'
                })
            }
        ).catch(
            (err) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Sepertinya host sedang tidak aktif :(',
                    icon: 'error',
                    confirmButtonText: 'Oke'
                })

                setLoading(false)
            }
        )
    }
    
    return (
        <div>            
            <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                New Scan
            </button>
        
            <div id="default-modal" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Tambah Scan Target Baru
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {
                            loading ? 
                            <div className='p-28'>
                                <Loading />
                            </div>:
                            <div className="p-4 md:p-5 space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="host" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama</label>
                                <input 
                                onChange={
                                    (e) => {
                                        setName(e.target.value)
                                    }
                                }
                                type="text" id="name" name="host" className="text-black block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600" placeholder="Masukan nama host"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="host" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Host</label>
                                <input 
                                onChange={
                                    (e) => {
                                        setHost(e.target.value)
                                    }
                                }
                                type="text" id="host" name="host" className="text-black block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600" placeholder="Masukan nama host"/>
                            </div>
                            <div className="space-y-2"> 
                                <div className="flex items-center">
                                    <input
                                    onChange={
                                        (e) => {
                                            setNmap(e.target.checked)
                                        }
                                    }
                                    id="nmap" type="checkbox" value="nmap" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="nmap" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nmap</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    onChange={
                                        (e) => {
                                            setNikto(e.target.checked)
                                        }
                                    }
                                    id="nikto" type="checkbox" value="nikto" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="nikto" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nikto</label>
                                </div>
                                <div className="flex items-center">
                                    <input 
                                    onChange={
                                        (e) => {
                                            setNuclei(e.target.checked)
                                        }
                                    }
                                    id="nuclei" type="checkbox" value="nuclei" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="nuclei" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nuclei</label>
                                </div>
                                <p className="text-black">Jika tidak memilih maka secara otomatis akan menscan semuanya</p>
                            </div>
                        </div>
                        }
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button 
                            onClick={scanTarget}
                            // data-modal-hide="default-modal"
                            type="button" className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Scant</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}