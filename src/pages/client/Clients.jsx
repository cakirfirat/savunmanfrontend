import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import Header from '../layouts/header';
import {
  TreeView,
  TreeNode,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarSearch,
  Tag,
  Modal,
  TextInput,
  TextArea,
  IconButton,
  PaginationNav
} from 'carbon-components-react';
import { Tree, Add } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import { getClients } from '../../actions/client/getClients';
import { addClient, resetAddClient } from '../../actions/client/addClient';
import Swal from 'sweetalert2';
import { Button, DataTableSkeleton, InlineLoading, Loading } from '@carbon/react';

function Clients(props) {
  const [expanded, setExpanded] = useState(['parent']);
  const [searchInput, setSearchInput] = useState('');
  const [clientList, setClientList] = useState([]);
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [tckn, setTckn] = useState('')
  const [email, setMail] = useState('')
  const [address, setAddress] = useState('')
  const [summary, setSummary] = useState('')
  const button = React.createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, []);

  useEffect(() => {
    if (props.getClients.done) {
      setClientList(
        props.getClients.getClients.result.map((client) => {
          return {
            id: client.ID,
            name: client.Name,
            surname: client.Surname,
            tckn: client.TCKN,
            phoneNumber: client.PhoneNumber,
            caseStatus: <Tag type="green">Aktif dava mevcut</Tag>,
            detail: <Link to={`/muvekkil/${client.ID}`}>Detay</Link>,
            request: <Button kind="tertiary" size="sm">Talep oluştur</Button>
          }
        })
      )
    }
  }, [props.getClients])

  // Sütun başlıkları
  const headers = [
    { key: 'name', header: 'İsim', },
    { key: 'surname', header: 'Soyisim' },
    { key: 'tckn', header: 'TCKN' },
    { key: 'phoneNumber', header: 'Telefon' },
    { key: 'caseStatus', header: 'Aktif Dava Durumu' },
    { key: 'detail', header: '' },
    { key: 'request', header: ''}
  ];

  // Arama işlevi
  const getFilteredRows = (query) => {
    return clientList.filter(row =>
      headers.some(header =>
        row[header.key].toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const filteredRows = getFilteredRows(searchInput);

  const handleAddClient = () => {
    dispatch(addClient(name, surname, tckn, email, phoneNumber, address, summary))
  }

  useEffect(() => {
    if (props.addClient.done) {
      setOpen(false)
      setName(''); setSurname(''); setTckn(''); setPhoneNumber(''); setAddress(''); setSummary('');
      Swal.fire({
        confirmButtonText: 'Anladım',
        icon: 'success',
        title: 'Başarılı',
        text: 'Müvekkiliniz sisteme eklendi',
      })
      dispatch(getClients());
      dispatch(resetAddClient());
    }

    if (props.addClient.error != false) {
      Swal.fire({
        confirmButtonText: 'Anladım',
        icon: 'error',
        title: 'Hata...',
        text: props.addClient.error.response.data.errorMessage,

      })
    }

  }, [props.addClient]);


  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">

          <div className="col-12 text-start">
            {props.getClients.spinner ?
              <DataTableSkeleton headers={headers} aria-label="sample table" />
              :
              <DataTable rows={filteredRows} headers={headers} render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                <TableContainer >
                  <div className='d-flex justify-content-between mb-3'>
                    <h3>
                      Müvekkillerim
                    </h3>
                    <IconButton
                      label="Ekle"
                      onClick={() => setOpen(true)}
                    >
                      <Add />
                    </IconButton>
                  </div>
                  <TableToolbar>
                    <TableToolbarSearch placeholder='Lütfen arayacağınız kelimeyi giriniz' onChange={e => setSearchInput(e.target.value)} />

                  </TableToolbar>
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {headers.map(header => (
                          <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.getClients.getClients?.result?.length == 0 ?
                        <TableRow>
                          <TableCell colSpan={6}>Müvekkiliniz bulunmamaktadır</TableCell>
                        </TableRow>
                        : null}
                      {rows.map(row => (
                        <TableRow key={row.id} {...getRowProps({ row })}>
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>


                  </Table>
                  <PaginationNav className='d-flex justify-content-end' itemsShown={5} totalItems={10} />

                </TableContainer>
              )} />
            }
          </div>
        </div>
      </div>
      <Modal
        className='text-start'
        launcherButtonRef={button}
        modalHeading="Yeni müvekkil ekle"
        primaryButtonText="Ekle"
        secondaryButtonText="Vazgeç"
        onRequestSubmit={() => { handleAddClient() }}
        open={open}
        onRequestClose={() => setOpen(false)}>
        <p className='mt-3'>
          Eklediğiniz müvekkilin bilgilerinin doğruluğundan emin olun. Müvekkilden talep edeceğiniz bilgiler sms yoluyla kendisine iletilecektir
        </p>
        {props.addClient.spinner ? <Loading description="Yükleniyor..." /> : null}
        <TextInput
          onChange={(e) => { setName(e.target.value) }}
          defaultValue={name}
          className='mt-3'
          data-modal-primary-focus
          id="text-input-1"
          labelText="İsim"
          placeholder="Müvekkil ismi" />
        <TextInput
          onChange={(e) => { setSurname(e.target.value) }}
          defaultValue={surname}
          className='mt-3'
          data-modal-primary-focus
          id="text-input-2"
          labelText="Soyisim"
          placeholder="Müvekkil soyismi" />
        <TextInput
          onChange={(e) => { setPhoneNumber(e.target.value) }}
          defaultValue={phoneNumber}
          className='mt-3'
          data-modal-primary-focus
          id="text-input-3"
          labelText="Telefon numarası"
          placeholder="Müvekkil telefon numarası" />
        <TextInput
          onChange={(e) => { setTckn(e.target.value) }}
          defaultValue={tckn}
          className='mt-3'
          data-modal-primary-focus
          id="text-input-4"
          labelText="TCKN"
          placeholder="Müvekkil Türkiye Cumhuriyeti kimlik numarası" />
        <TextInput
          onChange={(e) => { setMail(e.target.value) }}
          defaultValue={email}
          className='mt-3'
          data-modal-primary-focus
          id="text-input-5"
          labelText="Mail adresi"
          placeholder="Müvekkil mail bilgisi (varsa)" />
        <TextInput
          onChange={(e) => { setAddress(e.target.value) }}
          defaultValue={address}
          className='mt-3'
          data-modal-primary-focus
          id="text-input-5"
          labelText="Adres"
          placeholder="Müvekkil adres bilgisi (varsa)" />
        <TextArea
          onChange={(e) => { setSummary(e.target.value) }}
          defaultValue={summary}
          className='mt-3'
          labelText="Müvekkil özeti"
          placeholder="Müvekkiliniz hakkında eklemek istediğiniz bilgileri buraya yazabilirsiniz"
          rows={4}
          id="text-area-1" />
        {/* <Button kind="primary" onClick={handleAddClient}>
          {props.addClient.spinner ? <InlineLoading description="Yükleniyor..." /> : "Ekle"}
        </Button> */}

      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);