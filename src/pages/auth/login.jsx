import React, { useEffect, useState } from 'react'
import { FormGroup, TextInput, Button, ButtonSkeleton, Stack, Section, Heading, InlineLoading } from "@carbon/react"
import AppHeader from '../layouts/header';
import { connect, useDispatch } from 'react-redux';
import { createCode } from '../../actions/auth/createCode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { resetCreateCOde } from '../../actions/auth/createCode';


function Login(props) {

    const [phone, setPhone] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createCode(phone));
    }

    useEffect(() => {
        if (props.createCode.error != false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: props.createCode.error?.response?.data?.errorMessage,
                confirmButtonText: "Anladım",
                footer:
                    '<a target="_blank" href="https://www.hukuksal.io/">Farklı bir problem yaşıyorum?</a>',
            });
            return;
        }
    }, [props.createCode]);

    useEffect(() => {
        if (props.createCode.done) {
            if (!props.verifyCode.isLogin) {
                localStorage.setItem("phoneNumber", phone);
                navigate("/kaydi-tamamla");
                return;
            }
        }

    }, [props.createCode]);

    useEffect(() => {
        if (props.verifyCode.isLogin) {
            navigate("/dashboard");
            return;
        }

    }, [props.verifyCode]);

    return (
        <div>
            <AppHeader />
            <div className="container">
                <div className="row">
                    <div className=" d-flex justify-content-center align-items-center vh-100">
                        <div className="card" style={{ width: "28rem" }}>
                            <div className="card-body  p-4 text-start ">
                                <FormGroup className="mt-3" legendText="Hukuksal'a hoşgeldiniz, lütfen girdiğiniz bilgilerin doğruluğundan emin olun.">
                                    <Section>
                                        <Section>
                                            <Heading className="mb-2">Giriş Yap</Heading>
                                        </Section>
                                    </Section>
                                    <Stack gap={7}>
                                        <TextInput placeholder='5XXXXXXXXX' onChange={(e) => { setPhone(e.target.value) }} id="one" labelText="Telefon numaranız" />
                                        {props.createCode.spinner ?
                                            <InlineLoading status="active" iconDescription="Devam ediyor" description="İşlem devam ediyor..." />
                                            :
                                            <Button onClick={handleSubmit} size="md">Devam et</Button>
                                        }
                                    </Stack>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);