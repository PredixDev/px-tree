/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-tree.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-tree-node" parent-name="px-tree" description="This sub-component represents a single node within the px-tree. You should NOT need to interact with this subcomponent directly, as it is only used by the parent px-tree, but this API is provided for documentation and override purposes. The px-tree-node subcomponents are generated recursively to support deeply nested px-tree components. Including a <px-tree-node> tag inside of a px-tree will not be picked up by the component." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}" config="[[chosenConfig]]"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component" style="flex:1 1 100%;">
        <p><strong>Note:</strong> activation and selection will not work on this component or its demo page in isolation.</p>
        <px-tree-node label="[[props.label.value]]" items="[[props.items.value]]" keys="[[props.keys.value]]" icon="[[props.icon.value]]" can-open="" is-active="">
        </px-tree-node>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-tree-node">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer api-source-file-path="px-tree/px-tree-api.json" source="px-tree-node"></px-demo-api-viewer>


    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-tree-node-demo',

  properties: {

    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    configs: {
      type: Array,
      value: function() {
        return [
          {
            configName: "Default",
            configReset: true
          }
        ];
      }
    }
  },

  demoProps: {
    items: {
      type: Array,
      defaultValue: [{"label":"Leaf 1.0","id":"leaf-1-0"},{"label":"Leaf 1.1","id":"leaf-1-1"},{"label":"Leaf 1.2","id":"leaf-1-2"},{"label":"Leaf 1.3","id":"leaf-1-3"},{"label":"Leaf 1.4","id":"leaf-1-4"},{"label":"Leaf 1.5","id":"leaf-1-5"},{"label":"Leaf 1.6","id":"leaf-1-6"},{"label":"Leaf 1.7","id":"leaf-1-7"},{"label":"Leaf 1.8","id":"leaf-1-8"}],
      inputType: 'code:JSON'
    },
    keys: {
      type: Object,
      defaultValue: {'id' : 'id', 'label' : 'label', 'children' : 'children', 'icon' : 'icon'},
      inputType: 'code:JSON',
      inputHelpText: '"Keys" defines the configuration for "Items"'
    },
    label: {
      type: String,
      defaultValue: 'Branch 0.4',
      inputType: 'text',
    },
    icon: {
      type: String,
      defaultValue: 'px-com:chat',
      inputType: 'text',
      inputPlaceholder: 'px-category:icon-name'
    },
    parentComponent: {
      type: String,
      defaultValue: ['<px-tree>','</px-tree>']
    }
  }
});
