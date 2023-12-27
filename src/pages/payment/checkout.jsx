import React, { useState } from 'react';
import {
    TextInput,
    Checkbox,
    Button,
    FormGroup,
    Grid,
    Column
} from 'carbon-components-react';
import { connect, useDispatch } from 'react-redux';
import Header from '../layouts/header';
import { Stack } from '@carbon/react';
import { formatCardNumber } from '../../helpers/formatters';

function Checkout() {

    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    return (
        <div>
            <Header />
            <div className="container">
                <Grid>

                    <Column sm={0} md={2} lg={4}></Column>
                    <Column sm={4} md={4} lg={8}>
                        <div className="card">
                            <div className="card-body">
                                <FormGroup legendText="Ödemeyi tamamlayın">
                                    <Stack gap={5}>
                                        <TextInput
                                            id="cardNumber"
                                            onChange={(e) => {
                                                const formattedValue = formatCardNumber(e.target.value);
                                                // Ekranda formatlanmış değeri göster
                                                e.target.value = formattedValue;
                                                // State'e formatlanmamış değeri kaydet
                                                setCardNumber(formattedValue.replace(/-/g, ""));
                                            }}
                                            labelText="Kartınızın ön yüzündeki 16 haneli numarayı giriniz."
                                            placeholder="XXXX-XXXX-XXXX-XXXX"
                                            type="text"
                                        />
                                        <TextInput
                                            id="expirationDate"
                                            labelText="Son kullanma tarihi"
                                            placeholder="MM/YY"
                                            type="text"
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                value = value.replace(/[^0-9]/g, ""); // Sadece rakam olmasını sağlar
                                                if (value.length > 2) {
                                                    value = value.substring(0, 2) + "/" + value.substring(2, 4);
                                                }
                                                e.target.value = value;
                                                setExpiryDate(value);
                                            }}
                                        />
                                        <TextInput
                                            id="cvv"
                                            labelText="Kartınızın arka yüzündeki 3 haneli CVV numarasını giriniz."
                                            placeholder="123"
                                            type="text"
                                        />
                                        <Checkbox
                                            id="terms"
                                            labelText="Mesafeli satış sözleşmesini okudum onayladım."
                                        />
                                        <Button kind="primary">
                                            Ödemeyi tamamla
                                        </Button>
                                    </Stack>
                                </FormGroup>
                            </div>
                        </div>
                    </Column>
                    <Column sm={0} md={2} lg={4}></Column>
                </Grid>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
