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
/**
### Usage
```
  <px-tree items='[{"label":"Label","id":"label001","icon":"px-utl:confirmed","children":[{"label":"Child","id":"child001"}]}]'></px-tree>
```

### Styling
The following custom properties are available for styling:

Custom property | Description
:----------------|:-------------
`--px-tree-text-color--hover` | Text color for hovered tree nodes
`--px-tree-background-color--hover` | Background color for hovered tree nodes
`--px-tree-text-color--selected` | Text color for selected tree nodes
`--px-tree-background-color--selected` | Background color for selected tree nodes
`--px-tree-text-color--disabled` | Text color for non-selectable / disabled nodes

@element px-tree
@blurb Generic tree component
@homepage index.html
@demo index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-app-helpers/px-app-asset/px-app-asset-behavior-graph.js';
import 'px-app-helpers/px-app-asset/px-app-asset-behavior-selectable.js';
import 'px-app-helpers/px-app-asset/px-app-asset-behavior-activatable.js';
import './css/px-tree-styles.js';
import './px-tree-node.js';
import './px-tree-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="px-tree-styles"></style>

    <ul>
      <template is="dom-repeat" items="[[__rootItems]]">
        <px-tree-node label="[[_getItemProp(item, keys.label)]]" items="[[_getChildren(item, _assetGraph, _childrenUpdated)]]" item="[[item]]" keys="[[keys]]" is-active="[[_isItemActive(active, activeMeta, item, multiActivate, active.*)]]" is-selected="[[_isItemSelected(selected, item, multiSelect, selected.*)]]" active="[[active]]" active-meta="[[activeMeta]]" selected="[[selected]]" can-open="[[_hasChildren(item, _assetGraph, _childrenUpdated)]]" disable-branch-select="[[disableBranchSelect]]" multi-select="[[multiSelect]]" multi-activate="[[multiActivate]]" icon="[[_getItemProp(item, keys.icon)]]" children-updated="[[_childrenUpdated]]" asset-graph="[[_assetGraph]]">
        </px-tree-node>
      </template>
    </ul>
`,

  is:'px-tree',

  behaviors: [
    PxAppBehavior.AssetGraph,
    PxAppBehavior.AssetSelectable,
    PxAppBehavior.AssetActivatable,
    PxTreeBehavior
  ],

  listeners: {
    'px-tree-node-tapped' : '_handleNodeTapped',
    'px-app-asset-children-updated' : '_handleChildrenUpdated'
  },

  properties: {
    /**
     * If set to true, multiple nodes can be selected at the same time in the tree
     * by using the shift key (for selecting a range) or the ctrl/cmd key (for selecting individual nodes).
     */
    multiSelect: {
      type: Boolean,
      value: false,
      observer: '_toggleMultiSelect'
    },
    /**
     * If set to true, multiple nodes can be activated (expanded) at the same time.
     * If set to false, expanding a node will cause other nodes to automatically collapse.
     */
    multiActivate: {
      type: Boolean,
      value: false,
      observer: '_toggleMultiActivate'
    },
    /**
     * If set to true, branches (nodes with children) will not be selectable.
     * Clicking on a branch will still cause it to become active (expand), but it
     * will not be added to the selected property.
     */
    disableBranchSelect: {
      type: Boolean,
      value: false
    },
    /**
     * Internal boolean that is flipped when children are updated in the asset
     * graph, triggering data binding to show them in the tree.
     */
    _childrenUpdated: {
      type: Boolean,
      value: null
    }
  },

  _handleChildrenUpdated: function(e) {
    this._childrenUpdated = true;
    this._childrenUpdated = false;
  },

  _handleNodeTapped: function(e) {
    const {shift, ctrl, item, isBranch, isActive, isSelected, isIcon} = e.detail;
    if(isBranch && !isActive) {
      this.activate(item);
    }
    if(isBranch && isActive) {
      if(!this.multiActivate) {
        this.activate(this._assetGraph.getInfo(item).parent);
      }
      else {
        this.deactivate(item);
      }
    }
    if(isBranch && this.disableBranchSelect || isIcon || !this._assetGraph.isSelectable(item)) return;
    if(isSelected && (ctrl || shift)) {
      this.deselect(item);
      return;
    }
    if(!ctrl && !shift) {
      this.select(null);
    }
    if(this.multiSelect && shift) {
      var index1 = this._assetGraph.getInfo(item).siblings.indexOf(item),
          index2 = this._assetGraph.getInfo(item).siblings.indexOf(this._lastSelection.item);
      if(index2 > -1 && index2 < index1) {
        this._assetGraph.getInfo(item).siblings.slice(index2+1, index1+1).forEach(function(item) {
          this.select(item);
        }.bind(this));
      }
      else if(index2 > -1) {
        this._assetGraph.getInfo(item).siblings.slice(index1, index2).forEach(function(item) {
          this.select(item);
        }.bind(this));
      }
    }
    else {
      this.select(item);
    }
  }
});
