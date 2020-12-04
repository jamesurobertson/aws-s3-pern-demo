import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "./Routes";
import { restoreUser } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && <Routes />;
}

export default App;
