export const NiktoTab = ({data}: any) => {
    return (
      <table className="table-auto w-full text-left border-collapse my-4 table-fixed">
        <thead>
          <tr className="bg-gray-200">
              <th className="border p-2">Link</th>
              <th className="border p-2">Uri</th>
              <th className="border p-2">Method</th>
              <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
        {data.data.map((item: any, index: number) => (
          <tr key={index} id="kotak-hasil">
              <td className="border p-2">{item.namelink}</td>
              <td className="border p-2 text-green-600">{item.uri}</td>
              <td className="border p-2">{item.method}</td>
              <td className="border p-2 break-words">{item.description}</td>
          </tr>
        ))}
        </tbody>
      </table>
    )
}