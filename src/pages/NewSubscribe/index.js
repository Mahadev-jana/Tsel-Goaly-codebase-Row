import React,{ useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Link, withRouter , useHistory} from 'react-router-dom';
import { setUserDetails,setJWT } from '../../_helper/authentication';
import axios from '../../_config/axios';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';

const index = ({props}) => {
  const[ logIn , setLogIn ] = useState(false);
  const [ msisdn, setMsisdn] = useState("");
  const [password , setPassword ] = useState("");

  const history = useHistory();

  const { search } = useLocation() ;

  const query = new URLSearchParams(search);

  var q = query.get('msisdn')

  useEffect(()=>{
    LoginWithPassword()
  },[])

  const LoginWithPassword = () => {
    axios.get(`Subscription/callback?msisdn=${q}`)
    .then(res => {
      setMsisdn(res.data.user_details.msisdn);
      setPassword(res.data.user_details.password);
      const payloadForLogin = new FormData();
      console.log(msisdn);
      console.log(res.data.user_details.msisdn);
      payloadForLogin.append('phone_no', res.data.user_details.msisdn);
      payloadForLogin.append('password', res.data.user_details.password);
      axios.post('StageGoalyApi/login', payloadForLogin)
          .then(res => {
              // console.log(res.data);
              if (res.data.success == 0 && res.data.error == 1 && res.data.status==400) {
                  // setErrPhPass(true)
                  Swal.fire({
                      title: 'Invalid Phone number or Password',
                      text: "Try again!!!",
                      type: 'error',
                      // showCancelButton: true,
                      confirmButtonColor: 'red',
                      // cancelButtonColor: '#d33',
                      confirmButtonText: 'Okay',
                      // cancelButtonText: 'try again'
                  }).then((result) => {
                      if (result.value) {
                          setMsisdn('');
                          setPassword('');

                      }
                  })
              }
              if (res.data.success == 1 && res.data.error == 0 && res.data.status==200) {
                  setLogIn(false);
                  console.log('log in successful')
                  setUserDetails(res.data.data.user_details);
                  setJWT(res.data.data.JWT);
                  history.push('/')
              }
          })
    })

  }

  

  return (
    <div>
      {
        logIn === true &&  <Skeleton count={5}/>
      }
     
    </div>
  )
}

export default withRouter(index)