
import axios from 'axios';

export class NodeService {

   

    getTreeNodes() {
      
 /*     
   
        axios({
            "method":"GET",
            "url":"https://covid-19-brasil.p.rapidapi.com/covid-19/20200402/Centro-Oeste",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"covid-19-brasil.p.rapidapi.com",
            "x-rapidapi-key":"830049ae54mshe92466ea0d5bbb7p1ab847jsn72c1b598df92",
            "useQueryString":true
            }
            })
            .then((response)=>{
              console.log(JSON.stringify(response.data))             
              return JSON.stringify(response.data);
            })
            .catch((error)=>{
              console.log(error)
            });
*/
            
 
       return axios.get('data/treenodes.json')
                   .then(res => res.data.root);
    }
}
    