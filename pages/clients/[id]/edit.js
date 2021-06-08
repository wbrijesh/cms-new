import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import Content from "../../../components/editClient";
import { useRouter } from "next/router";
import { DataStore } from "@aws-amplify/datastore";
import { Client } from "../../../models";

function Home() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [thisClient, setThisClient] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchClient = async () => {
      const models = await DataStore.query(Client, id);
      setThisClient(models);
      console.log("THIS_CLIENT: ", models);
    };
    fetchClient();
  }, []);

  return (
    <>
      <div className="h-screen bg-white overflow-hidden flex">
        <Navbar
          navigation={navigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Content
          setNavigation={setNavigation}
          setSidebarOpen={setSidebarOpen}
          thisClient={thisClient}
        />
      </div>
    </>
  );
}

export default Home;
