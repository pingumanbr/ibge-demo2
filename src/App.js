import React, { Component } from 'react';
import { Tree } from 'primereact/tree';
import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';
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
            menu : [
                {
                    label: 'Edit Value',
                    icon: 'pi pi-search',
    
                    command: () => {
                        this.growl.show({severity: 'success', summary: 'Node Value', detail:this.state.selectedNodeKey});
                       
                    }
                    
                }
            ]
        };

        this.nodeservice = new NodeService();

        this.typeEditor = this.typeEditor.bind(this);
        this.requiredValidator = this.requiredValidator.bind(this);
    }

    componentDidMount() {
        this.nodeservice.getTreeNodes().then(data => this.setState({nodes: data}));
    }

    onEditorValueChange(props, value) {
        let newNodes = JSON.parse(JSON.stringify(this.state.nodes));
        let editedNode = this.findNodeByKey(newNodes, props.node.key);
        editedNode.data[props.field] = value;

        this.setState({
            nodes: newNodes
        });
    }

    findNodeByKey(nodes, key) {
        let path = key.split('-');
        let node;

        while (path.length) {
            let list = node ? node.children : nodes;
            node = list[parseInt(path[0], 10)];
            path.shift();
        }

        return node;
    }

    inputTextEditor(props, width) {
        return (
            <InputText type="text" value={props.node.data} style={{'width': width, 'padding': 0}}
                    onChange={(e) => this.onEditorValueChange(props, e.target.value)} />
        );
    }

    
    typeEditor(props) {
        return this.inputTextEditor(props, '100%');
    }

    requiredValidator(props) {
        let value = props.node.data[props.field];

        return value && value.length > 0;
    }

    render() {
        return (
            <div>
            <Growl ref={(el) => this.growl = el} />
            <ContextMenu model={this.state.menu} ref={el => this.cm = el} />

            <Tree value={this.state.nodes} 
                 
                 dragdropScope="demo"
                 onDragDrop={event => this.setState({nodes: event.value})}
                 
                 contextMenuSelectionKey={this.state.selectedNodeKey} 
                 onContextMenuSelectionChange={event => this.setState({selectedNodeKey: event.value})}
                 onContextMenu={event => this.cm.show(event.originalEvent)} >
            </Tree>
            </div>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;