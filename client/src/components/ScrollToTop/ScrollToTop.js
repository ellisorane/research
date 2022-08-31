import { useEffect } from "react";
import { useLocation } from "react-router";


// Automatically srolls to the top of the page on route change
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;