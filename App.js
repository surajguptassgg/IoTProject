import React, { useState, useEffect } from "react";
// import { FaAngleDoubleRight } from "react-icons/fa";
import database from "./firebase";
import Histogram from "react-chart-histogram";
import Map from "./Map";

function App() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [accl, setAccl] = useState(0);
  const [pedo, setPedo] = useState(0);
  const [gps, setGps] = useState(0);
  const [alert, setAlert] = useState(0);
  const [hist, setHist] = useState([]);

  const fetchHist = async () => {
    await database
      .ref("StepsPerDay")
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        setHist([
          data.Day1,
          data.Day2,
          data.Day3,
          data.Day4,
          data.Day5,
          data.Day6,
          data.Day7,
        ]);
      });
  };

  const fetchJobs = async () => {
    setLoading(true);
    await database
      .ref("Accelerometer")
      .once("value")
      .then((snapshot) => {
        setAccl(parseInt(snapshot.val().key1));
      });
    await database
      .ref("Pedometer")
      .once("value")
      .then((snapshot) => {
        setPedo(parseInt(snapshot.val().key1));
      });
    await database
      .ref("GPS")
      .once("value")
      .then((snapshot) => {
        setGps(parseInt(snapshot.val().key1));
      });
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
    const acclVal = database.ref("Accelerometer").on("value", (snapshot) => {
      setAccl(parseInt(snapshot.val().key1));
    });
    const pedoVal = database.ref("Pedometer").on("value", (snapshot) => {
      setPedo(parseInt(snapshot.val().key1));
    });
    const gpsVal = database.ref("GPS").on("value", (snapshot) => {
      setGps(parseInt(snapshot.val().key1));
    });
    const alertVal = database.ref("Alert").on("value", (snapshot) => {
      setAlert(parseInt(snapshot.val().key1));
    });
    fetchHist();

    return () => {
      database.ref("Accelerometer").off("value", acclVal);
      database.ref("Pedometer").off("value", pedoVal);
      database.ref("GPS").off("value", gpsVal);
      database.ref("Alert").off("value", alertVal);
    };
  }, []);
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }
  const newOb = [
    { name: "Accelerometer", val: accl, title: "Acceleration Value", id: 1 },
    { name: "Pedometer", val: pedo, title: "Pedometer Value", id: 2 },
    { name: "GPS", val: gps, title: "GPS Value", id: 3 },
  ];
  const { val, name, title } = newOb[value];
  const labels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const data = hist;
  const options = {
    fillColor: "#FFFFFF",
    strokeColor: "#0000FF",
  };
  return (
    <section className="section">
      <div className="title">
        <h2>Dashboard</h2>
        <div className="underline"></div>
      </div>
      <div className="title">
        {alert === 1 && <h2 style={{ color: "red" }}>PERSON FELL!!</h2>}
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {newOb.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{name}</h4>
          {value === 2 && <Map />}
          {value === 1 && (
            <div>
              <Histogram
                xLabels={labels}
                yValues={data}
                width="800"
                height="400"
                options={options}
              />
              <h2>Number of steps today:</h2>
            </div>
          )}
          {/* <p className="job-date">{dates}</p> */}
          <h1>{val}</h1>
          {/* {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })} */}
        </article>
      </div>
      <button type="button" className="btn" onClick={fetchHist}>
        Refresh
      </button>
    </section>
  );
}

export default App;
