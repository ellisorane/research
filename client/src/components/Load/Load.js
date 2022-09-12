import { useEffect } from "react";
import { useLocation } from "react-router";


// Load Projects and Automatically scroll to the top of the page on route change
const Load = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);

    if(location.pathname === '/') 
    props.loadData();
    
  }, [location]);

  return <>{props.children}</>
};

export default Load;