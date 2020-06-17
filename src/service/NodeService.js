
import axios from 'axios';
import "regenerator-runtime/runtime";

export class NodeService {


    async getTreeNodes() {
      
      const teste = await axios({
            "method":"GET",
            "url":"https://covid-19-brasil.p.rapidapi.com/covid-19/20200402/Sudeste",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"covid-19-brasil.p.rapidapi.com",
            "x-rapidapi-key":"830049ae54mshe92466ea0d5bbb7p1ab847jsn72c1b598df92",
            "useQueryString":true
            }
            })
            .then((response)=> 
              response.data                 
             )
            .catch((error)=>{
              console.log(error)
            });

            console.log(JSON.stringify(teste.data.accumulated));
            var jsonteste = teste.data.accumulated;

            console.log(JSON.stringify(jsonteste));

            var jsontesteFinal =  { "root":[
              {"key":"0","label":"Regiões","data":"Covid por Região","icon":"pi pi-fw pi-star",
                "children": []
            }]
            };

            
            var jsonTemporario = {"key":"0-0","icon":"pi pi-fw pi-video", "children": []};
            jsonTemporario.label =  jsonteste.region;
            jsonTemporario.data = jsonteste.region;
            console.log(JSON.stringify(jsonTemporario));
            jsontesteFinal.root[0].children.push( jsonTemporario );

            
            jsonTemporario = {"key":"0-1","icon":"pi pi-fw pi-file"};
            jsonTemporario.label = "Acumulado = " + jsonteste.acumulated_cases;
            jsonTemporario.data = jsonteste.acumulated_cases;
            
            jsontesteFinal.root[0].children[0].children.push( jsonTemporario );

            jsonTemporario = {"key":"0-1","icon":"pi pi-fw pi-star"};
            jsonTemporario.label = "Mortes = " + jsonteste.acumulated_deaths;
            jsonTemporario.data = jsonteste.acumulated_deaths;
            
            jsontesteFinal.root[0].children[0].children.push( jsonTemporario );

            jsonTemporario = {"key":"0-1","icon":"pi pi-fw pi-star"};
            jsonTemporario.label = "Mortes = " + jsonteste.acumulated_deaths;
            jsonTemporario.data = jsonteste.acumulated_deaths;

            jsonTemporario = {"key":"0-1","icon":"pi pi-fw pi-calendar-plus"};
            jsonTemporario.label = "Data = " + jsonteste.date;
            jsonTemporario.data = jsonteste.date;
            
            jsontesteFinal.root[0].children[0].children.push( jsonTemporario );
            
            console.log(JSON.stringify(jsontesteFinal));
            return jsontesteFinal.root;
            
       //return axios.get('data/treenodes.json')
         //          .then(res => res.data.root);
    }

    
    
    
  }

  
