import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import Header from '../layouts/header';
import { getCases } from '../../actions/case/getCases';
import {
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
  import { Button, DataTableSkeleton, InlineLoading, Loading } from '@carbon/react';
  import { Add, Time } from '@carbon/icons-react';
import { formatDatee } from '../../helpers/formatters';
import { Link } from 'react-router-dom';
import IsLogin from '../layouts/IsLogin';



function Cases(props) {

    console.log(props.getCases)

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [clientList, setClientList] = useState([]);

    useEffect(() => {
        dispatch(getCases());
    }, [dispatch]);

    useEffect(() => {
        if (props.getCases.done) {
            setClientList(
                props.getCases.getCases.result.map((element, index) => {
                    return {
                        id: element.ID,
                        description: element.Description == "" ? "Açıklama bulunmamaktadır" : element.Description,
                        startTime: formatDatee(element.StartDate),
                        endTime: element.EndTime == null ? <Tag type='gray'>Dava devam ediyor</Tag>: formatDatee(element.EndTime),
                        status: element.Status == "active" ? <Tag type='green'>Aktif</Tag> : <Tag type='red'>Pasif</Tag>,
                        clientNameSurname: element.Client?.Name +" "+element.Client?.Surname,
                        clientTCKN: element.Client?.TCKN,
                        detail: <Link style={{ textDecoration: "none" }} className='d-flex align-items-center' to={`/dava/${element.ID}`}>Dava detayı <i className="fa-light fa-arrow-right ms-2"></i></Link>,
                    }
                })
            )
        }
    }, [props.getCases])

    const headers = [
        { key: 'description', header: 'Dava kısa açıklama', },
        { key: 'startTime', header: 'Başlangıç zamanı' },
        { key: 'endTime', header: 'Bitiş zamanı' },
        { key: 'status', header: 'Durum' },
        { key: 'clientNameSurname', header: 'Müvekkil adı soyadı' },
        { key: 'clientTCKN', header: 'Müvekkil TCKN' },
        { key: 'detail', header: '' }
    ];

    // Arama işlevi
    const getFilteredRows = (query) => {
        return clientList.filter(row =>
            headers.some(header =>
                row[header.key] && row[header.key].toString().toLowerCase().includes(query.toLowerCase())
            )
        );
    };
    

    const filteredRows = getFilteredRows(searchInput);


    return (
        <div>
            <IsLogin />
            <Header />
            <div className="container">
                <div className="row">

                    <div className="col-12 text-start">
                        {props.getCases.spinner ?
                            <DataTableSkeleton headers={headers} aria-label="sample table" />
                            :
                            <DataTable rows={filteredRows} headers={headers} render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                                <TableContainer >
                                    <div className='d-flex justify-content-between mb-3'>
                                        <h3>
                                            Davalarım
                                        </h3>
                                        <IconButton
                                            label="Ekle"
                                            // onClick={() => setOpen(true)}
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
                                            {props.getCases.getCases?.result?.length == 0 ?
                                                <TableRow>
                                                    <TableCell colSpan={6}>Aktif bir davanız bulunmamaktadır</TableCell>
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
                                    {/* <PaginationNav className='d-flex justify-content-end' itemsShown={5} totalItems={10} /> */}

                                </TableContainer>
                            )} />
                        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Cases);