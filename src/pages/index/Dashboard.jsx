import React, { useEffect, useState, useRef } from 'react'
import Header from '../layouts/header'

import {
    IconButton,
    Modal,
    TextInput,
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TextArea,
    Theme,
    ContainedList,
    ContainedListItem,
    Tag,
    DataTableSkeleton,
    StructuredListSkeleton,

} from '@carbon/react'
import { useNavigate } from 'react-router'
import { connect, useDispatch } from 'react-redux';
import { Add } from '@carbon/react/icons';
import { addClient, resetAddClient } from '../../actions/client/addClient';
import Swal from 'sweetalert2';
import { getClients } from '../../actions/client/getClients';
import { PaginationNav, Search } from 'carbon-components-react';
import { Link } from 'react-router-dom';

function Dashboard(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchcaseResults, setSearchcaseResults] = useState([]);
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [tckn, setTckn] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [mail, setMail] = useState('')
    const [summary, setSummary] = useState('')
    const [rows, setRows] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const activeCases = ["98123 No'lu boşanma davası", "432213 No'lu ceza davası", "43534 No'lu boşanma davası", "3243 No'lu ceza davası",];
        const caseResults = activeCases.filter(listItem => listItem.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchcaseResults(caseResults);
    }, [searchTerm]);

    useEffect(() => {
        if (!props.verifyCode.isLogin) {
            navigate("/giris-yap")
        }
    }, [props.verifyCode.isLogin])

    const button = useRef();

    const headers =
        [
            {
                header: 'İsim',
                key: 'name'
            },
            {
                header: 'Soyisim',
                key: 'surname'
            },
            {
                header: 'TCKN',
                key: 'tckn'
            },
            {
                header: 'Telefon',
                key: 'phoneNumber'
            },
            {
                header: 'Ödme durumu',
                key: 'paymentStatus'
            },
            {
                header: 'Dava durumu',
                key: 'caseStatus'
            },
            {
                header: '',
                key: 'detail'
            },
        ];

    useEffect(() => {
        dispatch(getClients());
    }, [])

    useEffect(() => {
        if (props.getClients.done) {
            setRows(
                props.getClients.getClients.result.map((client) => {
                    return {
                        id: client.TCKN, // Benzersiz bir ID kullanmak önemli, örneğin TCKN
                        name: client.Name,
                        surname: client.Surname,
                        tckn: client.TCKN,
                        phoneNumber: client.PhoneNumber,
                        paymentStatus: 'Ödendi', // Ödeme durumu ve aktif dava durumu varsayılan değerleri
                        caseStatus: 'Aktif',
                        detail: <Link to={'/musteri/' + client.TCKN}>Detay</Link>
                    };
                })
            );
        }
    }, [props.getClients]);





    const handleAddClient = () => {
        dispatch(addClient(name, surname, tckn, phoneNumber, address, summary))
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
    const handlePageChange = (newPage) => {
        // setCurrentPage(newPage);
        // console.log(newPage + 1)
        // Burada yeni sayfa numarasına göre verileri yükleyin veya başka işlemler yapın
    };

    console.log(props.getClients)
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row mt-4">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-body text-start">
                                <div className='d-flex justify-content-between mb-3'>
                                    <h3>Müvekkillerim</h3>
                                    <IconButton onClick={() => { setOpen(true) }} label="Müvekkil ekle">
                                        <Add />
                                    </IconButton>
                                </div>
                                {props.getClients.spinner ?
                                    <DataTableSkeleton headers={headers} aria-label="sample table" />
                                    :
                                    <DataTable rows={rows} headers={headers} >

                                        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                                            <Table {...getTableProps()}>
                                                <TableHead>
                                                    <TableRow>
                                                        {headers.map((header) => (
                                                            <TableHeader {...getHeaderProps({ header })}>
                                                                {header.header}
                                                            </TableHeader>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <TableRow {...getRowProps({ row })}>
                                                            {row.cells.map((cell) => (
                                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        )}
                                    </DataTable>
                                }
                                <PaginationNav
                                    className='mt-3 d-flex justify-content-end'
                                    itemsShown={5}
                                    totalItems={8}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body text-start">
                                {/* <StructuredListSkeleton  /> */}
                                <div className='d-flex justify-content-between'>
                                    <h4>Yaklaşan davalarım</h4>
                                    <IconButton
                                        label="Dava ekle"
                                        onClick={() => console.log('IconButton clicked')}
                                    >
                                        <Add />
                                    </IconButton>

                                </div>
                                <ContainedList label="Arayın" kind="on-page" action={''}>
                                    <Search placeholder="Dava adı" value={searchTerm} onChange={handleChange} closeButtonLabelText="Clear search input" size="lg" labelText="Filter search" />
                                    {searchcaseResults.map((listItem, key) => {
                                        return (
                                            <ContainedListItem className="" key={key}>{listItem} <div className="text-end">
                                                <Tag>3 gün kaldı</Tag></div>
                                            </ContainedListItem>
                                        )
                                    })}
                                </ContainedList>
                            </div>
                        </div>
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
                loadingStatus={props.addClient.spinner ? 'active' : 'inactive'}
                loadingDescription="Ekleniyor..."
                open={open}
                onRequestClose={() => setOpen(false)}>
                <p className='mt-3'>
                    Eklediğiniz müvekkilin bilgilerinin doğruluğundan emin olun. Müvekkilden talep edeceğiniz bilgiler sms yoluyla kendisine iletilecektir
                </p>
                <TextInput
                    onChange={(e) => { setName(e.target.value) }}
                    className='mt-3'
                    data-modal-primary-focus
                    id="text-input-1"
                    labelText="İsim"
                    placeholder="Müvekkil ismi" />
                <TextInput
                    onChange={(e) => { setSurname(e.target.value) }}
                    className='mt-3'
                    data-modal-primary-focus
                    id="text-input-2"
                    labelText="Soyisim"
                    placeholder="Müvekkil soyismi" />
                <TextInput
                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                    className='mt-3'
                    data-modal-primary-focus
                    id="text-input-3"
                    labelText="Telefon numarası"
                    placeholder="Müvekkil telefon numarası" />
                <TextInput
                    onChange={(e) => { setTckn(e.target.value) }}
                    className='mt-3'
                    data-modal-primary-focus
                    id="text-input-4"
                    labelText="TCKN"
                    placeholder="Müvekkil Türkiye Cumhuriyeti kimlik numarası" />
                <TextInput
                    onChange={(e) => { setMail(e.target.value) }}
                    className='mt-3'
                    data-modal-primary-focus
                    id="text-input-5"
                    labelText="Mail adresi"
                    placeholder="Müvekkil mail bilgisi (varsa)" />
                <TextInput
                    onChange={(e) => { setAddress(e.target.value) }}
                    className='mt-3'
                    data-modal-primary-focus
                    id="text-input-5"
                    labelText="Adres"
                    placeholder="Müvekkil adres bilgisi (varsa)" />
                <TextArea
                    onChange={(e) => { setSummary(e.target.value) }}
                    className='mt-3'
                    labelText="Müvekkil özeti"
                    placeholder="Müvekkiliniz hakkında eklemek istediğiniz bilgileri buraya yazabilirsiniz"
                    rows={4}
                    id="text-area-1" />


            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);