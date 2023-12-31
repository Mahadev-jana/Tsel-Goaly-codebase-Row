import React from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { isAuthenticate, getUserDetails } from '../../_helper/authentication';
import './sidebar.scss';
import Account from '../account';
import Subscribe from '../../components/subscibe';
// import leaderboard from  '../../assets/icon/icon-1.png';
// import reward from  '../../assets/icon/icon-2.png';
import AccountImg from '../../assetsStaging/img/account.svg';
import contest from '../../assetsStaging/img/sidenav/contest.png';
import reward from '../../assetsStaging/img/sidenav/reward.png';
import leaderboard from '../../assetsStaging/img/sidenav/leaderboard.png';
import winners from '../../assetsStaging/img/sidenav/winners.png';
import Language from '../../assetsStaging/img/sidenav/language.png';
import faq from '../../assetsStaging/img/sidenav/faq.png';
import logout from '../../assetsStaging/img/sidenav/logout.png';
import privacypolicy from '../../assetsStaging/img/sidenav/privacypolicy.png';
import term from '../../assetsStaging/img/sidenav/term.png';
import enter from '../../assetsStaging/img/sidenav/enter.png';
import claimprize from '../../assetsStaging/img/sidenav/claim-reward.png'
import './Sidebar.css';

const Sidebar = ({ open, closeSideBar }) => {
	// const [toggle,setToggle]=useState(true);
	const language = { "en": "English", "id": "Indonesia", "ms": "Malaysia", "nl": "Deutch", 'km': 'Khmer' };
	const logOut = () => {
		//console.log('logoutt')
		localStorage.removeItem('userDetails');
		localStorage.removeItem('JWT');
		// localStorage.removeItem('userDetailsforPopup');
	}

	const redirectToSportLocker = () => {
		window.location.assign("https://goaly.sportlocker.com/")
	}
	const linkToSubscribe = () =>{ 
		window.location.replace('https://tsel.exmp.app/goaly');
	  }
	  const linkToUnsubscribe = () =>{ 
		window.location.replace('https://tsel.exmp.app/goaly/unsub');
	  }
	//console.log(isAuthenticate())
	return (
		<>
			{/* <Subscribe show={show} handleClose={this.handleClose}/> */}
			{open && <div style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: 'rgba(0,0,0,0.8)',
				zIndex: 1000
			}} onClick={closeSideBar}></div>}
			<nav className={classNames("sideNav", "bgImg2", { open: open })} style={{ overflow: 'hidden' }}>
				<div /*className="wrapper" style={{backgroundColor:'purple'}}*/>
					<div id="sidenavmenu" style={{ display: 'block' }}>
						<div className="sidenav" style={{
							backgroundColor: '#4d0653',
							width: '300px',
							height: '100%',
							overflowX: 'hidden',
							paddingTop: 0,
							textAlign: 'initial',
						}}>
							<div className="sidenav-header block">
								<img src={isAuthenticate() === true ? getUserDetails().image : AccountImg } alt="" />
								{isAuthenticate() === true ?
									<div className="my-1 text-white">
										<span className="d-block">{getUserDetails().first_name}</span>
										<span className="d-block">{getUserDetails().msisdn}</span>
										<span className="d-block" style={{ textTransform: "capitalize"}}>{getUserDetails().status}</span>
                                        { getUserDetails().status === "active" ? <button onClick={linkToUnsubscribe} className="btn btn-pill btn-success w-75 mt-1"><b>Unsubscribe</b></button> :
										 <button onClick={linkToSubscribe} className="btn btn-pill btn-success w-75 mt-1"><b>Subscribe</b></button>}
									</div>
									:
									<div className="my-1 text-white">
										<span className="d-block">Demo Goaly</span>
										<button onClick={linkToSubscribe} className="btn btn-pill btn-success w-75 mt-1"><b>Subscribe</b></button>
										{/* <span className='d-block'>{getUserDetails().status}</span> */}
										{/* <span className="d-block">08129545XXXX</span> */}
									</div>
								}
                                 {/* {toggle &&(getUserDetails().status ===active)} */}
								
							</div>
							<ul className="my-2">
                               
								{!isAuthenticate() ?
									<li><NavLink to="/login" onClick={closeSideBar}><img src={enter} alt="" />Login</NavLink></li>
									:
									''
								}
								<li><NavLink to="/contest" onClick={closeSideBar}><img src={contest} alt="" /> Contest</NavLink></li>

								{/* <li><NavLink to="/reward" onClick={closeSideBar}><img src={reward} alt="" /> Rewards</NavLink></li> */}
								<li><NavLink to="/leaderboard" onClick={closeSideBar}><img src={leaderboard} alt="" /> Leaderboard</NavLink></li>
								<li><NavLink to="/winner" onClick={closeSideBar}><img src={winners} alt="" />Winners</NavLink></li>
								<li><NavLink to="/language" onClick={closeSideBar}><img src={Language} alt="" /> Language <span id="language">{language[selectedLanguage()]}</span></NavLink></li>
								<li><NavLink to="/claim-prize" onClick={closeSideBar}><img src={claimprize} alt="" />Claim Prize</NavLink></li>
								<li><NavLink to="/faq" onClick={closeSideBar}><img src={faq} alt="" /> FAQ</NavLink></li>
								<li><NavLink to="/privacy" onClick={closeSideBar}><img src={privacypolicy} alt="" />Privacy policy</NavLink></li>
								<li><NavLink to="/service" onClick={closeSideBar}><img src={term} alt="" />Terms of Service</NavLink></li>
								<li><NavLink to="/terms-of-winner" onClick={closeSideBar}><img src={term} alt="" />Terms of Winner</NavLink></li>
								{isAuthenticate() ?
									<li><NavLink to="" onClick={logOut}><img src={logout} alt="" /> Logout</NavLink></li>
									:
									''
								}
								{/* <li><NavLink to="/login" onClick={closeSideBar}>New Login</NavLink></li> */}

							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Sidebar;

