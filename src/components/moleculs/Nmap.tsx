export const NmapTab = ({ data }: any) => {
  return (
    <>
      <div className="w-2/3">
        <h1 className="font-bold mb-5 mt-2">
          Nmap (Network Mapper) adalah alat sumber terbuka untuk pemindaian dan
          penemuan jaringan. Ini digunakan untuk mendeteksi host yang aktif,
          layanan yang berjalan, sistem operasi, dan firewall di jaringan
        </h1>
        <h1>Berikut adalah hasil scaning dari Nmap</h1>
      </div>
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
        {data.data.map((item: any, index: number) => (
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
                  <td className='border p-2' colSpan={2}>{item.script._attributes.id}</td>
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
    </>
  );
};




