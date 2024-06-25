export const SubfinderTab = ({item, index}: any) => {
    return (
        <div key={index} id="kotak-hasil" className='border-[0.1px] w-full border-[#939393] my-4'>
            <div className="flex flex-row p-5">
                <div className="w-1/4">
                <h1 className="font-bold">Subdomain</h1>
                <p>{item.subdomain}</p>
                </div>
                <div className="w-1/4">
                <h1 className="font-bold">IP</h1>
                <p>{item.ips.join(", ")}</p>
                </div>
                <div className="w-1/4">
                <h1 className="font-bold">Status</h1>
                <p>{item.status}</p>
                </div>
            </div>
        </div>

    )
}