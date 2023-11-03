import axios from "axios"


const app = axios.create({
    baseUrl: 'https://globoesporte.globo.com/rj/futebol/campeonato-carioca/',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
    },
  
})

export default app