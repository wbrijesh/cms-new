import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import Content from "../../../components/editCampaign";
import { useRouter } from "next/router";
import { DataStore } from "@aws-amplify/datastore";
import { Campaign } from "../../../models";

function Home() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [thisCampaign, setThisCampaign] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCampaign = async () => {
      const models = await DataStore.query(Campaign, id);
      setThisCampaign(models);
      console.log("THIS_CLIENT: ", models);
    };
    fetchCampaign();
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
          thisCampaign={thisCampaign}
        />
      </div>
    </>
  );
}

export default Home;
