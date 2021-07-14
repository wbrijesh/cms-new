import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Report } from "../../models";
import moment from "moment";
import Navbar from "../../components/navbar";
import Content from "../../components/reportsUpload";

function index() {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState(null);
  const [todaysReport, setTodaysReport] = useState(false);

  const throwError = () => {
    throw new Error("Test sentry installation");
  };
  // throwError();

  useEffect(() => {
    const fetchReports = async () => {
      const models = await DataStore.query(Report);
      setReports(models);
      const today = moment().format();
      models.map((report) =>
        report.createdAt.toString().replace(/\T.*/, "") ===
        moment().format().toString().replace(/\T.*/, "")
          ? setTodaysReport(true)
          : console.log("todays report not uploaded yet")
      );
    };
    fetchReports();
  }, []);

  return (
    <div className="h-screen bg-white overflow-hidden flex">
      <Navbar
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Content
        setNavigation={setNavigation}
        setSidebarOpen={setSidebarOpen}
        reports={reports}
        todaysReport={todaysReport}
      />
    </div>
  );
}

export default index;
