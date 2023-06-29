import React, { useState } from 'react'
import Select from "react-select";

const WinnerDetails = (props) => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        phoneNumber: "",
        city: "",
        postalCode: "",
        addressDetails: ""
    });

    const [ selectedCity, setSelectedCity ] = useState("");

    const cityOptions = [
        { value: 'Aceh', label: 'Aceh' },
        { value: 'Bali', label: 'Bali' },
        { value: 'Banten', label: 'Banten' },
        { value: 'Bengkulu', label: 'Bengkulu' },
        { value: 'Gorontalo', label: 'Gorontalo' },
        { value: 'Greater Jakarta', label: 'Greater Jakarta' },
        { value: 'Jakarta Raya', label: 'Jakarta Raya' },
        { value: 'Jambi', label: 'Jambi' },
        { value: 'Jawa Barat', label: 'Jawa Barat' },
        { value: 'Jawa Tengah', label: 'Jawa Tengah' },
        { value: 'Jawa Timur', label: 'Jawa Timur' },
        { value: 'Kalimantan Barat', label: 'Kalimantan Barat' },
        { value: 'Kalimantan Selatan', label: 'Kalimantan Selatan' },
        { value: 'Kalimantan Tengah', label: 'Kalimantan Tengah' },
        { value: 'Kalimantan Timur', label: 'Kalimantan Timur' },
        {
          value: 'Kepulauan Bangka Belitung',
          label: 'Kepulauan Bangka Belitung'
        },
        { value: 'Lampung', label: 'Lampung' },
        { value: 'Maluku', label: 'Maluku' },
        { value: 'Maluku Utara', label: 'Maluku Utara' },
        { value: 'Nusa Tenggara Barat', label: 'Nusa Tenggara Barat' },
        { value: 'Nusa Tenggara Timur', label: 'Nusa Tenggara Timur' },
        { value: 'Papua', label: 'Papua' },
        { value: 'Riau', label: 'Riau' },
        { value: 'Sulawesi Selatan', label: 'Sulawesi Selatan' },
        { value: 'Sulawesi Tengah', label: 'Sulawesi Tengah' },
        { value: 'Sulawesi Tenggara', label: 'Sulawesi Tenggara' },
        { value: 'Sulawesi Utara', label: 'Sulawesi Utara' },
        { value: 'Sumatera Barat', label: 'Sumatera Barat' },
        { value: 'Sumatera Selatan', label: 'Sumatera Selatan' },
        { value: 'Sumatera Utara', label: 'Sumatera Utara' },
        { value: 'Yogyakarta', label: 'Yogyakarta' }
      ]

    const handleCityChange = (city) => {
        setSelectedCity(city);
        props.editWinnerDetails({ winnerCity: city.value });
    }

  




 

  
    return (
        <>
            <div class="text-center">
                <h4 class="mt-2 mb-2"><strong>Redeem Prize</strong></h4> </div>
            <div id="redeem3" class="content" role="tabpanel" style={{borderRight:"none"}}>
                <div class="bs-stepper linear">
                    <div class="bs-stepper-header" role="tablist">
                        <div class="step" data-target="#redeem1">
                            <button type="button" class="step-trigger" role="tab" aria-selected="false" disabled="disabled">
                                <span class="bs-stepper-circle">1</span>
                            </button>
                        </div>
                        <div class="line"></div>
                        <div class="step" data-target="#redeem2">
                            <button type="button" class="step-trigger" role="tab" aria-selected="false" disabled="disabled">
                                <span class="bs-stepper-circle">2</span>
                            </button>
                        </div>
                        <div class="line"></div>
                        <div class="step active" data-target="#redeem3">
                            <button type="button" class="step-trigger" role="tab" aria-selected="true">
                                <span class="bs-stepper-circle" style={{background: "rgb(89 2 96)"}}>3</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <p><strong>Recipient's name</strong></p>
                    <input type="text" class="form-control" placeholder="Name" value={props.winnerInfo.winnerName} onChange={(e) => { props.editWinnerDetails({ ...props.winnerInfo, winnerName:e.target.value }) }} />
                </div>
                <div class="form-group">
                    <p><strong>Phone number</strong></p>
                    <input type="number" class="form-control" placeholder="08XXX" value={props.winnerInfo.winnerPhoneNumber} onChange={(e) => { props.editWinnerDetails({ ...props.winnerInfo, winnerPhoneNumber: e.target.value }); }} />
                </div>
                <div class="form-group">
                    <p><strong>City</strong></p>
                    {/* <select name="" id="" class="form-control" value={props.winnerInfo.winnerCity} onChange={(e) => { props.editWinnerDetails({ ...props.winnerInfo,  winnerCity: e.target.value }); }}>
                    <option value="">Select</option>
                        <option value="greater Jakarta">Greater Jakarta</option>
                    </select> */}
                    <Select
                      defaultValue={selectedCity}
                      onChange={handleCityChange}
                      value={selectedCity}
                      options={cityOptions}
                      className = "select-box"
                    />
                </div>
                <div class="form-group">
                    <p><strong>Postal code</strong></p>
                    <input type="number" class="form-control" placeholder="" value={props.winnerInfo.winnerPostalCode} onChange={(e) => { props.editWinnerDetails({ ...props.winnerInfo, winnerPostalCode: e.target.value }); }} />
                </div>
                <div class="form-group">
                    <p><strong>Address details</strong></p>
                    <textarea name="" id="" cols="30" rows="5" class="form-control" placeholder="Street name, alley or no. house" value={props.winnerInfo.winnerAddressDetails} onChange={(e) => { props.editWinnerDetails({ ...props.winnerInfo, winnerAddressDetails: e.target.value }); console.log(userDetails) }}></textarea>
                </div>
                <a onClick={props.nextTab} class="btn bg-green p-1 w-100 my-2 text-white shadow"><strong>Submit Data</strong></a>
            </div>

        </>
    )
}

export default WinnerDetails