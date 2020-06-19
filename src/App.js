import React, { Component } from 'react';
import {Tree} from 'primereact/tree';
import {ContextMenu} from 'primereact/contextmenu';
import {Growl} from 'primereact/growl';
import { NodeService } from './service/NodeService';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import './App.css';
import ReactDOM from 'react-dom';



export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: null,
            expandedKeys: {},
            selectedNodeKey: null
        };

        this.menu = [
            {
                label: 'Edit Key',
                icon: 'pi pi-search',
                command: () => {
                    this.growl.show({severity: 'success', summary: 'Node Key', 
                    detail: this.state.selectedNodeKey});
                }
            }
        ];

        this.nodeService = new NodeService();
    }

    componentDidMount() {
        this.nodeService.getTreeNodes().then(data => this.setState({nodes: data}));
    }

    render() {
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />

                <ContextMenu model={this.menu} ref={el => this.cm = el} 
                             onHide={() => this.setState({selectedNodeKey: null})}/>

                <Tree value={this.state.nodes} expandedKeys={this.state.expandedKeys} onToggle={e => this.setState({expandedKeys: e.value})}
                    contextMenuSelectionKey={this.state.selectedNodeKey} onContextMenuSelectionChange={event => this.setState({selectedNodeKey: event.value})}
                    onContextMenu={event => this.cm.show(event.originalEvent)} />
            </div>
        )
    }
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;