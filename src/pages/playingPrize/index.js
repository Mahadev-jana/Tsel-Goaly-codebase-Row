import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../_helper/authentication";
import Swal from "sweetalert2";
import { isAuthenticate } from "../../_helper/authentication";
import ChoosePrize from "./ChoosePrize";
import ChooseSize from "./ChooseSize";
import RedeemPrize from "./RedeemPrize";
import WinnerDetails from "./WinnerDetails";
// import Waiting from "./waiting";
import { post } from "../../api";
import axios from "../../_config/axios";

import "./prize.css";

const index = () => {
  const [winnerInfo, setWinnerInfo] = useState({
    weeklyGiftId: "",
    weeklyGiftSize: 0,
    weeklyGiftName: "",
    weeklyPrizeStartDate: "",
    weeklyPrizeEndDate: "",
    weeklyPrizeRank: null,
    monthlyGiftId: "",
    monthlyGiftSize: 0,
    monthlyGiftName: "",
    monthlyPrizeStartDate: "",
    monthlyPrizeEndDate: "",
    monthlyPrizeRank: null,
    winnerName: "",
    winnerPostalCode: "",
    winnerCity: "",
    winnerPhoneNumber: "",
    winnerAddressDetails: "",

  });
  // const [allWinnerListFromAPI, setAllWinnerListFromAPI] = useState([]);
  const [weeklyWinnerListFromAPI, setWeeklyWinnerListFromAPI] = useState([]);
  const [index, setIndex] = useState(0);
  const [monthlyWinnerListFromAPI, setMonthlyWinnerListFromAPI] = useState([]);
  // const [allPrizeList, setAllPrizeList] = useState([]);
  const [weeklyPrizeList, setWeeklyPrizeList] = useState([]);
  const [monthlyPrizeList, setMonthlyPrizeList] = useState([]);
  const [weeklyWonPrize, setWeeklyWonPrize] = useState({});
  const [monthlyWonPrize, setMonthlyWonPrize] = useState({});
  const [weeklyPrizeWonStatus, setWeeklyPrizeWonStatus] = useState("pending");
  const [monthlyPrizeWonStatus, setMonthlyPrizeWonStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [prizeStatus, setPrizeStatus] = useState(true);
  const [prizeId, setPrizeId] = useState("");
  const [prizename, setPrizeName] = useState("");
  const [prizeSize, setPrizeSize] = useState(0);
  const [successLoading, setSuccessLoading] = useState(true);
  const [redeemPrizeStatus,setRedeemPrizeStatus]=useState();

  // const collectionWinnerData = () => {
  // if(winnerInfo.weeklyGiftId === "" && winnerInfo.monthlyGiftId !== "" ) {
  //   setPrizeId(winnerInfo.monthlyGiftId);
  //   setPrizeName(winnerInfo.monthlyGiftName);
  // }
  //   const payload = new FormData();
  //   payload.append('prize_id', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyGiftId : winnerInfo.weeklyGiftId);
  //   payload.append('prize_name', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyGiftName : winnerInfo.weeklyGiftName);
  //   payload.append('prize_size', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyGiftSize : winnerInfo.weeklyGiftSize);
  //   payload.append('winner_msisdn', getUserDetails().msisdn);
  //   payload.append('winner_name', getUserDetails().first_name);
  //   payload.append('rank', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeRank : winnerInfo.weeklyPrizeRank);
  //   payload.append('type', winnerInfo.weeklyGiftId === "" ? 'monthly' : 'weekly');
  //   payload.append('rank', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeRank : winnerInfo.weeklyPrizeRank);
  //   payload.append('prize_start_date', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeStartDate : winnerInfo.weeklyPrizeStartDate);
  //   payload.append('prize_end_date', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeEndDate : winnerInfo.weeklyPrizeEndDate);
  //   payload.append('receiver_name', winnerInfo.winnerName);
  //   payload.append('receiver_phone_no', winnerInfo.winnerPhoneNumber);
  //   payload.append('receiver_city', winnerInfo.winnerCity);
  //   payload.append('receiver_postal_code', winnerInfo.winnerPostalCode);
  //   payload.append('receiver_address', winnerInfo.winnerAddressDetails);
  //   axios.post('/StageGoalyApi/prizeRedeem')
  //   .then(()=> console.log("Hi"));
  // }
  useEffect(() => {
    if (isAuthenticate() == false) {
      Swal.fire({
        title: "you will need to login to claim prize",
        type: "info",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          window.location.href = "/login";
        } else if (result.dismiss === "cancel") {
          window.location.href = "/";
        }
      });
    } else {
      post("api/getWinnerBoard").then((res) => {
        // setAllWinnerListFromAPI(res.data.score_list.general);
        setLoading(false);
        setWeeklyWinnerListFromAPI(res.data.score_list.weekly);
        setMonthlyWinnerListFromAPI(res.data.score_list.monthly);
        // setAllPrizeList(res.data.all_prize_list);
        setWeeklyPrizeList(res.data.week_prize_list);
        setMonthlyPrizeList(res.data.month_prize_list);
        
      });
      
    }
  }, []);


              // for weekly

  useEffect(() => {
    // const totalWinnerlistFromAPI = [ ...allWinnerListFromAPI, ...weeklyWinnerListFromAPI, ...monthlyWinnerListFromAPI ] ;
    for (let i = 0; i < weeklyWinnerListFromAPI.length; i++) {
      if (getUserDetails().msisdn === weeklyWinnerListFromAPI[i].msisdn) {
        setWeeklyWonPrize(weeklyWinnerListFromAPI[i]);
        setWinnerInfo({
          ...winnerInfo, weeklyPrizeRank: weeklyWinnerListFromAPI[i].rank,
          weeklyPrizeStartDate: weeklyWinnerListFromAPI[i].start_date,
          weeklyPrizeEndDate: weeklyWinnerListFromAPI[i].end_date
        })
        setWeeklyPrizeWonStatus(true);
        console.log("weekly prize");
        break;
      } else {
        setWeeklyWonPrize({});
        setWeeklyPrizeWonStatus(false);
      }
    }

                    //For Monthly

    for (let i = 0; i < monthlyWinnerListFromAPI.length; i++) {
      if (getUserDetails().msisdn === monthlyWinnerListFromAPI[i].msisdn ) {
        // console.log(monthlyWinnerListFromAPI[i].redeem_status)
        // setMonthlyPrizeInfo_Won(allPrizeList[i]);
        // setUserPrizeStatus({ ...userPrizeStatus, monthlyPrizeStatus: true });
        // let monthlyPrizeItem = {prize : monthlyPrizeList[i]};
        // console.log(monthlyPrizeItem)
        // let status = {status : true }
        // console.log(status)
        // setMonthlyPrizeInfo_Won({ ...monthlyPrizeItem, ...status })

        // (monthlyPrize.redeem_status == false ? :monthlyGiftOptions)
         
        // if(redeemPrizeStatus==false){
        //   monthlyWinnerListFromAPI[i]
        // }
        // else(redeemPrizeStatus==true)
        // {
        //   console.log()
        // }
        if(monthlyWinnerListFromAPI[i].redeem_status === false) {
        setMonthlyWonPrize(monthlyWinnerListFromAPI[i]);
        setWinnerInfo({
          ...winnerInfo, monthlyPrizeRank: monthlyWinnerListFromAPI[i].rank,
          monthlyPrizeStartDate: monthlyWinnerListFromAPI[i].start_date,
          monthlyPrizeEndDate: monthlyWinnerListFromAPI[i].end_date
        })
        setMonthlyPrizeWonStatus(true);
        break;
        // console.log("monthly prize");
      }
      else {
        setMonthlyWonPrize(monthlyWinnerListFromAPI[i]);
        setWinnerInfo({
          ...winnerInfo, monthlyPrizeRank: monthlyWinnerListFromAPI[i].rank,
          monthlyPrizeStartDate: monthlyWinnerListFromAPI[i].start_date,
          monthlyPrizeEndDate: monthlyWinnerListFromAPI[i].end_date
        })
        setMonthlyPrizeWonStatus("redeemed");
        break;
      }
    } else {
        setMonthlyWonPrize({});
        setMonthlyPrizeWonStatus(false);
        console.log("Inside monthly else");
      }
    }
    // console.log(weeklyPrizeWonStatus);
    // console.log(monthlyPrizeWonStatus)
  }, [weeklyWinnerListFromAPI, monthlyWinnerListFromAPI]);

  useEffect(() => {
    // console.log(weeklyPrizeWonStatus, monthlyPrizeWonStatus);
    if (loading === false) {
      if (weeklyPrizeWonStatus == false && monthlyPrizeWonStatus == false) {
        Swal.fire({
          title: "You have not won any prizes yet.",
          type: "info",
          // showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonText: "OK",
          // cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.value) {
            window.location.href = "/";
          }
          // else if (result.dismiss === 'cancel') {
          //     window.location.href = "/";
          // }
        });
      } else return;
    } else return;
  }, [weeklyPrizeWonStatus, monthlyPrizeWonStatus]);

  // useEffect(() => {
  //   console.log(weeklyWonPrize);
  //   console.log(monthlyWonPrize);
  // });

  const nextTab = () => {
    if (index === 0) {
      if (winnerInfo.weeklyGiftId !== "" && winnerInfo.monthlyGiftId !== "") {
        Swal.fire({
          title: "Please select one prize at a time",
          type: "info",
          // showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonText: "OK",
          // cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.value) {
            setWinnerInfo({
              weeklyGiftId: "",
              weeklyGiftSize: "",
              monthlyGiftId: "",
              monthlyGiftSize: "",
              winnerName: "",
              winnerPostalCode: "",
              winnerCity: "",
              winnerPhoneNumber: "",
              winnerAddressDetails: "",
            });
            window.location.reload();
          }
        });
      } else if (
        winnerInfo.weeklyGiftId === "" &&
        winnerInfo.monthlyGiftId == ""
      ) {
        Swal.fire({
          title: "Please select one prize.",
          type: "info",
          // showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonText: "OK",
          // cancelButtonText: 'Cancel'
        });
      } else {
        setIndex(index + 1);
      }
    } else if (index === 1) {
      if (winnerInfo.weeklyGiftSize === 0 && winnerInfo.monthlyGiftSize === 0) {
        Swal.fire({
          title: "Please select prize size",
          type: "info",
          // showCancelButton: true,
          confirmButtonText: "OK",
          // cancelButtonText: 'Cancel'
        });
      } else {
        setIndex(index + 1);
      }
    } else if (index === 2) {
      if (
        winnerInfo.winnerName === "" ||
        winnerInfo.winnerCity === "" ||
        winnerInfo.winnerPostalCode === "" ||
        winnerInfo.winnerPhoneNumber === "" ||
        winnerInfo.winnerAddressDetails === ""
      ) {
        Swal.fire({
          title: "Please fill the required fields.",
          type: "info",
          confirmButtonText: "OK",
        });
      } else {
        setIndex(index + 1);
        const payload = new FormData();
        payload.append('prize_id', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyGiftId : winnerInfo.weeklyGiftId);
        payload.append('prize_name', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyGiftName : winnerInfo.weeklyGiftName);
        payload.append('prize_size', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyGiftSize : winnerInfo.weeklyGiftSize);
        payload.append('winner_msisdn', getUserDetails().msisdn);
        payload.append('winner_name', getUserDetails().first_name);
        payload.append('rank', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeRank : winnerInfo.weeklyPrizeRank);
        payload.append('type', winnerInfo.weeklyGiftId === "" ? 'monthly' : 'weekly');
        payload.append('rank', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeRank : winnerInfo.weeklyPrizeRank);
        payload.append('prize_start_date', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeStartDate : winnerInfo.weeklyPrizeStartDate);
        payload.append('prize_end_date', winnerInfo.weeklyGiftId === "" ? winnerInfo.monthlyPrizeEndDate : winnerInfo.weeklyPrizeEndDate);
        payload.append('receiver_name', winnerInfo.winnerName);
        payload.append('receiver_phone_no', winnerInfo.winnerPhoneNumber);
        payload.append('receiver_city', winnerInfo.winnerCity);
        payload.append('receiver_postal_code', winnerInfo.winnerPostalCode);
        payload.append('receiver_address', winnerInfo.winnerAddressDetails);


        axios.post('/StageGoalyApi/prizeRedeem', payload)
          .then((res) => {
            if (res.data.success === 1 && res.data.error === 0) {
              Swal.fire({
                title: "Success!",
                type: "info",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then((res) => {
                if (res.value) {
                  setSuccessLoading(false)
                }
              })

            }
            else {
              Swal.fire({
                title: "Some error occured! Please try again",
                type: "error",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then((res) => {
                if (res.value) {
                  window.location.reload();
                }
              })

            }
          }
          );
      }
    }

  }


  const previousTab = () => {
    if (index === 1) {
      setWinnerInfo({
        weeklyGiftId: "",
        weeklyGiftSize: 0,
        monthlyGiftId: "",
        monthlyGiftSize: 0,
        winnerName: "",
        winnerPostalCode: "",
        winnerCity: "",
        winnerPhoneNumber: "",
        winnerAddressDetails: "",
      });
      setIndex(index - 1);
      console.log(" tab 1")
    }
    setIndex(index - 1);
  };

  useEffect(() => console.log(winnerInfo));


  // const editWinnerDetails = (detailItem, param) => {
  //     switch (detailItem) {
  //         case "giftId":
  //             setWinnerInfo({ ...winnerInfo, giftId: param });
  //             console.log('gift id');
  //         case "giftSize":
  //             setWinnerInfo({ ...winnerInfo, giftSize: param });
  //         case "winnerName":
  //             setWinnerInfo({ ...winnerInfo, winnerName: param });
  //             console.log('winner name');
  //         case "phoneNumber":
  //             setWinnerInfo({ ...winnerInfo, winnerPhoneNumber: param });

  //         case "city":
  //             setWinnerInfo({ ...winnerInfo, winnerCity: param });

  //         case "postalCode":
  //             setWinnerInfo({ ...winnerInfo, winnerPostalCode: param });

  //         case "addressDetails":
  //             setWinnerInfo({ ...winnerInfo, winnerAddressDetails: param });
  //     }
  // }

  const editWinnerDetails = (detail) => {
    setWinnerInfo({
      ...winnerInfo,
      ...detail,
    });
  };
  return (
    <div>
      {/* loading === true ---> this is code for loader */}
      {loading === true && <div className="loader" style={{ marginTop: "200px" }}>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div classN="circle"></div>
      </div>}


      {loading === false && (
        <div>
          {index === 0 && (
            <ChoosePrize
              nextTab={nextTab}
              winnerInfo={winnerInfo}
              editWinnerDetails={editWinnerDetails}
              weeklyPrizeStatus={weeklyPrizeWonStatus}
              monthlyPrizeStatus={monthlyPrizeWonStatus}
              weeklyPrize={weeklyWonPrize}
              monthlyPrize={monthlyWonPrize}
              // redeemStatus={redeemPrizeStatus}
            />
          )}
          {index === 1 && (
            <ChooseSize
              nextTab={nextTab}
              previousTab={previousTab}
              winnerInfo={winnerInfo}
              editWinnerDetails={editWinnerDetails}
              weeklyPrizeStatus={weeklyPrizeWonStatus}
              monthlyPrizeStatus={monthlyPrizeWonStatus}
              weeklyPrize={weeklyWonPrize}
              monthlyPrize={monthlyWonPrize}
            
            />
          )}
          {index === 3 && successLoading === true && <div className="loader" style={{ marginTop: "200px" }}>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div classN="circle"></div>
          </div>}
          {index === 2 &&
            <WinnerDetails
              nextTab={nextTab}
              winnerInfo={winnerInfo}
              editWinnerDetails={editWinnerDetails}
              weeklyPrizeStatus={weeklyPrizeWonStatus}
              monthlyPrizeStatus={monthlyPrizeWonStatus}
            />
          }
          {index === 3 && successLoading === false && <RedeemPrize />}
        </div>
      )}
    </div>
  );
};

export default index;
