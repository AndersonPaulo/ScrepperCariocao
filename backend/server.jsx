const db = require('../src/db.json')
const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const url = 'https://globoesporte.globo.com/rj/futebol/campeonato-carioca/'
const express = require('express')



const app = express()

app.get('/',(req,res)=>{
    res.send(db.atletas)
})
app.get('/cors',(req,res)=>{
    res.set('Acces-Control-Allow-Origin','*')
    res.send('Cors')


})
app.listen(8080,()=>{
    
    db.atletas = []
    fs.writeFile('../src/db.json',JSON.stringify(db), err =>{
       if (err) return err
       
    })     
    axios(url, {mode:'cors'}).then(res =>{
        
        const html = res.data
        const $ = cheerio.load(html)
        const tabelaStatus = $('.ranking-item-wrapper')
        const tabelaJogador =[]
        let i = 0
        tabelaStatus.each(function(){
            i +=1
            const Rank = i.toString()
            const Jogador = $(this).find('.jogador-nome').text()
            const Posicao = $(this).find('.jogador-posicao').text()
            const Gols = $(this).find('.jogador-gols').text()
            const Time = $(this).find('.jogador-escudo > img').attr('alt')
            
            tabelaJogador.push({
                Rank,
                Jogador,
                Posicao,
                Gols,
                Time
            })
            db.atletas.push(tabelaJogador[i-1])
 
                    
            fs.writeFile('../src/db.json',JSON.stringify(db ,null,2), err =>{
                if (err) return err
               
            })           
           
        })
    
  
    }).catch(console.error)    
    
   
})