import React, { useEffect, useState } from 'react'
import {
    Button,
    Tile,
    ContainedList,
    ContainedListItem,
    ExpandableSearch,
} from 'carbon-components-react'
import AppHeader from '../layouts/header'
import Breadcrumbitem from '../layouts/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@carbon/react';
import { connect } from 'react-redux';

function Packages(props) {

    const title = "Premium Paket";
    const price = "29,999.00/ay (Yıllık satın alımlarda geçerli)";
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { theme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if(props.verifyCode.isLogin){
            navigate("/dashboard");
        }
    }, [props.verifyCode]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const listItems = [
        "Sınırsız veri kullanımı",
        "24/7 Müşteri Desteği",
        "Özel sunucu erişimi",
        "Ücretsiz güncellemeler"
    ];;
    return (
        <div>
            <AppHeader />
            <Breadcrumbitem />
            <div className='container'>
                <div className="row mt-5">
                    <div className="col-4 text-start">
                        <Tile>
                            {/* <div style={{ textAlign: 'center' }}>
                            <img src={imageUrl} alt={title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }} />
                        </div> */}
                            <h4 className='mb-3'>{title}</h4>
                            <p className='mb-3'><strong>Fiyat:</strong> {price}</p>
                            <ContainedList className="text-start" label="Paket özellikleri" kind="on-page">
                                {listItems.map((listItem, key) => <ContainedListItem key={key}>{`- ` + listItem}</ContainedListItem>)}
                            </ContainedList>
                            <Button as={Link} to="/kayit-ol">Satın al <i className="fa-sharp fa-thin fa-arrow-right align-self-center ms-4" style={{ color: "#fffff" }}></i></Button>
                        </Tile>
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
  export default connect(mapStateToProps, mapDispatchToProps)(Packages);