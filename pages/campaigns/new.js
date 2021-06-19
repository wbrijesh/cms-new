import { DataStore } from "@aws-amplify/datastore";
import { Campaign } from "../../models";
import { useState, useEffect, useRef } from "react";
import { Storage } from "aws-amplify";
import Navbar from "../../components/navbar";
import NewCampaign from "../../components/newCampaign";

export default function Homepage() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [campaignList, setCampaignList] = useState([]);
  // const [boFile, setBoFile] = useState(null);
  // const hiddenFileInput = useRef(null);

  useEffect(() => {
    async function getCampaignList() {
      const models = await DataStore.query(Campaign);
      setCampaignList(models);
      console.log("CAMPAIGNS LIST: ", campaignList);
    }
    getCampaignList();
  }, []);

  return (
    <>
      {campaignList && (
        <div className="h-screen bg-white overflow-hidden flex">
          <Navbar
            navigation={navigation}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <NewCampaign
            setNavigation={setNavigation}
            setSidebarOpen={setSidebarOpen}
            campaignList={campaignList}
          />
        </div>
      )}
    </>
  );
}