const selectedLanguage = () => {
	var name = 'googtrans';
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2].split('/')[2];
	return 'en';
}

{/* <div className="notop bg-main">
				<Link to='/profile' onClick={closeSideBar}><Account /></Link>
					<div className="list-block mt-15">
						<div className="list-group">
							<nav>
								<div className="list-block">
									<ul>
										<li className="divider" style={{ marginBottom: '6px' }}>Menu</li>
										<li>
											{isAuthenticate() ?
												<NavLink exact to='/' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
													<div className="item-media"><i className="fa fa-home"></i></div>
													<div className="item-inner">
														<div className="item-title">Home</div>
													</div>
												</NavLink>
												:
												<NavLink to='/login' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
													<div className="item-media"><i className="fa fa-sign-in"></i></div>
													<div className="item-inner">
														<div className="item-title">Login </div>
													</div>
												</NavLink>
											}
										</li>
										<li>
											<NavLink to="/contest" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-bookmark"></i></div>
												<div className="item-inner">
													<div className="item-title">Contest</div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/reward" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media">
													<img src={reward} style={{height:15}}/>

													</div>
												<div className="item-inner">
													<div className="item-title">Rewards </div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/leaderboard" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media">
													<img src={leaderboard} style={{height:15}}/>
													</div>
												<div className="item-inner">
													<div className="item-title">Leaderboard</div>
												</div>
											</NavLink>
										</li>

										<li>
											<NavLink to="/winner" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-trophy"></i></div>
												<div className="item-inner">
													<div className="item-title">Winners</div>
												</div>
											</NavLink>
										</li>

										<li>
											<NavLink to="/language" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media">
													<i className="fa fa-globe"></i>
												</div>
												<div className="item-inner">
													<div className="item-title">Language</div>
													<div className="item-after">{language[selectedLanguage()]}</div>
												</div>
											</NavLink>
										</li>
										<li>
											{isAuthenticate() &&
												<Link to='/logout' className="item-link close-panel item-content" onClick={closeSideBar}>
													<div className="item-media"><i className="fa fa-sign-out"></i></div>
													<div className="item-inner">
														<div className="item-title">Logout</div>
													</div>
												</Link>}
										</li>
										<li className="divider" style={{
											marginTop: '10px',
											marginBottom: '10px'
										}}></li>
										<li>
											<NavLink to="/faq" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">FAQ</div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/privacy" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">Privacy Policy</div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/service" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">Terms of Service</div>
												</div>
											</NavLink>
										</li>
										<li className="divider" style={{
											marginTop: '10px',
											marginBottom: '10px'
										}}></li>
										<li>
											<a className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={() => true}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">Subscribe</div>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</nav>
						</div>
					</div>
				</div> */}


