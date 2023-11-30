/**
 * Component representing a list of bookings for a venue manager.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.venue - The venue details.
 * @returns {JSX.Element} - The rendered ManagerBookings component.
 */
export const ManagerBookings = ({ venue }) => {
  return (
    <div>
      <h2 className="text-uppercase fs-5 text-center mb-0 mt-5">A list of</h2>
      <h1 className="text-uppercase fs-1 text-center mb-5">Bookings</h1>

      {venue && venue.bookings && venue.bookings.length > 0 ? (
        <div className="row text-dark">
          {venue &&
            venue.bookings &&
            venue.bookings.map((booking) => (
              <div key={booking.id} className="col-lg-6 p-3">
                <div
                  className="card border border-dark"
                  style={{ borderRadius: 0 }}
                >
                  <div className="card-body m-2">
                    <h3 className="card-title text-uppercase fs-4 font-weight-bold">
                      Customer name: {booking.name}
                    </h3>
                    <p className="fs-5 card-text mb-0">
                      <b>Guests: </b>
                      {booking.guests}
                    </p>
                    <p className="fs-5 card-text mb-0">
                      <b>Check-in: </b>
                      {new Date(booking.dateFrom).toLocaleDateString()}
                    </p>
                    <p className="fs-5 card-text mb-0">
                      <b> Check-out: </b>
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                    <p className="fs-5 card-text">
                      <b>Booking IDs: </b>
                      {booking.id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="fs-5">There is no booking yet.</p>
      )}
    </div>
  );
};
