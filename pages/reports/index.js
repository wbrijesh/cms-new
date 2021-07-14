import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import Navbar from "../../components/navbar";
import Content from "../../components/reportsUpload";

function index() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const throwError = () => {
    throw new Error("Test sentry installation");
  };
  throwError();

  return (
    <div className="h-screen bg-white overflow-hidden flex">
      <Navbar
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Content setNavigation={setNavigation} setSidebarOpen={setSidebarOpen} />
    </div>
  );
}

export default index;
