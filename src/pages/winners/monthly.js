import React, { useState, useEffect } from 'react'
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { hasIn, size } from 'lodash';
import { Link } from 'react-router-dom';
import noImage from '../../assets/img/noimage.jpg';
import prize_two from '../../assets/img/prize/Image 2@2x.png';
import prize_four from '../../assets/img/prize/Image 4@2x.png';
import prize_three from '../../assets/img/prize/Image 3@2x.png';
import prize_five from '../../assets/img/prize/Image 5@2x.png';
import person_logo from '../../assets/img/person.svg';
import coins from "../../assets/img/coins.svg";
import clock from "../../assets/img/clock.svg";
import '../../assets/css/winners.css';

const Monthly = React.memo(({ scoreList, monthlyPrize, loading }) => {

    const [sortedScoreList, setSortedScoreList] = useState([])

    useEffect(() => {
        console.log("loading is " + loading);
    }, [loading])

    useEffect(() => {
        // console.log(monthlyPrize.e_date)
        setSortedScoreList(scoreList.sort(function (a, b) {

            if (parseInt(a.points) > parseInt(b.points)) return -1;
            if (parseInt(a.points) < parseInt(b.points)) return 1;
            if (a.subscribe_date > b.subscribe_date) return 1;
            if (a.subscribe_date < b.subscribe_date) return -1;
            if (a.first_pred_datetime > b.first_pred_datetime) return 1;
            if (a.first_pred_datetime < b.first_pred_datetime) return -1;
            if (parseInt(a.flag) < parseInt(b.flag)) return 1;
            if (parseInt(a.flag) > parseInt(b.flag)) return -1;
        })
        )
    })
    const topScoreList = sortedScoreList.slice(0, monthlyPrize?.length)
    console.log(topScoreList)
    // var mergeScorelistWithmonthlyPrize;
    // if (topScoreList.length === 0) {
    //     mergeScorelistWithmonthlyPrize = Object.assign( monthlyPrize,topScoreList);
    // }
    // else {
    //     mergeScorelistWithmonthlyPrize = topScoreList.map((item, i) => Object.assign({}, item, monthlyPrize[i]))
    // }
    // console.log(mergeScorelistWithmonthlyPrize)
    return (

        <div class="cover-winner">
            {scoreList.length === 0 ?
                <div>

                    {!!monthlyPrize && monthlyPrize.map((data, key) => {
                        return <div>
                            <div class="winner">
                                <div class="cover-image">
                                    <div>
                                        <img
                                            // style={{
                                            //     borderRadius:'50%'
                                            // }}
                                            src={data.prize_image} alt="" />
                                    </div>
                                </div>
                                <div class="details">
                                    <div class="details-container">
                                        <h3 class="title" style={{ 'border': 'none' }}>{data.rank}. Prize - {data.prize_name}</h3>

                                        <div class="detail-column">
                                            <div class="icon"><img src={clock} alt="" class="mr-2" /></div>
                                            <span style={{
                                                fontSize: '14px'
                                            }}>{data.start_date } - {data.end_date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div> :
                <div>

                    {!!topScoreList && topScoreList.map((details, key) => {

                        return <>
                            {console.log(scoreList.length)}
                            <div class="winner">
                                <div class="cover-image">
                                    <div>
                                        <img
                                            // style={{
                                            //     borderRadius:'50%'
                                            // }}
                                            src={details.prize_image} alt="" />
                                    </div>
                                </div>
                                <div class="details">
                                    <div class="details-container">
                                        <h3 class="title" style={{ 'border': 'none' }}>{details.rank}. {details.prize_name}</h3>
                                        <div class="detail-column">
                                            <div class="icon">
                                                {
                                                    // !details.prize_image &&
                                                    // <img src={person_logo} alt="" class="mr-2" />
                                                }
                                                {
                                                    // details.prize_image &&
                                                    <img src={person_logo} alt="" class="mr-2" />
                                                }
                                            </div>
                                            {/* <span>{details.name == " " ?`${msisdnSubstring(details.msisdn)}XXXX` : details.name}</span> */}
                                            <span>{msisdnSubstring(details.msisdn == " " ? details.name : details.msisdn)}</span>
                                        </div>
                                        <div class="detail-column">
                                            <div class="icon"><img src={coins} alt="" class="mr-2" /></div>
                                            <span>{details.points} Points</span>
                                        </div>
                                        <div class="detail-column" style={{ margin: "0 auto" }}>
                                            <div class="icon"><img src={clock} alt="" class="mr-2" /></div>
                                            <span style={{
                                                fontSize: '14px'
                                            }}>{details.start_date} - {details.end_date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })
                    }
                    {!!monthlyPrize && monthlyPrize.slice(topScoreList.length, monthlyPrize.length).map((data, key) => {
                        return <div>
                            <div class="winner">
                                <div class="cover-image">
                                    <div>
                                        <img
                                            // style={{
                                            //     borderRadius:'50%'
                                            // }}
                                            src={data.prize_image} alt="" />
                                    </div>
                                </div>
                                <div class="details">
                                    <div class="details-container">
                                        <h3 class="title" style={{ 'border': 'none' }}>{data.rank}. Prize - {data.prize_name}</h3>

                                        <div class="detail-column">
                                            <div class="icon"><img src={clock} alt="" class="mr-2" /></div>
                                            <span style={{
                                                fontSize: '14px'
                                            }}>{data.start_date} - {data.end_date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div>}
            <div className="d-block" style={{ height: "20px" }}></div>
            <div className="claim-prize">
                <span>Are you competition winner?</span>
                <Link to='/claim-prize' className='btn btn-lg btn-success text-white ml-1 shadow' ><strong>Claim Prize</strong></Link>
            </div>
        </div>
    );

})

export default Monthly

const msisdnSubstring = (item) => {
    if (item) {
        const msisdnIdlength = item.length;
        const msisdnSublength = msisdnIdlength - 4;
        let newString = item;
        for (let i = 0; i < msisdnIdlength; i++) {
            if (i < msisdnSublength) {
                newString = newString.replace(item[i], 'X');
            }
        }
        return newString;
    } else return

}