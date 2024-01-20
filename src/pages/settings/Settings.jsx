import React, { useEffect, useState } from 'react'
import Header from '../layouts/header'
import {
  FormGroup,
  TextInput,
  RadioButtonGroup,
  RadioButton,
  Button,
  Stack,
  InlineLoading
} from '@carbon/react'
import { connect, useDispatch } from 'react-redux';
import { resetUpdateUser, updateUser } from '../../actions/user/updateUser';
import { getUser } from '../../actions/user/getUser'
import Swal from 'sweetalert2';

// user.Name = userRequestData.Name
// 	user.Surname = userRequestData.Surname
// 	user.Email = userRequestData.Email
// 	user.PhoneNumber = userRequestData.PhoneNumber
// 	user.Address = userRequestData.Address
// 	user.PhotoUrl = userRequestData.PhotoUrl

function Settings(props) {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  function HandleUpdateUser() {
    dispatch(updateUser(name,surname,email,phoneNumber,address,photoUrl));

  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  console.log(props.getUser)

  useEffect(() => {

    if (props.getUser.done) {
      setName(props.getUser.getUser?.result?.Name);
      setSurname(props.getUser.getUser?.result?.Surname);
      setEmail(props.getUser.getUser?.result?.Email);
      setPhoneNumber(props.getUser.getUser?.result?.PhoneNumber);
      setAddress(props.getUser.getUser.result.Address);
    }


  }, [props.getUser])

  useEffect(() => {
      if (props.updateUser.done) {
       Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Bilgileriniz güncellendi.',
       })
       dispatch(resetUpdateUser());
      }
  }, [props.updateUser])


  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <FormGroup
            className='text-start'
            fullwidth
            legendText="Kullanıcı ayarları">
            <Stack gap={7}>
              <TextInput value={name} id="name" onChange={(e) => setName(e.target.value)} labelText="Ad" />
              <TextInput value={surname} id="surname" onChange={(e) => setSurname(e.target.value)} labelText="Soyad" />
              <TextInput value={email} id="email" onChange={(e) => setEmail(e.target.value)} labelText="Email" />
              <TextInput value={phoneNumber} id="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} labelText="Telefon Numarası" />
              <TextInput value={address} id="address" onChange={(e) => setAddress(e.target.value)} labelText="Adres" />
              <Button onClick={HandleUpdateUser}>{props.updateUser.spinner ? <InlineLoading description="Güncelleniyor..." /> : "Bilgileri güncelle"}</Button>
            </Stack>
          </FormGroup>
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
export default connect(mapStateToProps, mapDispatchToProps)(Settings);