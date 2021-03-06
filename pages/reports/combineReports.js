import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Report, Campaign, Client } from "../../models";
import Navbar from "../../components/navbar";
import Content from "../../components/reportsCombine";

function index() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const models = await DataStore.query(Report);
      setReports(models);
    };
    fetchReports();
  }, []);

  return (
    <div className="h-screen bg-white overflow-hidden flex">
      {reports && (
        <>
          <Navbar
            navigation={navigation}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Content
            setNavigation={setNavigation}
            setSidebarOpen={setSidebarOpen}
            reports={reports}
          />
        </>
      )}
    </div>
  );
}

export default index;
