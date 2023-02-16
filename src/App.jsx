//import pic from "./assets/image/y1.jpg";
import React, { useState, useEffect } from "react";

import searchIcon from "./assets/icon-search.svg";
import sunIcon from "./assets/icon-sun.svg";

import twitterImg from "./assets/icon-twitter.svg";
import companyImg from "./assets/icon-company.svg";
import locationImg from "./assets/icon-location.svg";
import webImg from "./assets/icon-website.svg";
import logoDark from "./assets/logo_dark.svg";
import logo from "./assets/logo.svg";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState();
  const [join, setDate] = useState();
  const [theme, setTheme] = useState(null);
  const [logos, setLogo] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/users/yusuf22-u`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);
  //prefer-color-scheme check
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
      setLogo(true);
    } else {
      setTheme("light");
      setLogo(false);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setLogo(true);
    } else {
      document.documentElement.classList.remove("dark");
      setLogo(false);
    }
  }, [theme]);
  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  function handlesubmit(e) {
    e.preventDefault();

    fetch(`https://api.github.com/users/${search}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("no result");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setError(null);

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const joinedDate = data.created_at.slice(0, 10);
        const date = new Date(joinedDate);
        let month = months[date.getMonth()];
        let d = date.getDate();
        let yy = date.getFullYear();

        let fullDate = d + " " + month + " " + yy;

        setDate(fullDate);

        console.log(fullDate);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  //date format

  return (
    <div className="App bg-third-color md:w-[100%] dark:bg-white-color w-[100%] sm:w-[80%]  ">
      <div className=" pb-32 mt-[-80px] w-[100%] relative">
        <div className="contecnt-wrapper flex flex-col md:w-[742px] space-y-10 mt-[-78px]  justify-center">
          <div className="header-text dark:text-[#141d2f] sm:pl-6  sm:pr-6 text-white flex space-x-16 justify-between mr-[-50px] pt-32 ml-1">
            {logos ? (
              <img className="" src={logo} alt="logoDark" />
            ) : (
              <img className="" src={logoDark} alt="logoDark" />
            )}
            <h3 className="flex pr-4 ml-16 space-x-4">
              <span className="font-bold text-lg">Light</span>
              <div className="space-x-4 pt-1 pr-8">
                <img
                  onClick={changeTheme}
                  className=""
                  src={sunIcon}
                  alt="sunIcon"
                />
              </div>
            </h3>
          </div>

          <form action="" onSubmit={handlesubmit}>
            <div className="error text-red-500 relative">
              {error && (
                <div className="error mt-4 ml-[500px] font-bold absolute sm:ml-[300px] md:ml-[420px]">
                  {error}
                </div>
              )}
            </div>
            <div className="search-wrapper w-[100%] relative pb-6">
              <img
                className="pr-3 pl-6 left-2 ml-1 mt-4 text-xl absolute fa-solid fa-magnifying-glass md:ml-[-15px] sm:ml-[40px] sm:mt-5"
                src={searchIcon}
                alt="icon"
              />
              <input
                className=" input-search w-[100%] dark:bg-plane-White-color font-bold  dark:shadow-lg dark:shadow-gray-500/50  ml-1 pt-4 pb-4 rounded-md indent-16 md:ml-[5px] text-white md:w-[100%]  bg-main-color sm:w-[80%]  sm:ml-[57px] sm:pt-5 sm:pb-5 sm:indent-12 md:indent-16 dark:text-text-color"
                type="text"
                name="search"
                id=""
                value={search}
                placeholder="Search GitHub username"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              <button
                onClick={handlesubmit}
                className="pt-3 pb-3 pr-6 pl-6 text-white rounded-md bg-btn-color absolute top-1 space-y-10 md:ml-[55px] left-[580px] sm:ml-[-170px] sm:mt-1  hover:bg-green-600 active:bg-white active:text-blue-500 "
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="main-body dark:bg-plane-White-color  dark:shadow-lg dark:shadow-gray-500/50 md:w-[55%] sm:w-[80%]  rounded-md bg-main-color shadow-xl ">
          <div key={users.id}>
            <div className="main-content flex justify-between  w-[100%] pt-8 sm:flex-col md:flex-row md:w-[100%] md:">
              <div className="profile-pic">
                <img
                  className="w-32 ml-16 absolute h-32 sm:ml-[8px] rounded-full sm:max-w-[100px] sm:max-h-[100px] md:max-w-[50%] md:max-h-[50%] md:pr-1"
                  src={users.avatar_url}
                  alt="profile picture"
                />
              </div>
              <div className="user-detail dark:text-text-color md:pl-4 space-y-5 mt-4 sm:ml-2 text-white ml-32  ">
                <h2 className="text-2xl dark:text-text-color md:w-[60%]  ml-32  font-bold tracking-widest capitalize  ">
                  {users.name}
                </h2>
                <span className=" ml-32 mt-8 text-red-100 dark:text-text-color ">
                  {users.login}
                </span>
                <div className="date-joined  text-white mr-5 mt-5 sm:ml-32 sm:space-y-2">
                  <h4 className=" flex dark:text-text-color  sm:translate-y-[-10px] sm:pb-4 md:translate-y-[-70px] md:translate-x-[300px] md:ml-[-20px] md:w-[100%] ">
                    <strong>Joined</strong>
                    <span
                      onChange={(e) => setDate(e.target.value)}
                      value={join}
                      className=" flex pr-1 dark:text-text-color ml-2 w-[200px]"
                    >
                      {join ? join : "22 Sep 2022"}
                    </span>
                  </h4>
                </div>
              </div>
              <p className="px-2 ml-32 w-[100%] sm:ml-2 sm:pt-4 md:pt-8 md:translate-y-[90px] md:relative md:ml-[-250px] text-white font-bold text-lg dark:text-text-color md:pr-4">
                {users.bio ? users.bio : "No bio"}
              </p>
            </div>
            <div className="rating dark:bg-plane-White-color  dark:shadow-lg dark:shadow-gray-500/50 pt-4 pb-4 bg-secondary-color text-white pr-5 pl-5 mt-5 flex left-[330px] justify-between absolute ml-64 w-[29.5%] shadow-xl sm:ml-[-255px] sm:w-[70%] md:w-[90%] md:ml-[-297px] md:pt-8 md:pb-8 md:mt-[50px] md:relative rounded-md">
              <div className="repos dark:text-text-color">
                <strong>Repos</strong>
                <h3>{users.public_repos}</h3>
              </div>
              <div className="Followers dark:text-text-color">
                <strong>Followers</strong>
                <h3>{users.followers}</h3>
              </div>
              <div className="following dark:text-text-color">
                <strong>Following</strong>
                <h3>{users.following}</h3>
              </div>
            </div>
            <div className="footer sm:flex-col md:mt-[-100px] md:flex-row sm:ml-2  flex justify-between w-[100%] ml-1 text-white pr-4 pb-4">
              <div className="location mt-32 ml-[250px] sm:ml-2">
                <p className="flex space-x-2">
                  <img
                    className="pr-4 sm:h-8 sm:pb-2 dark:text-plane-White-color"
                    src={locationImg}
                    alt=""
                  />
                  <div className="sm:ml-8 dark:text-text-color">
                    {users.location ? users.location : "Not available"}
                  </div>
                </p>
                <p className="flex space-x-2 dark:text-text-color">
                  <img className="pr-4 sm:h-8 sm:pb-2" src={webImg} alt="" />
                  {users.blog ? users.blog : "no blog"}
                </p>
              </div>
              <div className="location mt-32 sm:mt-2 sm:ml-2 md:mt-[120px] md:pt-2 md:mr-4">
                <p className="flex space-x-2 dark:text-text-color">
                  <img
                    className="pr-4 sm:h-8 sm:pb-2"
                    src={twitterImg}
                    alt=""
                  />
                  {users.twitter_username
                    ? users.twitter_username
                    : "Not Available"}
                </p>
                <p className="flex space-x-2 dark:text-text-color">
                  <img
                    className="pr-4 sm:h-8 sm:pb-2"
                    src={companyImg}
                    alt=""
                  />
                  @github
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  );
}

export default App;
