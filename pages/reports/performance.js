import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Report, Campaign } from "../../models";
import Navbar from "../../components/navbar";
import Content from "../../components/reportsPerformance";

function index() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState(null);
  const [campaigns, setCampaigns] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const models = await DataStore.query(Report);
      setReports(models);
      const models2 = await DataStore.query(Campaign);
      setCampaigns(models2);
    };
    fetchReports();
  }, []);

  return (
    <div className="h-screen bg-white overflow-hidden flex">
      {
        (reports,
        campaigns && (
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
              campaigns={campaigns}
            />
          </>
        ))
      }
    </div>
  );
}

export default index;
