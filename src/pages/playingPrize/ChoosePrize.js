import React, { useState, useEffect } from "react";
import Select from "react-select";
import { RadioGroup, RadioButton } from "react-radio-buttons";

import "./prize.css"

const ChoosePrize = ({
  nextTab,
  winnerInfo,
  editWinnerDetails,
  weeklyPrize,
  monthlyPrize,
  weeklyPrizeStatus,
  monthlyPrizeStatus,


}) => {
  console.log(weeklyPrizeStatus, weeklyPrize);
  console.log(monthlyPrizeStatus, monthlyPrize);
  const [isSelect, setIsSelect] = useState(false);
  const [selectedWeeklyOption, setSelectedWeeklyOption] = useState(
    winnerInfo.weeklyGiftId
  );
  const [selectedMonthlyOption, setSelectedMonthlyOption] = useState(
    winnerInfo.monthlyGiftId
  );
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const handleWeeklyPrizeChange = (selectedItem) => {
    setSelectedWeeklyOption(selectedItem);
    editWinnerDetails({
      weeklyGiftId: selectedItem.value,
      weeklyGiftName: selectedItem.label,
    });
  };

  const handleMonthlyPrizeChange = (selectedItem) => {
    setSelectedMonthlyOption(selectedItem);
    editWinnerDetails({
      monthlyGiftId: selectedItem.value,
      monthlyGiftName: selectedItem.label,
    });
  };

  const handleCategoryChange = (e) => {
    // editWinnerDetails(winnerInfo);
    if (winnerInfo.weeklyGiftId === "" && winnerInfo.monthlyGiftId !== "") {
      editWinnerDetails({ monthlyGiftId: "", monthlyGiftName: "" });
      setSelectedCategoryOption(e.target.value);
    } else if (
      winnerInfo.weeklyGiftId !== "" &&
      winnerInfo.monthlyGiftId === ""
    ) {
      editWinnerDetails({ weeklyGiftId: "", weeklyGiftName: "" });
      setSelectedCategoryOption(e.target.value);
    } else {
      console.log("change");
      setSelectedCategoryOption(e.target.value);
      console.log(selectedCategoryOption);
      // console.log(selectedCategory.value);
    }
  };

  //   useEffect(() => {
  //     if ( selectedWeeklyOption != null && selectedMonthlyOption != null) {
  //         Swal.fire({
  //             title: 'You need to login to predict',
  //             type: 'info',
  //             showCancelButton: true,
  //             allowOutsideClick: false,
  //             confirmButtonText: 'Login',

  //         })
  //     }
  //   })

  const weeklyGiftOptions = [
    { value: weeklyPrize.id, label: weeklyPrize.prize_name },
  ];
  const monthlyGiftOptions = [
    { value: monthlyPrize.id, label: monthlyPrize.prize_name },
  ];

  // if(monthlyPrize.redeemStatus ==false){
  //   monthlyGiftOptions
  // }
  // else(monthlyPrize.redeem_status ==false)
  // {
  //  console.log(redeemStatus);
  // }


  const categoryOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  useEffect(() => {
    console.log(weeklyPrizeStatus, monthlyPrizeStatus);
  })
  useEffect(() => {
    setSelectedWeeklyOption("");
    setSelectedMonthlyOption("");
  }, [selectedCategoryOption]);
  return (
    <>
      <div class="text-center">
        <h4 class="mt-2 mb-2">
          <strong>Choose Prize</strong>
        </h4>
      </div>
      <div class="block bg-white shadow">
        <div class="bs-stepper linear">
          <div class="bs-stepper-header" role="tablist">
            <div class="step active" data-target="#redeem1">
              <button
                type="button"
                class="step-trigger"
                role="tab"
                aria-selected="true"
              >
                <span class="bs-stepper-circle" style={{ background: "rgb(89 2 96)" }}>1</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#redeem2">
              <button
                type="button"
                class="step-trigger"
                role="tab"
                aria-selected="false"
                disabled="disabled"
              >
                <span class="bs-stepper-circle">2</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#redeem3">
              <button
                type="button"
                class="step-trigger"
                role="tab"
                aria-selected="false"
                disabled="disabled"
              >
                <span class="bs-stepper-circle">3</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content mt-2">
            <div
              id="redeem1"
              class=""
              role="tabpanel"
            >
              <div class="form-group">
                <p className="choose-gift">
                  <strong>Choose your gift</strong>
                </p>
                <div className="prize-menu">Select Category</div>
                {/* <div>
                                   <p>{weeklyPrize.prize_name}</p>
                                </div> */}
                <>
                  <div className="select-category">
                    {/* <div className="input-section">
                      <input
                        type="radio"
                        value="weekly"
                        name="category"
                        onChange={handleCategoryChange}
                      />
                      <label>Weekly</label>
                    </div> */}
                    <div className="input-section">
                      <input
                        type="radio"
                        value="monthly"
                        name="category"
                        onChange={handleCategoryChange}
                      />
                      <label>Monthly</label>
                    </div>
                  </div>
                </>
                {selectedCategoryOption === "weekly" &&
                  weeklyPrizeStatus === true && (
                    <div className="prize-menu">
                      <p className="choose-category">Select weekly prize</p>
                      {/* <select id="" defaultValue="" onChange={e => choosePrizeItem( {weeklyGiftId: e.target.value})}>
                                       <option value={weeklyPrize.id}>{weeklyPrize.prize_name}</option>
                                    </select> */}
                      {/* { isSelect && <Checkmark />} <div onClick={() => choosePrizeItem({weeklyGiftId : weeklyPrize.id})}>{weeklyPrize.prize_name}</div> */}
                      <Select
                        defaultValue={selectedWeeklyOption}
                        value={selectedWeeklyOption}
                        onChange={handleWeeklyPrizeChange}
                        options={weeklyGiftOptions}
                        className="select-box"
                      />
                    </div>
                  )}
                {selectedCategoryOption === "weekly" &&
                  weeklyPrizeStatus === false && (
                    <div className="no-prize-message">You have not won any weekly prize yet.</div>
                  )}
                {selectedCategoryOption === "weekly" &&
                  weeklyPrizeStatus === "pending" && (
                    <div className="no-prize-message">You have already redeemed your prize.</div>
                  )}
                {selectedCategoryOption === "monthly" &&
                  monthlyPrizeStatus === true && (
                    <div className="prize-menu">
                      <p className="choose-category">Select monthly prize</p>
                      {/* <select id="" defaultValue="" onChange={() => console.log("changed")}>
                                       {monthlyPrize?.map((prize) => <option value={prize.id}>{prize.prize_name}</option>)}
                                    </select> */}
                      {/* {isSelect && <Checkmark />}{" "} */}
                      {/* <div
                      onClick={() =>
                        choosePrizeItem({ monthlyGiftId: monthlyPrize.id })
                      }
                    >
                      {monthlyPrize.prize_name}
                    </div> */}


                      <Select
                        defaultValue={selectedMonthlyOption}
                        onChange={handleMonthlyPrizeChange}
                        options={monthlyGiftOptions}
                        className="select-box"
                      />
                    </div>
                  )}
                {selectedCategoryOption === "monthly" &&
                  monthlyPrizeStatus === false && (
                    <div className="no-prize-message">You have not won any monthly prize yet.</div>
                  )}
                { }
                {selectedCategoryOption === "monthly" &&
                  monthlyPrizeStatus === "redeemed" && (
                    <div className="no-prize-message">You have already redeemed your prize.</div>
                  )}
              </div>
              <button  disabled={ monthlyPrizeStatus === "redeemed" ? true :false}
                onClick={nextTab}
                type="button"
                class="btn bg-green p-1 w-100 my-2 text-white shadow"
              >
                <strong>Next</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePrize;
