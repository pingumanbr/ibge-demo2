import React, { Component } from 'react';
import { Tree } from 'primereact/tree';
import { Growl } from 'primereact/growl';
import { NodeService } from './service/NodeService';
import {ContextMenu} from 'primereact/contextmenu';

import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import ReactDOM from 'react-dom';


export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: null,
            selectedNodeKey: null,
            infomation: null,
            
            menu : [
                
                {
                    label: 'View Key',
                    icon: 'pi pi-search',
    
                    command: () => {
                        this.growl.show({severity: 'success', summary: 'Node Value', detail:this.state.selectedNodeKey});
                    }
                },
                    {
                        label: 'Edit Key',
                        icon: 'pi pi-cog',
                        command: () => {
                            this.fUpdate( this.state.selectedNodeKey );
                        }
                    }
                    
                
            ]
        };

        this.nodeservice = new NodeService();

    }

    componentDidMount() {
        this.nodeservice.getTreeNodes().then(data => this.setState({nodes: data}));
    }


    render() {
        return (
            <div>
            <Growl ref={(el) => this.growl = el} />
            <ContextMenu model={this.state.menu} ref={el => this.cm = el} />

            <Tree value={this.state.nodes} expandedKeys={this.state.expandedKeys} 
                  onToggle={e => this.setState({expandedKeys: e.value}) } 
                 
                 dragdropScope="demo"
                 onDragDrop={event => this.setState({nodes: event.value})}

                 onClick={(e) => this.setState({nodes: e.target.value})}
                 
                 contextMenuSelectionKey={this.state.selectedNodeKey} 
                 onContextMenuSelectionChange={event => this.setState({selectedNodeKey: event.value})}
                 onContextMenu={event => this.cm.show(event.originalEvent)} >
            </Tree>
            </div>
        )
    }


fUpdate = ( info ) => {
   console.log( "Valor recebido -> " + info );
   this.updateInfo( info );
};

updateInfo = async( info ) => {
       try{
           await fetch(`http://localhost:5000/data/${info}`,{method:"PUT"}).then(function(response){
               return response.json();
           });
       }catch(err){
           console.error(err.message);
       }
};
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;