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
    <px-demo-header module-name="px-tree" description="This component provides an expandable and selectable tree. The contents are controlled primarily through a structured object of branch and leaf nodes." mobile="" tablet="" desktop="">
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
        <px-tree items="{{props.items.value}}" multi-select="{{props.multiSelect.value}}" multi-activate="{{props.multiActivate.value}}" disable-branch-select="{{props.disableBranchSelect.value}}" keys="{{props.keys.value}}">
        </px-tree>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-tree">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-tree"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-tree-demo',

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
          },
          {
            configName: "Deep nested",
            items: [{ "label": "Root", items: [ { "label": "Branch 1", items: [ { "label": "Branch 2", items: [ { "label": "Branch 3", items: [ { "label": "Branch 4", items: [ { "label": "Branch 5" } ] } ] } ] } ] } ] } ],
            keys: {'id' : 'label', 'label' : 'label', 'children' : 'items', 'icon' : 'icon'}
          }
        ];
      }
    }
  },

  demoProps: {
    keys: {
      type: Object,
      defaultValue: {'id' : 'id', 'label' : 'label', 'children' : 'children', 'icon' : 'icon'},
      inputType: 'code:JSON',
      inputHelpText: '"Keys" defines the configuration for "Items"'
    },
    items: {
      type: Array,
      defaultValue: [{"label":"Leaf 0.0","id":"leaf-0-0"},{"label":"Leaf 0.1","id":"leaf-0-1"},{"label":"Leaf 0.2","id":"leaf-0-2"},{"label":"Branch 0.3","id":"branch-0-3","isSelectable":false,"children":[{"label":"Leaf 1.0","id":"leaf-1-0"},{"label":"Branch 1.1","id":"branch-1-1","children":[{"label":"Leaf 2.0","id":"leaf-2-0"},{"label":"Leaf 2.1","id":"leaf-2-1"},{"label":"Leaf 2.2","id":"leaf-2-2"},{"label":"Leaf 2.3","id":"leaf-2-3"}]},{"label":"Leaf 1.2","id":"leaf-1-2"},{"label":"Branch 1.3","id":"branch-1-3","children":[{"label":"Leaf 2.0","id":"leaf-2-0"},{"label":"Leaf 2.1","id":"leaf-2-1"},{"label":"Leaf 2.2","id":"leaf-2-2"},{"label":"Leaf 2.3","id":"leaf-2-3"},{"label":"Leaf 2.4","id":"leaf-2-4"},{"label":"Leaf 2.5","id":"leaf-2-5"},{"label":"Leaf 2.6","id":"leaf-2-6"},{"label":"Leaf 2.7","id":"leaf-2-7"},{"label":"Leaf 2.8","id":"leaf-2-8"}]},{"label":"Leaf 1.4","id":"leaf-1-4"},{"label":"Leaf 1.5","id":"leaf-1-5"},{"label":"Branch 1.6","id":"branch-1-6","children":[{"label":"Leaf 2.0","id":"leaf-2-0"},{"label":"Leaf 2.1","id":"leaf-2-1"},{"label":"Leaf 2.2","id":"leaf-2-2"},{"label":"Leaf 2.3","id":"leaf-2-3"},{"label":"Leaf 2.4","id":"leaf-2-4"},{"label":"Leaf 2.5","id":"leaf-2-5"},{"label":"Leaf 2.6","id":"leaf-2-6"},{"label":"Leaf 2.7","id":"leaf-2-7"},{"label":"Leaf 2.8","id":"leaf-2-8"},{"label":"Leaf 2.9","id":"leaf-2-9"}]}]},{"label":"Branch 0.4","id":"branch-0-4","children":[{"label":"Leaf 1.0","id":"leaf-1-0"},{"label":"Leaf 1.1","id":"leaf-1-1"},{"label":"Leaf 1.2","id":"leaf-1-2"},{"label":"Leaf 1.3","id":"leaf-1-3"},{"label":"Leaf 1.4","id":"leaf-1-4"},{"label":"Leaf 1.5","id":"leaf-1-5"},{"label":"Leaf 1.6","id":"leaf-1-6"},{"label":"Leaf 1.7","id":"leaf-1-7"},{"label":"Leaf 1.8","id":"leaf-1-8"}]},{"label":"Leaf 0.5","id":"leaf-0-5"},{"label":"Branch 0.6","id":"branch-0-6","children":[{"label":"Leaf 1.0","id":"leaf-1-0"},{"label":"Leaf 1.1","id":"leaf-1-1"},{"label":"Leaf 1.2","id":"leaf-1-2"},{"label":"Leaf 1.3","id":"leaf-1-3"},{"label":"Leaf 1.4","id":"leaf-1-4"},{"label":"Leaf 1.5","id":"leaf-1-5"}]},{"label":"Branch 0.7","id":"branch-0-7","children":[{"label":"Leaf 1.0","id":"leaf-1-0"},{"label":"Leaf 1.1","id":"leaf-1-1"},{"label":"Leaf 1.2","id":"leaf-1-2"},{"label":"Leaf 1.3","id":"leaf-1-3"},{"label":"Leaf 1.4","id":"leaf-1-4"},{"label":"Leaf 1.5","id":"leaf-1-5"}]},{"label":"Leaf 0.8","id":"leaf-0-8","isSelectable":false}],
      inputType: 'code:JSON'
    },
    multiActivate: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    multiSelect: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    disableBranchSelect: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    }
  }
});
