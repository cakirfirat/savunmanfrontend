import React, { useEffect, useState } from 'react'
import { FormGroup, TextInput, Button, Dropdown, Stack, Section, Heading, InlineLoading, Form } from "@carbon/react"
import AppHeader from '../layouts/header'
import { connect, useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router';

import { createLawyerProfile } from '../../actions/auth/createLawyerProfile';
function CreateLawyer(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [lawOfficeID, setLawOfficeID] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [barAssociation, setBarAssociation] = useState("");
    const [barRegisterNo, setBarRegisterNo] = useState("");
    const [spetialization, setSpetialization] = useState("");
    const [dateOfLawyerLicance, setDateOfLawyerLicance] = useState("");




    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createLawyerProfile(null, universityName, graduationYear, barAssociation, barRegisterNo, spetialization, dateOfLawyerLicance));
    }

    useEffect(() => {
        if (props.createLawyerProfile.error != false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: props.createLawyerProfile.error?.response?.data?.errorMessage,
                confirmButtonText: "Anladım",
                footer:
                    '<a target="_blank" href="https://www.hukuksal.io/">Farklı bir problem yaşıyorum?</a>',
            });
            return;
        }
        if (props.createLawyerProfile.done) {
            navigate("/dashboard");
        }
    }, [props.createLawyerProfile]);



    return (
        <div>
            <AppHeader />
            <div className="container">
                <div className="row">
                    <div className=" d-flex justify-content-center align-items-center vh-100 mb-5">
                        <div className="card mb-5" style={{ width: "28rem" }}>
                            <div className="card-body p-4 text-start">
                                <FormGroup className="mt-3" legendText="Lütfen avukatlık bilgilerinizi doğru girdiğinizden emin olun.">
                                    <Section>
                                        <Section>
                                            <Heading className="mb-2">Avukat kaydını tamamla</Heading>
                                        </Section>
                                    </Section>
                                    <Form>
                                        <Stack gap={5}>
                                            {/* <TextInput
                                                onChange={(e) => { setLawOfficeID(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Varsa büro numaranızı giriniz"
                                                placeholder='Büro numarası'
                                            /> */}
                                            <TextInput
                                                onChange={(e) => { setUniversityName(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Mezun olduğunuz üniversiteyi giriniz"
                                                placeholder='Üniversite adı'
                                            />
                                            <TextInput
                                                onChange={(e) => { setGraduationYear(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Mezun olduğunuz yılı giriniz"
                                                placeholder='Mezuniyet yılı'
                                            />
                                            <TextInput
                                                onChange={(e) => { setBarAssociation(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Bağlı olduğunuz baroyu giriniz"
                                                placeholder='Baro adı'
                                            />
                                            <TextInput
                                                onChange={(e) => { setBarRegisterNo(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Baro sicil numaranızı giriniz"
                                                placeholder='Baro sicil numarası'
                                            />
                                            <TextInput
                                                onChange={(e) => { setSpetialization(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Uzmanlık alanınızı giriniz"
                                                placeholder='Uzmanlık alanı'
                                            />
                                            <TextInput
                                                onChange={(e) => { setDateOfLawyerLicance(e.target.value) }}
                                                required
                                                id="isim"
                                                labelText="Avukatlık ruhsat tarihinizi giriniz"
                                                placeholder='Ruhsat tarihi'
                                            />
                                            {props.createLawyerProfile.spinner ?
                                                <InlineLoading status="active" iconDescription="Devam ediyor" description="İşlem devam ediyor..." />
                                                :
                                                <Button onClick={handleSubmit} size="md">Profil kaydını tamamla et</Button>
                                            }
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateLawyer);