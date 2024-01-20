import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';


function IsLogin(props) {

    const navigate = useNavigate();


    const user = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : false;

    useEffect(() => {
        if (user === false) {
            navigate("/giris-yap");
        }
        if (props.verifyCode.isLogin === false) {
            navigate("/giris-yap");
        }
    }, [user, navigate, props.verifyCode.isLogin]);
  return (
    <div>
      
    </div>
  )
}
const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(IsLogin);