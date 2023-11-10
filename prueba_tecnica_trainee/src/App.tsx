import {useEffect, useState} from 'react'
import './App.css'

type Props = {}

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export default function App({ }: Props) {

  const [fact, setFact] = useState<string>()
  const [imageUrl, setImageUrl] = useState(null)
  const [random, setRandom] = useState(false)

  useEffect(() => {
    async function getApiWord() {
      try {
        const responseFact = await fetch(CAT_ENDPOINT_RANDOM_FACT)
        const {fact} = await responseFact.json() as IFactGatitos
        setFact(fact);
      } catch (error) {
        console.error(error);
      }
    }
    getApiWord()
  }, [random])

  useEffect(() => {
    async function getImgCat() {
      try {
        if(!fact) return
        const threeFirstWords = fact.split(' ', 3).join(' ')
        const responseGif = await fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
        const image = await responseGif.json()
        setImageUrl(image.url)
      } catch (error) {
        console.error(error);
      }
    }
    getImgCat()
  }, [fact]) 


  return (
    <div className='gatos_container'>
      <h1>Fetch de gatillos</h1>
      <h3>{fact}</h3>
      {imageUrl && <img src={'https://cataas.com' + imageUrl} alt='Gatos'/>}
      <button onClick={() => setRandom(!random)}>Get Random</button>
    </div>
  )
}