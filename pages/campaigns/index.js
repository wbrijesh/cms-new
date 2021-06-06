import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { useState } from "react";
import Navbar from "../../components/navbar";
import Content from "../../components/campaignContent";
Amplify.configure(awsconfig);

function Campaigns() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        />
      </div>
    </>
  );
}

export default Campaigns;
