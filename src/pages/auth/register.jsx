import React, { useEffect, useState } from 'react'
import {
    FormGroup,
    TextInput,
    Button,
    Dropdown,
    Stack,
    Section,
    Heading,
    InlineNotification,
    Form,
    Loading,
    Grid,
    Column,
    ProgressIndicator,
    ProgressStep,
    InlineLoading
} from "@carbon/react"
import AppHeader from '../layouts/header'
import { connect, useDispatch } from 'react-redux';
import { getUserTypes } from '../../actions/userTypes/getUserTypes'
import { genesis } from '../../actions/auth/genesis'
import { useNavigate } from 'react-router';
import Swal from "sweetalert2";

function Register(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [tckn, setTckn] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [userTypeId, setUserTypeId] = useState();
    const [userType, setUserType] = useState();
    const [packageTypes, setPackageTypes] = useState([]);



    useEffect(() => {
        dispatch(getUserTypes());
    }, [dispatch]);

    useEffect(() => {
        if (props.getUserTypes.done) {
            setPackageTypes(props.getUserTypes.getUserTypes.result)
        }
    }, [props.getUserTypes]);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(genesis(name, surname, tckn, mail, phone, address, userTypeId));
    }

    useEffect(() => {
        if (props.genesis.error != false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: props.genesis.error?.response?.data?.errorMessage,
                confirmButtonText: "Anladım",
                footer:
                    '<a target="_blank" href="https://www.hukuksal.io/">Farklı bir problem yaşıyorum?</a>',
            });
            return;
        }
        if (props.genesis.done) {
            localStorage.setItem("userType", userType);
            localStorage.setItem("phoneNumber", phone);
            navigate("/kaydi-tamamla");
        }
    }, [props.genesis]);





    return (
        <div>
            <AppHeader />

            <div className="container">
                <Grid>
                    <Column sm={0} md={2} lg={4}></Column>
                    <Column sm={4} md={4} lg={8}>
                        <div className="">
                            <div className="card mb-5" style={{ width: "28rem" }}>
                                <div className="card-body p-4 text-start">
                                    <FormGroup className="mt-3" legendText="Hukuksal'a hoşgeldiniz, lütfen girdiğiniz bilgilerin doğruluğundan emin olun.">
                                        <Section>
                                            <Section>
                                                <Heading className="mb-2">Kayıt Ol</Heading>
                                            </Section>
                                        </Section>
                                        <Form>
                                            <Stack gap={5}>
                                                <InlineNotification
                                                    aria-label="closes notification"
                                                    kind="success"
                                                    statusIconDescription="Avantaj"
                                                    subtitle="Bireysel kayıtlarda 'Hukuksal' kodunu bir sonraki aşamada kullanarak bir haftalık deneme sürümünden faydalanabilrisiniz."
                                                    title="Avantaj"
                                                />
                                                <TextInput
                                                    onChange={(e) => { setName(e.target.value) }}
                                                    required id="isim"
                                                    labelText="İsim"
                                                    placeholder='İsminiz'
                                                />
                                                <TextInput
                                                    onChange={(e) => { setSurname(e.target.value) }}
                                                    required
                                                    id="soyisim"
                                                    labelText="Soyisim"
                                                    placeholder='Soyisminiz'
                                                />
                                                <TextInput
                                                    onChange={(e) => { setTckn(e.target.value) }} required id="tckn" labelText="TCKN" placeholder='T.C. Kimlik numaranız' />
                                                <TextInput onChange={(e) => { setMail(e.target.value) }} required id="mail" labelText="Mail" placeholder='Mail adresiniz' />
                                                <TextInput onChange={(e) => { setPhone(e.target.value) }} required id="phone" labelText="Telefon" placeholder='5xxxxxxxxx' />
                                                <TextInput onChange={(e) => { setAddress(e.target.value) }} required id="address" labelText="Adres" placeholder='Adresiniz' />
                                                <Dropdown onChange={(e) => { setUserTypeId(e.selectedItem.ID); setUserType(e.selectedItem.ProfileType) }} required id="package" titleText="Paket türü" helperText="Bir sonraki aşamada ödeme ekranına yönlendirileceksiniz." initialSelectedItem={packageTypes[0]} label="Lütfen seçiniz" items={packageTypes} itemToString={item => item ? item.Name + "  " + item.Price + "₺" : ''} />
                                                {props.genesis.spinner ?
                                                    <InlineLoading status="active" iconDescription="Devam ediyor" description="İşlem devam ediyor..." />
                                                    :
                                                    <Button onClick={handleSubmit} size="md">Devam et</Button>
                                                }


                                            </Stack>
                                        </Form>

                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </Column>
                    <Column sm={0} md={2} lg={4}></Column>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);