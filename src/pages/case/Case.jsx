import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useSound from 'use-sound';

import Header from '../layouts/header';
import {
    Breadcrumb,
    BreadcrumbItem,
    OverflowMenu,
    OverflowMenuItem,
    Grid,
    Column,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    TabsSkeleton,
    InlineLoading,
    ContainedList,
    ContainedListItem,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Accordion,
    AccordionItem,
} from '@carbon/react';
import IsLogin from '../layouts/IsLogin';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getCaseFiles } from '../../actions/case/getCaseFiles';
import { textToSpeech } from '../../actions/openai/textToSpeech';
import { getCase } from '../../actions/case/getCase';
function Case(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const [play, setPlay] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const { Id } = params;
    const [clientInfo, setClientInfo] = useState({});//[Name, Surname, TCKN, Phone, Email, Address, City, District, ZipCode, Country
    const [stepOneResponse, setStepOneResponse] = useState({});
    const [stepTwoResponse, setStepTwoResponse] = useState({});
    const [stepThreeResponse, setStepThreeResponse] = useState({});
    const [stepFourResponse, setStepFourResponse] = useState({});

    useEffect(() => {
        dispatch(getCaseFiles(Id));
        dispatch(getCase(Id));
    }, [dispatch])

    useEffect(() => {
        if (props.getCaseFiles.done) {
            props.getCaseFiles.getCaseFiles.result.map((element, index) => {
                if (element.DocumentType == "stepthree") {
                    var data = JSON.parse(element.Document)
                    dispatch(textToSpeech("tts-1-hd", data.airesponse.summary, "onyx", "mp3", "1.1"));
                }
            })
        }
    }, [props.getCaseFiles]);

    useEffect(() => {
        if (props.textToSpeech.done) {
            const audioUrl = URL.createObjectURL(props.textToSpeech.textToSpeech);
            setAudioUrl(audioUrl);
            setPlay(true);
        }
    }, [props.textToSpeech]);


    useEffect(() => {
        if (props.getCaseFiles.done) {
            props.getCaseFiles.getCaseFiles.result.map((element, index) => {
                if (element.DocumentType == "stepone") {
                    setStepOneResponse(JSON.parse(element.Document))
                }
                if (element.DocumentType == "steptwo") {
                    setStepTwoResponse(JSON.parse(element.Document))
                }
                if (element.DocumentType == "stepthree") {
                    setStepThreeResponse(JSON.parse(element.Document))
                }
                if (element.DocumentType == "stepfour") {
                    setStepFourResponse(JSON.parse(element.Document))
                }
            })
        };
    }, [props.getCaseFiles])


    useEffect(() => {
        if (props.getCase.done) {
            setClientInfo(props.getCase.getCase.result.Client)
        }
    }, [props.getCase])



    return (
        <div>
            <IsLogin />
            <Header />
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/davalarim">Davalarım</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage={true}>
                        Dava detayı
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    <div className="col-12">
                        <div className='d-flex justify-content-between mb-3'>
                            <h3 className='text-start mt-3'>Dava detay bilgileri</h3>
                            {play ? (
                                <audio controls>
                                    <source src={audioUrl} type="audio/mpeg" />
                                </audio>
                            ) :
                                <div>
                                    <InlineLoading status="active" iconDescription="Loading" description="Yorum yükleniyor..." />
                                </div>
                            }
                        </div>
                        <div className="card mt-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <h4></h4>
                                    <OverflowMenu

                                    >
                                        <OverflowMenuItem itemText="Düzenle" />
                                        <OverflowMenuItem itemText="Sil" />
                                    </OverflowMenu>
                                </div>
                                <div className='row'>
                                    <Grid condensed>
                                        <Column lg={16} md={8} sm={4}>
                                            {props.getCaseFiles.spinner && props.getCase.spinner ?
                                                <div style={{
                                                    maxWidth: '100%'
                                                }}>
                                                    <TabsSkeleton />
                                                </div>
                                                :
                                                <Tabs>
                                                    <TabList contained fullWidth>
                                                        <Tab>
                                                            Müvekkil bilgileri
                                                        </Tab>
                                                        <Tab>Tutanak Metni</Tab>
                                                        <Tab>Avukat soruları</Tab>
                                                        <Tab>Avukat detay soruları</Tab>
                                                        <Tab>Öneriler</Tab>
                                                        <Tab>Yardımcı elementler</Tab>
                                                    </TabList>
                                                    <TabPanels>
                                                        <TabPanel style={{ textAlign: 'left' }}>
                                                            <ContainedList label="Müvekkil detayı" kind="on-page">
                                                                <ContainedListItem>
                                                                    <b>Müvekkil adı soyadı :</b> <small>{clientInfo.Name + " " + clientInfo.Surname}</small>
                                                                </ContainedListItem>
                                                                <ContainedListItem>
                                                                    <b>Müvekkil TCKN :</b> <small>{clientInfo.TCKN}</small>
                                                                </ContainedListItem>
                                                                <ContainedListItem>
                                                                    <b>Müvekkil telefon numarası :</b> <small>{clientInfo.PhoneNumber}</small>
                                                                </ContainedListItem>
                                                                <ContainedListItem>
                                                                    <b>Müvekkil adres :</b> <small>{clientInfo.Address}</small>
                                                                </ContainedListItem>
                                                                <ContainedListItem>
                                                                    <b>Müvekkil özeti :</b> <small>{clientInfo.Summary}</small>
                                                                </ContainedListItem>
                                                            </ContainedList>
                                                        </TabPanel>
                                                        <TabPanel style={{ textAlign: "left" }}>
                                                            <p
                                                                className="text-serif"
                                                                dir="auto"
                                                                style={{
                                                                    fontWeight: 400
                                                                }}
                                                            >
                                                                {stepOneResponse.subject}
                                                            </p>
                                                        </TabPanel>
                                                        <TabPanel style={{ textAlign: "left" }}>
                                                            <Table aria-label="sample table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableHeader>Soru</TableHeader>
                                                                        <TableHeader>Cevap</TableHeader>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {Object.entries(stepTwoResponse?.request?.questions ?? {}).map(([index, question], idx) => {
                                                                        const answer = stepTwoResponse?.request?.answers[idx + 1];
                                                                        return (
                                                                            <TableRow key={index}>
                                                                                <TableCell>{question}</TableCell>
                                                                                <TableCell>{answer}</TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })};
                                                                </TableBody>
                                                            </Table>
                                                        </TabPanel>
                                                        <TabPanel style={{ textAlign: "left" }}>
                                                            <Table aria-label="sample table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableHeader>Detay soru</TableHeader>
                                                                        <TableHeader>Detay cevap</TableHeader>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {Object.entries(stepThreeResponse?.request?.detailed_questions ?? {}).map(([index, question], idx) => {
                                                                        const answer = stepThreeResponse?.request?.detailed_answers[idx + 1];
                                                                        return (
                                                                            <TableRow key={index}>
                                                                                <TableCell>{question}</TableCell>
                                                                                <TableCell>{answer}</TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })};
                                                                </TableBody>
                                                            </Table>
                                                        </TabPanel>
                                                        <TabPanel style={{ textAlign: "left" }}>
                                                            <Table aria-label="sample table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableHeader>Detay soru</TableHeader>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {Object.entries(stepThreeResponse?.airesponse?.response ?? {}).map(([key, value]) => {
                                                                        return (

                                                                            <TableRow key={key}>
                                                                                <TableCell>{value.hint}</TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })
                                                                    }
                                                                </TableBody>
                                                            </Table>
                                                        </TabPanel>
                                                        <TabPanel style={{ textAlign: "left" }}>
                                                            <Tabs>
                                                                <TabList activation="manual" aria-label="List of tabs">
                                                                    <Tab>İlgili kanun maddeleri</Tab>
                                                                    <Tab>İlgili içtihat önerileri</Tab>
                                                                </TabList>
                                                                <TabPanels>
                                                                    <TabPanel>
                                                                        <Accordion>
                                                                            {Object.entries(stepFourResponse?.airesponse?.lawArticles ?? {}).map(([key, value]) => {
                                                                                return (

                                                                                    <AccordionItem key={key} title={`Karar Id Değeri : ${value.ID} Yapay zeka skoru : ${value.Score}`}>
                                                                                        <p>
                                                                                            {value.Content}
                                                                                        </p>
                                                                                    </AccordionItem>
                                                                                );
                                                                            })
                                                                            }

                                                                        </Accordion>
                                                                    </TabPanel>
                                                                    <TabPanel>
                                                                        <Accordion>
                                                                            {Object.entries(stepFourResponse?.airesponse?.jurisprudences ?? {}).map(([key, value]) => {
                                                                                return (

                                                                                    <AccordionItem key={key} title={`İçtihat Id Değeri : ${value.ID} Yapay zeka skoru : ${value.Score}`}>
                                                                                        <p>
                                                                                            {value.Content}
                                                                                        </p>
                                                                                    </AccordionItem>
                                                                                );
                                                                            })
                                                                            }

                                                                        </Accordion>
                                                                    </TabPanel>
                                                                </TabPanels>
                                                            </Tabs>
                                                            {console.log(stepFourResponse.airesponse)}
                                                        </TabPanel>
                                                    </TabPanels>
                                                </Tabs>
                                            }

                                        </Column>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Case);