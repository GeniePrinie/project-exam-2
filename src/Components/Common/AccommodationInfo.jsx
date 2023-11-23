export const AccommodationInfo = ({ venue }) => {
  return (
    <div>
      <table className="text-uppercase" style={{ border: "1px solid #000" }}>
        <thead
          className="bg-dark text-light border-light "
          style={{ border: "1px solid" }}
        >
          <tr>
            <th className="py-2 px-3 border-1">
              <b>Accomodation</b>
            </th>
            <th className="py-2 px-3 border-1">
              <b>Yes</b>
            </th>
            <th className="py-2 px-3 border-1">
              <b>No</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {venue.meta &&
            Object.entries(venue.meta).map(([feature, value]) => (
              <tr key={feature} style={{ border: "1px solid" }}>
                <td className="py-2 px-3 border-1">
                  <b>{feature}</b>
                </td>
                <td className="py-2 px-3 border-1 text-center">
                  {value ? "x" : ""}
                </td>
                <td className="py-2 px-3 border-1 text-center">
                  {!value ? "x" : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
