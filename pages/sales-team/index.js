import { DataStore } from "@aws-amplify/datastore";
import { SalesTeam } from "../../models";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Content from "../../components/salesHome";

function salesTeam() {
  const [navigation, setNavigation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [salesList, setSalesList] = useState(null);
  useEffect(() => {
    async function getSalesList() {
      const models = await DataStore.query(SalesTeam);
      setSalesList(models);
    }
    getSalesList();
  }, []);

  return (
    <>
      <div className="h-screen bg-white overflow-hidden flex">
        <>sales home</>
        {/* <Navbar
            navigation={navigation}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Content
            setNavigation={setNavigation}
            setSidebarOpen={setSidebarOpen}
          /> */}
      </div>
    </>
  );
}

export default salesTeam;
