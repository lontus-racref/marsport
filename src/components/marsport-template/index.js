import React, { createRef } from 'react'
import { sigil, reactRenderer } from '@tlon/sigil-js'
import mpt from '../../assets/marsport_series_a.png'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { QRCodeSVG } from 'qrcode.react'
import { useScreenshot, createFileName } from "use-react-screenshot"
import Button from '@mui/material/Button'
import './style.css'

const MarsportTemplate = props => {
    const ref = createRef(null)
    const[image, takeScreenShot] = useScreenshot({
        type:'image/jpg',
        quality: 1.0
    })

    const download = (image, { name=`${props.p}-urbitpassport`, extension='png'} = {}) => {
        const a = document.createElement('a')
        a.href = image
        a.download = createFileName(extension, name)
        a.click()
    }

    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

    return(
        props.sigil ?
            <Container maxWidth='sm' style={{ marginTop: '20px', width:'100%'}}>
                <div ref={ref} style={{ width:'620px' }}>
                    <div style={{ margin:'0 auto', height:'721px', width:'620px', backgroundColor:'#000', backgroundImage:`url(${mpt})`, backgroundPosition:"center",backgroundRepeat:"no-repeat", backgroundSize:"contain" }}>
                        <div style={{ position:'relative', left:'35px', top:'140px', zIndex:"1"}}>
                            {
                                sigil({
                                    patp: `~${props.sigil}`,
                                    renderer: reactRenderer,
                                    colors: ['rgba(224,191,112,75%)', 'rgba(0,0,0,75%)'],
                                    attributes: {
                                        transform: "scale(1)",
                                        //fillOpacity: "0.5",
                                        //strokeOpacity: "1",
                                    }
                                })
                            }
                        </div>
                        <div style={{ display:'flex', height:'100%', width:'100%', position:'relative', left:'170px', top:'-5px', zIndex:'1' }}>
                            <List dense='true'>
                                <ListItem><span class="id"><strong>{ props.id }</strong></span></ListItem>
                                <ListItem><span class="id">@p: { props.p }</span></ListItem>
                                { props.star ? <ListItem><span class="id">Star: { props.star }</span></ListItem> : '' }
                                { props.galaxy ? <ListItem><span class="id">Galaxy: { props.galaxy }</span></ListItem> : '' }
                                <ListItem><span class="id">Citizen Type: { props.type }</span></ListItem>
                            </List>
                            <div style={{ display:'flex', position:'relative', left:'115px', top:'17px', zIndex:'1'  }}>
                                <QRCodeSVG value={ JSON.stringify(props) } bgColor="rgba(224,191,112,0%)" />
                            </div> 
                        </div>
                    </div>
                </div>
                <Button onClick={ downloadScreenshot }>Download Marsport</Button>
            </Container>
        :
        ''
    )
}
export default MarsportTemplate