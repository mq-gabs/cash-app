interface ITable {
  columns: string[];
  data: any[][];
}


export default function Table({
  columns = [],
  data = [],
}: ITable) {
  return (
    <table className="border">
      <tr className="">
        {columns?.map(col => (
          <th className="border p-2">
            {col}
          </th>
        ))}
      </tr>
      {data?.map(row => (
        <tr className="border">
          {row?.map(cel => (
            <td className="border p-2">
              {cel}
            </td>
          ))}
        </tr>
      ))}
    </table>
  )
}