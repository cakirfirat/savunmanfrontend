import React, { useEffect, useState } from 'react'
import { FormGroup, TextInput, Button, InlineLoading, Stack, Section, Heading, Loading } from "@carbon/react"
import AppHeader from '../layouts/header';
import { connect, useDispatch } from 'react-redux';
import { verifyCode } from '../../actions/auth/verifyCode';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router';


function VerifyCode(props) {

    const [code, setCode] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(verifyCode(localStorage.getItem("phoneNumber"), code));
    }

    useEffect(() => {
        if (props.verifyCode.error != false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: props.verifyCode.error?.response?.data?.errorMessage,
                confirmButtonText: "Anladım",
                footer:
                    '<a target="_blank" href="https://www.hukuksal.io/">Farklı bir problem yaşıyorum?</a>',
            });
            return;
        }
        if (props.verifyCode.done) {
            if (localStorage.getItem("userType") == "Lawyer") {
                navigate("/profil-avukat");
            } else {
                navigate("/profil-buro");
            }
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
                                <FormGroup className="mt-3" legendText="Lütfen cep telefonunuza gelen 6 haneli kodu giriniz.">
                                    <Section>
                                        <Section>
                                            <Heading className="mb-2">Telefonunuzu onaylayın</Heading>
                                        </Section>
                                    </Section>
                                    <Stack gap={7}>
                                        <TextInput type='number' placeholder='Onay kodu' onChange={(e) => { setCode(e.target.value) }} id="one" labelText="Doğrulama kodu" />
                                        {props.verifyCode.spinner ?
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
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);