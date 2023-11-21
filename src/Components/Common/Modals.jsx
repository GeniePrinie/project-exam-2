export const ModalDeleteBooking = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">
          Are you sure you want to delete this booking?
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Yes</button>
          <button className="btn btn-dark">No</button>
        </div>
      </div>
    </div>
  );
};

export const ModalDeleteVenue = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">
          Are you sure you want to delete this venue?
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Yes</button>
          <button className="btn btn-dark">No</button>
        </div>
      </div>
    </div>
  );
};

export const ModalBookingSuccess = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Thank you for booking this venue!</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark">Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export const ModalCreateVenueSuccess = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">New venue has been created!</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark">Ok</button>
        </div>
      </div>
    </div>
  );
};

export const ModalCreateAccountSuccess = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Your account has been created!</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark">Ok</button>
        </div>
      </div>
    </div>
  );
};

export const ModalConfirmSignOut = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Are you sure you want to sign out</p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Yes</button>
          <button className="btn btn-dark">No</button>
        </div>
      </div>
    </div>
  );
};

export const ModalErrorCreateVenue = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">
          Invalid inputs. Venue is not created :(
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Close</button>
          <button className="btn btn-dark">Try again</button>
        </div>
      </div>
    </div>
  );
};

export const ModalErrorSignIn = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Incorrect email or password</p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Close</button>
          <button className="btn btn-dark">Try again</button>
        </div>
      </div>
    </div>
  );
};

export const ModalErrorSignUp = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="border border-dark p-5">
        <p className="text-uppercase mb-5">Invalid email</p>
        <div className="d-flex justify-content-center">
          <button className="btn me-5">Close</button>
          <button className="btn btn-dark">Try again</button>
        </div>
      </div>
    </div>
  );
};
