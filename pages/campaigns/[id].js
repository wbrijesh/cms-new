import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Content from "../../components/campaignDetails";
import { useRouter } from "next/router";
import { DataStore } from "@aws-amplify/datastore";
import { Campaign, Client } from "../../models";

function Home() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [thisCampaign, setThisCampaign] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [clientName, setClientName] = useState([]);
  const [BO_file, setBO_file] = useState(null);
  const [JSONPlatforms, setJSONPlatforms] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCampaign = async () => {
      const models = await DataStore.query(Campaign, id);
      setThisCampaign(models);
      const list = await DataStore.query(Client);
      setClientList(list);
      // clientList.map((singleClient) => {
      //   if (singleClient.id == thisCampaign.clientID) {
      //     setClientName(singleClient);
      //     console.log("found it");
      //   }
      // });
      // const original = await DataStore.query(Campaign, id);
      // await DataStore.save(
      //   Campaign.copyOf(original, (updated) => {
      //     updated.clientID = "99fcaf30-9fb1-487a-9f73-e18c610b6dae";
      //   })
      // );
    };
    fetchCampaign();
  }, []);

  return (
    <>
      {
        (clientList,
        thisCampaign && (
          <div className="h-screen bg-white overflow-scroll flex">
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
        ))
      }
    </>
  );
}

export default Home;
