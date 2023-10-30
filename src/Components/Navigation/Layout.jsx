import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Layout component serves as the overall layout structure for the entire application.
 * It includes the header, the main content (determined by the router's `Outlet`), and the footer.
 * @component
 * @returns {JSX.Element} The Layout component.
 */
export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
