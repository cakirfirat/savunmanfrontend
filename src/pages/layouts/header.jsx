import React, { useEffect } from 'react';
import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderGlobalBar,
    Search,
    Button,
    ProgressIndicator,
    ProgressStep,
    OverflowMenu,
    OverflowMenuItem,
} from 'carbon-components-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import App from '../../App';
import { logout, resetVerifyCode } from '../../actions/auth/verifyCode';
import { resetCreateCOde } from '../../actions/auth/createCode';

function AppHeader(props) {

    const location = useLocation();
    const isItemActive = (path) => location.pathname === path;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (props.verifyCode.isLogin === false) {
    //         if(!props.createCode.done) {
    //             navigate("/giris-yap");
    //             return;
    //         }
    //     }
    // }, [navigate, props.verifyCode, props.createCode]);

    function Logout() {
        dispatch(resetCreateCOde())
        dispatch(resetVerifyCode())
       dispatch(logout())
    }


    return (
        <div style={{ position: 'static', marginBottom: '80px' }}>
            <Header aria-label="Site Header">
                <HeaderName href="/" prefix="">
                    {/* Burada logo resmini yerleştirebilirsiniz */}
                    <img src="/assets/images/peakway_5.png" alt="Logo" style={{ height: '30px' }} />
                </HeaderName>
                {props.verifyCode.isLogin ?
                    <>
                        <HeaderNavigation aria-label="Site Navigation">
                            <HeaderMenuItem element={Link} to="/dashboard" isActive={isItemActive('/dashboard')} >Ana Sayfa </HeaderMenuItem>
                            <HeaderMenuItem element={Link} to="/muvekkillerim" isActive={isItemActive('/muvekkillerim')}>Müvekkillerim</HeaderMenuItem>
                            <HeaderMenuItem element={Link} to="/davalarim" isActive={isItemActive('/davalarim')} href="/davalarim">Davalarım</HeaderMenuItem>
                            <HeaderMenuItem element={Link} to="/odemeler" isActive={isItemActive('/odemeler')} href="/davalarim">Ödemeler</HeaderMenuItem>
                            <HeaderMenuItem element={Link} to="/ayarlar" isActive={isItemActive('/ayarlar')} href="/hakkimizda">Ayarlar</HeaderMenuItem>
                        </HeaderNavigation>
                    </>
                    :
                    <>
                        <HeaderNavigation aria-label="Site Navigation">
                            <HeaderMenuItem element={Link} to="/" isActive={isItemActive('/')} href="/">Ana Sayfa </HeaderMenuItem>
                            <HeaderMenuItem element={Link} to="/paketler" isActive={isItemActive('/paketler')} href="/paketler">Paketler</HeaderMenuItem>
                            <HeaderMenuItem element={Link} to="/ayarlar" isActive={isItemActive('/ayarlar')} href="/hakkimizda">Hakkımızda</HeaderMenuItem>
                        </HeaderNavigation>

                    </>
                }
                <HeaderGlobalBar>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        {/* Giriş yap ve Kayıt ol butonları */}
                        {location.pathname == "/profil-buro" || location.pathname == "/profil-avukat" || location.pathname == "/odeme" ?
                            null
                            :
                            props.verifyCode.isLogin ?
                                <>
                                    <OverflowMenu flipped={document?.dir === 'rtl'} aria-label="overflow-menu">
                                        <OverflowMenuItem itemText="Profil ayarları" requireTitle />
                                        <OverflowMenuItem itemText="Bildirim ayarları" requireTitle />
                                        <OverflowMenuItem onClick={Logout}  hasDivider isDelete itemText="Çıkış yap" />
                                    </OverflowMenu>
                                </>
                                :
                                <>
                                    <Button as={Link} to="/giris-yap" kind="ghost" className={isItemActive('/giris-yap') ? 'active-button me-1' : 'me-1'}>Giriş Yap</Button>
                                    <Button as={Link} to="/kayit-ol" kind="ghost" className={isItemActive('/kayit-ol') ? 'active-button' : ''}>Kayıt Ol</Button>
                                </>

                        }


                        {/* Arama kutusu */}
                        <div style={{ maxWidth: '300px', marginLeft: '1rem' }}>

                            <Search id="site-search" labelText="" placeholder="Ara..." size="lg" />
                        </div>
                    </div>
                </HeaderGlobalBar>
            </Header>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);