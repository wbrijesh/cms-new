import { DataStore } from "@aws-amplify/datastore";
import { Client } from "../../models";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import NewClient from "../../components/newClient";

export default function Homepage() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clientList, setClientList] = useState([]);
  useEffect(() => {
    async function getClientList() {
      const models = await DataStore.query(Client);
      setClientList(models);
      console.log("CLIENTS LIST: ", clientList);
    }
    getClientList();
  }, []);

  return (
    <>
      {clientList && (
        <div className="h-screen bg-white overflow-hidden flex">
          <Navbar
            navigation={navigation}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <NewClient
            setNavigation={setNavigation}
            setSidebarOpen={setSidebarOpen}
            clientList={clientList}
          />
        </div>
      )}
    </>
  );
}
