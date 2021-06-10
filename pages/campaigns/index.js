import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { DataStore } from "@aws-amplify/datastore";
import { Campaign } from "../../models";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Content from "../../components/campaignsHome";
Amplify.configure(awsconfig);

function Campaigns() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [campaignList, setcampaignList] = useState([]);

  useEffect(() => {
    getcampaignList();
    async function getcampaignList() {
      const models = await DataStore.query(Campaign);
      setcampaignList(models);
      console.log("CAMPAIGNS LIST: ", campaignList);
    }
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
          <Content
            setNavigation={setNavigation}
            setSidebarOpen={setSidebarOpen}
            campaignList={campaignList}
          />
        </div>
      )}
    </>
  );
}

export default Campaigns;
