import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Content from "../../components/reportsHome";

export default function index() {
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
