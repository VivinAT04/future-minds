type Props = {
  title: string;
  headers: string[];
  rows: string[][];
  empty?: string;
};

export default function AcademicTable({
  title,
  headers,
  rows,
  empty = "No records available.",
}: Props) {
  return (
    <section className="fm-academic-panel">
      <h2>{title}</h2>

      {rows.length === 0 ? (
        <p>{empty}</p>
      ) : (
        <div className="fm-academic-table-wrap">
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
