import React, { Component } from 'react';
import { Tree } from 'primereact/tree';
import { NodeService } from './service/NodeService';
import ReactDOM from 'react-dom';
import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

export class App extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            nodes: null,
            expandedKeys: {}
        };

        this.nodeService = new NodeService();
        
    }


    componentDidMount() {
        
        this.nodeService.getTreeNodes()
        .then(
            data => this.setState({nodes: data})
            );
       
    }

    render() {
        return (
            <div>
                <h3 className="first">Ocorrências da COVID-19</h3>
                <Tree value={this.state.nodes} />

              </div>
        )
    }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

var ip = process.env.IP || '0.0.0.0';

var port = process.env.PORT || 8080;

App.listen(port, ip, function() {
 console.log('running at ' + ip + ':' + port);
 });

export default App;
