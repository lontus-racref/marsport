import { useState, useEffect } from 'react'
import './App.css';
import { sigil, reactRenderer } from '@tlon/sigil-js'
import postData from './services/get_passport_id'
import searchAzimuth from './services/search_azimuth'
import MarsportTemplate from './components/marsport-template'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AppBar from '@mui/material/AppBar'

function App() {
  const [p, setP] = useState('')
  const [galaxy, setGalaxy] = useState('')
  const [star, setStar] = useState('')
  const [inputError, setInputError] = useState('')
  const [passportId, setPassportId] = useState('')
  const [sigilP, setSigilP] = useState('')
  const [showSigil, setShowSigil] = useState(0)
  const [citizenType, setCitizenType] = useState('')

  const allClear = () => {
    setInputError('')
    setGalaxy('') 
    setStar('')
    setPassportId('')
    setSigilP('')
    setShowSigil(0)
  }

  const handleSubmit = e => {
    allClear()

    e.preventDefault()

    if(!p || !p.match(/^~/)) {
      setInputError('Please enter a valid @p')
      return false
    }

    searchAzimuth(p)
      .then(data => {
        if(!data.error) {
          if(p.match(/-/)) setStar(data.sponsor['urbit-id'])
          if(p.length > 4) setGalaxy(data.sponsor.sponsor['urbit-id'])
          setSigilP(p)
          setShowSigil(1)
          postData('http://localhost:5000', { "p": p, "g": "5537"})
            .then(data => {
              setPassportId(data.result.id)
              console.log(passportId);
            })
        } else {
          setInputError('Not found!')
        }
      })
  }

  useEffect(() => {
    if(sigilP){
      if(star && galaxy) {
        setCitizenType('Planet')
      } else if(!star && galaxy) {
        setCitizenType('Star')
      } else {
        setCitizenType('Galaxy')
      }
    }
  },[sigilP])

  useEffect(() => {
    const timer = setTimeout(() => {
      setInputError('')
    }, 2000)
    return () => clearTimeout(timer)
  }, [inputError])

  return (
    <>
      <AppBar position="static" color="primary" dark>
        <div style={{ position:'absolute' }}>
          M A R S P O R T
        </div>
        <form onSubmit={ handleSubmit } style={{ margin:"0 auto" }}>
          <TextField
              id="patp"
              label="Type @p"
              helperText={ inputError }
              variant="outlined"
              onChange={ e => setP(e.target.value) }
              style={{ marginTop:'10px', marginBottom: '10px' }}
            />
          <Button type="submit">>></Button>
        </form>
      </AppBar>
    <Container maxWidth="lg">
      <MarsportTemplate sigil={sigilP} p={sigilP} star={star} galaxy={galaxy} type={citizenType} id={passportId} />
      
    </Container>
  </>
  );
}

export default App;
