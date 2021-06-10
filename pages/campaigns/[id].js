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
      //     updated.title = `title ${Date.now()}`;
      //   })
      // );
    };
    fetchCampaign();
  }, []);

  return (
    <>
      {
        (clientList,
        thisCampaign,
        clientName && (
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
              clientName={clientName}
            />
          </div>
        ))
      }
    </>
  );
}

export default Home;

// import React from "react";
// import { useRouter } from "next/router";

// function Details() {
//   const router = useRouter();
//   const { id } = router.query;
//   return (
//     <div>
//       <h1>You're on: {id}</h1>
//     </div>
//   );
// }

// export default Details;
