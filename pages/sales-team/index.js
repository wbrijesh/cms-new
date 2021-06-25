import { DataStore } from "@aws-amplify/datastore";
import { Salesteam } from "../../models";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Content from "../../components/salesHome";

export default function index() {
  const [salesTeam, setSalesTeam] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    async function fetchSalesTeam() {
      const models = await DataStore.query(Salesteam);
      setSalesTeam(models);
    }
    fetchSalesTeam();
  }, []);
  return (
    <>
      {salesTeam && (
        <div className="h-screen bg-white overflow-hidden flex">
          <Navbar
            navigation={navigation}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Content
            setNavigation={setNavigation}
            setSidebarOpen={setSidebarOpen}
            salesTeam={salesTeam}
          />
        </div>
      )}
    </>
  );
}
