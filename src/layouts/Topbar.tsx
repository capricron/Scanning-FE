import ModalAddScan from "../components/Modal_add_scan";

export default function Topbar() {
    return (
        <div className="bg-[#454D56] w-full h-auto">
            <div className="p-5 flex justify-between">
                <a href="/">
                    <h1 className="text-white font-bold text-2xl px-2 py-1">Scanning Vuln</h1>  
                </a>
                <div>
                    <ModalAddScan />
                </div>
            </div>
        </div>
    )
}
    