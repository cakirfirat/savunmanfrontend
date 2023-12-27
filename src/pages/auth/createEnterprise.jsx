import React, { useEffect, useState } from 'react'
import { FormGroup, TextInput, Button, Dropdown, Stack, Section, Heading, InlineNotification, Form } from "@carbon/react"
import AppHeader from '../layouts/header'
import { connect, useDispatch } from 'react-redux';
import { getUserTypes } from '../../actions/userTypes/getUserTypes'
import { genesis } from '../../actions/auth/genesis'
import Swal from "sweetalert2";
import { useLocation, useNavigate } from 'react-router';
import { createEnterpriseProfile } from '../../actions/auth/createEnterpriseProfile';

function CreateEnterprise(props) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [dateOfEstablishment, setDateOfEstablishment] = useState("");
    const [address, setAddress] = useState("");
    const [tradeRegisterNumber, setTradeRegisterNumber] = useState("");
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createEnterpriseProfile(name, dateOfEstablishment, address, tradeRegisterNumber, companyPhoneNumber, companyEmail))
    }

    useEffect(() => {
        if (props.createEnterpriseProfile.error != false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: props.createEnterpriseProfile.error?.response?.data?.errorMessage,
                confirmButtonText: "Anladım",
                footer:
                    '<a target="_blank" href="https://www.hukuksal.io/">Farklı bir problem yaşıyorum?</a>',
            });
            return;
        }
        if(props.createEnterpriseProfile.done) {
            navigate("/dashboard");
        }
    }, [props.createEnterpriseProfile]);

    


    return (
        <div>
            <AppHeader />
            <div className="container">
                <div className="row">
                    <div className=" d-flex justify-content-center align-items-center vh-100 mb-5">
                        <div className="card mb-5" style={{ width: "28rem" }}>
                            <div className="card-body p-4 text-start">
                                <FormGroup className="mt-3" legendText="Lütfen girdiğiniz kurumsal bilgilerin doğruluğundan emin olun">
                                    <Section>
                                        <Section>
                                            <Heading className="mb-2">Kurumsal üyelik kaydı</Heading>
                                        </Section>
                                    </Section>
                                    <Form>
                                        <Stack gap={5}>

                                            <TextInput
                                                onChange={(e) => { setName(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Hukuk bürosunun ismi"
                                                placeholder='Büro adı'
                                            />
                                            <TextInput
                                                onChange={(e) => { setDateOfEstablishment(e.target.value) }}
                                                required
                                                id="kurulusTarihi"
                                                labelText="Kuruluş tarihi"
                                                placeholder='Kuruluş tarihi'
                                            />
                                            <TextInput
                                                onChange={(e) => { setAddress(e.target.value) }}
                                                required
                                                id="adres"
                                                labelText="Adres"
                                                placeholder='Adres'
                                            />
                                            <TextInput
                                                onChange={(e) => { setTradeRegisterNumber(e.target.value) }}
                                                required
                                                id="ticaretSicilNo"
                                                labelText="Ticaret sicil numarası"
                                                placeholder='Ticaret sicil numarası'
                                            />
                                            <TextInput
                                                onChange={(e) => { setCompanyPhoneNumber(e.target.value) }}
                                                required
                                                id="telefon"
                                                labelText="Telefon numarası"
                                                placeholder='Telefon numaranız'
                                            />
                                            <TextInput
                                                onChange={(e) => { setCompanyEmail(e.target.value) }}
                                                required
                                                id="mail"
                                                labelText="Mail adresi"
                                                placeholder='Mail adresiniz'
                                            />
                                            <Button onClick={handleSubmit} size="md">Devam et</Button>
                                        </Stack>
                                    </Form>

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
export default connect(mapStateToProps, mapDispatchToProps)(CreateEnterprise);