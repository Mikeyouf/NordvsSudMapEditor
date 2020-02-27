import React from 'react'
import Layout from '../components/Layout'
// import Img from '../components/imageWrapper/ImageWrapper'
import { Img } from '@tueri/react'
import styled from 'styled-components'
import { pxToRem, colors, fonts } from '../theme/Helpers'

// import imageAccueil from '../img/image-accueil.jpg'
const Wrapper = styled.div`
    position: relative;
`

const Header = styled.header`
    position: absolute;
    width: ${pxToRem(340)};
    top: ${pxToRem(32)};
    left: calc(50% - 170px);
    z-index: 10;

    h2 {
        text-align: center;
        color: ${colors.accentDark};
        font-family: ${fonts.fontTitre};
        font-weight: bold;
        font-size: ${pxToRem(32)};
    }
`

const Article = styled.article`
    max-height: 100vh;
    overflow: hidden;
`

const LandingPage = () => {
    return ( 
        <Layout page="accueil">
            <Wrapper>
                <Header>
                    <h2>Nord vs Sud Map Editor</h2>
                </Header>
                <Article>
                    <Img src='https://userscontent2.emaze.com/images/2d48516c-35f5-4d13-a458-9dd4cb476a2b/e9fe166b0ecffa8db62f75230ddc8d91.jpg' alt="background bataille"/>
                </Article>
            </Wrapper>
        </Layout>
     );
}
 
export default LandingPage;