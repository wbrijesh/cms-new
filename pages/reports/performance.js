import { DataStore } from "@aws-amplify/datastore";
import { Rmodel } from "../../models";
import moment from "moment";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import PerformanceContent from "../../components/reportsPerformance";
// import UploadContent from "../../components/reportsUpload";
// import PacingContent from "../../components/reportsPacing"
// import ProfitContent from "../../components/reportsProfit"

export default function index() {
  const [reports, setReports] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportExists, setReportExists] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const today = moment().format();
      const models = await DataStore.query(Rmodel);
      setReports(models);
      models.map((report) =>
        report.createdAt.toString().replace(/\T.*/, "") ===
        today.toString().replace(/\T.*/, "")
          ? setReportExists(true)
          : console.log("todays report not uploaded yet")
      );
    };
    fetchReports();
  }, []);

  return (
    <>
      {reports && (
        <div className="h-screen bg-white overflow-hidden flex">
          <Navbar
            navigation={navigation}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <PerformanceContent
            setNavigation={setNavigation}
            setSidebarOpen={setSidebarOpen}
            reports={reports}
            reportExists={reportExists}
          />
        </div>
      )}
    </>
  );
}
