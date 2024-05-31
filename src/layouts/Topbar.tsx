import ModalAddScan from "../components/Modal_add_scan";

export default function Topbar() {
    return (
        <div className="bg-[#454D56] w-full h-auto">
            <div className="p-5 flex justify-between">
                <h1 className="px-2 py-1">Scanning Vuln</h1>
                <div>
                    <ModalAddScan />
                </div>
            </div>
        </div>
    )
}
    