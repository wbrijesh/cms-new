import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Report, Campaign, Client } from "../../models";
import Navbar from "../../components/navbar";
import Content from "../../components/reportsProfit";

function index() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState(null);
  const [campaigns, setCampaigns] = useState(null);
  const [clients, setClients] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const models = await DataStore.query(Report);
      setReports(models);
      const models2 = await DataStore.query(Campaign);
      setCampaigns(models2);
      const models3 = await DataStore.query(Client);
      setClients(models3);
    };
    fetchReports();
  }, []);

  return (
    <div className="h-screen bg-white overflow-hidden flex">
      {
        (reports,
        campaigns,
        clients && (
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
              clients={clients}
            />
          </>
        ))
      }
    </div>
  );
}

export default index;
