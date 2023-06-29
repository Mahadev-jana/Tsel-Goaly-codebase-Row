import React, { useState, useEffect } from "react";
import Select from "react-select";

const ChooseSize = ({
  nextTab,
  previousTab,
  winnerInfo,
  weeklyPrize,
  monthlyPrize,
  editWinnerDetails,
  weeklyPrizeStatus,
  monthlyPrizeStatus,
}) => {
    const [selectedWeeklyOption, setSelectedWeeklyOption] = useState(winnerInfo.weeklyGiftSize);
    const [selectedMonthlyOption, setSelectedMonthlyOption] = useState(winnerInfo.monthlyGiftSize);
    const handleWeeklyPrizeChange = (selectedItem) => {
      setSelectedWeeklyOption(selectedItem)
      editWinnerDetails({ weeklyGiftSize : selectedItem.value });
    };
  
    const handleMonthlyPrizeChange = (selectedItem) => {
      setSelectedMonthlyOption(selectedItem)
      editWinnerDetails({ monthlyGiftSize : selectedItem.value });
    }
  const weeklyGiftOptions = [];
  const monthlyGiftOptions = [];
  const choosePrizeItem = (prizeItem) => {
    editWinnerDetails(prizeItem);
  };
  useEffect(() => {
    weeklyPrizeStatus === true && weeklyPrize.prize_size.map( prize => weeklyGiftOptions.push({value: prize, label: prize})
    )
    monthlyPrizeStatus === true && monthlyPrize.prize_size.map( prize => monthlyGiftOptions.push({value: prize, label: prize})
    )
    console.log(weeklyGiftOptions);
    console.log(weeklyPrizeStatus, weeklyPrize);
    console.log(monthlyPrizeStatus, monthlyPrize);
  }
    // console.log(weeklyPrize.prize_size)
  );
  return (
    <div>
      <div class="container-fluid">
        <div class="text-center">
          <h4 class="mt-2 mb-2">
            <strong>Redeem Prizes</strong>
          </h4>
        </div>
        <div class="block bg-white shadow">
          <div class="bs-stepper linear">
            <div class="bs-stepper-header" role="tablist">
              {/* <!-- your steps here --> */}
              <div class="step" data-target="#redeem1">
                <button
                  type="button"
                  class="step-trigger"
                  role="tab"
                  aria-selected="false"
                  disabled="disabled"
                >
                  <span class="bs-stepper-circle">1</span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step active" data-target="#redeem2">
                <button
                  type="button"
                  class="step-trigger"
                  role="tab"
                  aria-selected="true"
                >
                  <span class="bs-stepper-circle" style={{background: "rgb(89 2 96)"}}>2</span>
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
              {/* <!-- your steps content here --> */}

              <div
                id="redeem2"
                class=""
                role="tabpanel"
              >
                <div className="form-group prize-menu">
                  <p>
                    <strong className="choose-category">Select Size</strong>
                  </p>
                  {/* <select name="" id="" class="form-control">
                                    <option value="">Pilih</option>
                                    <option value="">39</option>
                                    <option value="">40</option>
                                    <option value="">41</option>
                                    <option value="">42</option>
                                </select> */}
                  { winnerInfo.weeklyGiftId !== "" ?  <Select
                      defaultValue={selectedWeeklyOption}
                      value={selectedWeeklyOption}
                      onChange={handleWeeklyPrizeChange}
                      options={weeklyGiftOptions}
                      className="select-box"
                    /> :
                    <Select
                    defaultValue={selectedMonthlyOption}
                    value={selectedMonthlyOption}
                    onChange={handleMonthlyPrizeChange}
                    options={monthlyGiftOptions}
                   className="select-box"
                  />}
                </div>
                <button
                  onClick={nextTab}
                  type="button"
                  class="btn bg-green p-1 w-100 my-2 text-white shadow"
                >
                  <strong>Next</strong>
                </button>
                <p class="text-center">
                  <a href="javascript:void(0)" onClick={previousTab}>
                    Back
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSize;
