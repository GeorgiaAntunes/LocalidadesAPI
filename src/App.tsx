import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

interface MunicipiosDetails {
  nome: string;
  municipio: {
    id: number;
    microrregiao: {
      nome: string
      mesorregiao: {
        UF: {
          nome: string;
          sigla: string;
        }
      }
    }
  }
}

function App() {
  const [listPlaces, setListPlaces] = useState<MunicipiosDetails[]>([])
  const [search, setSearch] = useState('')

  useEffect(() =>{
    fetchAPI();
  }, [])

  const fetchAPI = async () =>{  
      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/distritos`
      try{
        const response = await axios.get(url)
        console.log(response.data);
        setListPlaces(response.data)
      } catch  (error){
        console.log(error)
      }
  }

  const filteredPlaces = search.length > 0 
  ? listPlaces.filter(place => place.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : []

  
  // listPlaces.filter(place => place.nome.toLowerCase().includes(searchValue.toLowerCase()));
    


 
  return (
    <div>
      <input onChange={e => setSearch(e.target.value)}></input>
      {
        search.length > 0 
        ? (filteredPlaces.map(place => {
          return (
            <div key={place.municipio.microrregiao.nome}>
            <p><b>Municipio:</b> {place.nome}</p>
            <p><b>UF:</b> {place.municipio.microrregiao.mesorregiao.UF.nome}</p>
            <p><b>Sigla:</b> {place.municipio.microrregiao.mesorregiao.UF.sigla}</p>
            </div>
          )
        }))
        : (listPlaces.map((place) => {
          return (
            <div key={place.municipio.microrregiao.nome}>
            <p><b>Municipio:</b> {place.nome}</p>
            <p><b>UF:</b> {place.municipio.microrregiao.mesorregiao.UF.nome}</p>
            <p><b>Sigla:</b> {place.municipio.microrregiao.mesorregiao.UF.sigla}</p>
            </div>
          )
        }))
      }
    </div>
  )
}

{/* const Search = ({ onSearch }: { onSearch: (searchValue: string) => void }) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    onSearch(searchValue); // Chamando a função de pesquisa do componente pai com o valor de pesquisa
  }

  return (
    <span>
      <input onChange={handleSearchChange} placeholder='busque por municipio'></input>
    </span>
  )
} */}

export default App
