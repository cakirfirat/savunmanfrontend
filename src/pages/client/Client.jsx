import React from 'react'
import { useParams } from 'react-router';
import Header from '../layouts/header';
import {
    Breadcrumb,
    BreadcrumbItem,
    Tile,
    OverflowMenu,
    OverflowMenuItem,
    Tag,
    Tabs,
    Tab,
    TabPanel,
    TabList,
    TextInput,
    Checkbox,
    Button,
    TabPanels
} from '@carbon/react';
import { Link } from 'react-router-dom';
import {
    Dashboard,
    CloudMonitoring,
    Activity,
    Search,
    Settings
} from '@carbon/icons-react';

function Client() {

    const params = useParams();

    return (
        <div>
            <Header />
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/muvekkillerim">M</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage={true}>
                        M detayı
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <h3>M detay bilgileri</h3>
                                    <OverflowMenu

                                    >
                                        <OverflowMenuItem itemText="Düzenle" />
                                        <OverflowMenuItem itemText="Sil" />
                                    </OverflowMenu>
                                </div>
                                <div className='row'>
                                <Tabs>
                                    <TabList aria-label="List of tabs" contained>
                                        <Tab renderIcon={Dashboard}>Dashboard</Tab>
                                        <Tab renderIcon={CloudMonitoring}>Monitoring</Tab>
                                        <Tab renderIcon={Activity}>Activity</Tab>
                                        <Tab renderIcon={Search}>Analyze</Tab>
                                        <Tab disabled renderIcon={Settings}>
                                            Settings
                                        </Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>Tab Panel 1</TabPanel>
                                        <TabPanel>
                                            <form style={{
                                                margin: '2em'
                                            }}>
                                                <legend className={`cds--label`}>Validation example</legend>
                                                <Checkbox id="cb" labelText="Accept privacy policy" />
                                                <Button style={{
                                                    marginTop: '1rem',
                                                    marginBottom: '1rem'
                                                }} type="submit">
                                                    Submit
                                                </Button>
                                                <TextInput type="text" labelText="Text input label" helperText="Optional help text" />
                                            </form>
                                        </TabPanel>
                                        <TabPanel>Tab Panel 3</TabPanel>
                                        <TabPanel>Tab Panel 4</TabPanel>
                                        <TabPanel>Tab Panel 5</TabPanel>
                                    </TabPanels>
                                </Tabs>
                                </div>
                                {/* <Tabs>
                                    <TabList aria-label="List of tabs" contained>
                                        <Tab renderIcon={Dashboard}>Dashboard</Tab>
                                        <Tab renderIcon={CloudMonitoring}>Monitoring</Tab>
                                        <Tab renderIcon={Activity}>Activity</Tab>
                                        <Tab renderIcon={Search}>Analyze</Tab>
                                        <Tab disabled renderIcon={Settings}>
                                            Settings
                                        </Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>Tab Panel 1</TabPanel>
                                        <TabPanel>
                                            <form style={{
                                                margin: '2em'
                                            }}>
                                                <legend className={`cds--label`}>Validation example</legend>
                                                <Checkbox id="cb" labelText="Accept privacy policy" />
                                                <Button style={{
                                                    marginTop: '1rem',
                                                    marginBottom: '1rem'
                                                }} type="submit">
                                                    Submit
                                                </Button>
                                                <TextInput type="text" labelText="Text input label" helperText="Optional help text" />
                                            </form>
                                        </TabPanel>
                                        <TabPanel>Tab Panel 3</TabPanel>
                                        <TabPanel>Tab Panel 4</TabPanel>
                                        <TabPanel>Tab Panel 5</TabPanel>
                                    </TabPanels>
                                </Tabs> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Client