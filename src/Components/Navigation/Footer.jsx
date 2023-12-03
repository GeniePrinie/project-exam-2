/**
 * Footer component serves as the site's footer.
 * It displays a message indicating that the site is a course project for educational purposes.
 *
 * @component
 * @returns {JSX.Element} The Footer component.
 */
export const Footer = () => {
  return (
    <footer className="footer py-3 text-center bg-dark text-light ">
      This site is a Noroff Frontend development course project by Prinyapon
      Prinyanut, purely for educational purposes, with no real venues.
    </footer>
  );
};
