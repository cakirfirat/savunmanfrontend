import React, { useEffect, useState } from 'react'
import { FormGroup, TextInput, Button, ButtonSkeleton, Stack, Section, Heading, Loading } from "@carbon/react"
import AppHeader from '../layouts/header';
import { connect, useDispatch } from 'react-redux';


function Login(props) {

    const [phone, setPhone] = useState(false);
    console.log(phone);


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
                                        <Button size="md">Giriş Yap</Button>
                                    </Stack>
                                </FormGroup>
                                {props.createCode.spinner ? <Loading className={'some-class'} description='Giriş yapılıyor' small={false} withOverlay={true} /> : null}
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