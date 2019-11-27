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
/* Import peer demo pages */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-collection.js';
import './px-tree-demo.js';
import './px-tree-node-demo.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Demo list / deck selector -->
    <px-demo-collection demos="{{demos}}"></px-demo-collection>
`,

  is: 'local-element-demo',

  properties: {

    demos: {
      type: Array,
      value: function(){
        return [
          { name: "px-tree",
            tagName: "px-tree-demo" },
          { name: "px-tree-node",
            tagName: "px-tree-node-demo" }
        ]
      }
    },

    chosenDemoName: {
      type: String
    }
  }
});
