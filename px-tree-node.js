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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set.js';
import 'px-icon-set/px-icon.js';
import '@polymer/iron-collapse/iron-collapse.js';
import './px-tree-behavior.js';
import './css/px-tree-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

Polymer({
  _template: html`
    <style include="px-tree-styles"></style>

      <template is="dom-if" if="[[canOpen]]">
        <li class\$="tree__branch [[_getClass(isActive, isSelected, item, assetGraph)]]">
          <px-icon class="chevron" icon="[[_getIcon(isActive)]]"></px-icon>
          <template is="dom-if" if="[[icon]]">
            <px-icon class="icon" icon="[[icon]]"></px-icon>
          </template>
          <span>[[label]]</span>
        </li>
        <iron-collapse id="collapse" opened\$="[[isActive]]">
          <div class="collapse-content">
            <template is="dom-repeat" items="[[items]]" as="subitem">
              <px-tree-node label="[[_getItemProp(subitem, keys.label)]]" items="[[_getChildren(subitem, assetGraph, childrenUpdated)]]" item="[[subitem]]" keys="[[keys]]" active="[[active]]" active-meta="[[activeMeta]]" selected="[[selected]]" is-active="[[_isItemActive(active, activeMeta, subitem, multiActivate, active.*)]]" is-selected="[[_isItemSelected(selected, subitem, multiSelect, selected.*)]]" can-open="[[_hasChildren(subitem, assetGraph, childrenUpdated)]]" disable-branch-select="[[disableBranchSelect]]" multi-select="[[multiSelect]]" multi-activate="[[multiActivate]]" icon="[[_getItemProp(subitem, keys.icon)]]" asset-graph="[[assetGraph]]" children-updated="[[childrenUpdated]]">
              </px-tree-node>
            </template>
          </div>
        </iron-collapse>
      </template>
      <template is="dom-if" if="[[!canOpen]]">
        <li class\$="tree__leaf [[_getClass(isActive, isSelected, item, assetGraph)]]">
          <template is="dom-if" if="[[icon]]">
            <px-icon class="icon" icon="[[icon]]"></px-icon>
          </template>
          <span>[[label]]</span>
        </li>
      </template>
`,

  is:'px-tree-node',
  behaviors: [ PxTreeBehavior ],

  listeners: {
    'tap' : '_handleTap'
  },

  properties: {

    /**
     * Label to display in the body of the node.
     * Pulled from the `item` object for this node.
     */
    label: {
      type: String,
      value: ''
    },

    /**
     * Whether or not the node can be expanded to display children.
     * Calculated from the `item` object for this node.
     */
    canOpen: {
      type: Boolean,
      value: false
    },

    /**
     * An object reference for the item associated with the node.
     * Passed down recursively from the parent px-tree or parent px-tree-node.
     */
    item: {
      type: Object,
      value: function() { return {}; }
    },

    /**
     * The array of child items associated with this px-tree-node.
     * Pulled from the `item` object for this node.
     */
    items: {
      type: Array,
      value: function() { return []; }
    },

    /**
     * Whether or not the node is currently expanded (activated).
     * Calculated from the activated logic of the overall tree.
     */
    isActive: {
      type: Boolean,
      value: false
    },

    /**
     * Whether or not the node is currently selected.
     * Calculated from the selected logic of the overall tree.
     */
    isSelected: {
      type: Boolean,
      value: false
    },

    /**
     * Changes the item properties (keys) that will be used
     * internally to find each item's unique id, label, children list, and icon.
     * Passed down recursively from the parent px-tree or parent px-tree-node.
     */
    keys: {
      type: Object,
      value: function() { return {}; }
    },

    /**
     * Whether or not multiple nodes can be selected at a time.
     * Passed down recursively from the parent px-tree or parent px-tree-node.
     */
    multiSelect: {
      type: Boolean,
      value: false
    },

    /**
     * Whether or not multiple nodes can be expanded (activated) at a time.
     * Passed down recursively from the parent px-tree or parent px-tree-node.
     */
    multiActivate: {
      type: Boolean,
      value: false
    },

    /**
     * The icon to display next to this particular node in the tree.
     * Scraped from the `item` object for this node.
     */
    icon: {
      type: String,
      value: ''
    },

    /**
     * Internal boolean that is flipped when children are updated in the asset
     * graph, triggering data binding to show them in the tree.
     */
    childrenUpdated: {
      type: Boolean,
      value: null
    }
  },

  /**
   * Calculates whether to display the chevron for an expanded node
   * or a collapsed node given the current active path.
   */
  _getIcon: function(isActive) {
    return isActive ? "px-utl:chevron" : "px-utl:chevron-right";
  },

  /**
   * Determines which class (active/selected/both) should be present on the node.
   */
  _getClass: function(isActive, isSelected, item, assetGraph) {
    if (! (isActive === undefined || isSelected === undefined || item === undefined || assetGraph === undefined)) {
      var classList = [];
      if(isActive) {
        classList.push('active');
      }
      if(isSelected) {
        classList.push('selected');
      }
      if(!assetGraph.isSelectable(item)) {
        classList.push('disabled');
      }
      return classList.join(' ');
    }
  },

  /**
   * Event handler for tap events. Determines whether a node should be
   * selected, toggled, or both; and fires events to the tree accordingly.
   */
  _handleTap: function(evt) {
    evt.stopPropagation();
    var path = dom(evt).path,
        shift = dom(evt).event.detail.sourceEvent.shiftKey,
        ctrl = dom(evt).event.detail.sourceEvent.ctrlKey || dom(evt).event.detail.sourceEvent.metaKey,
        isIcon = path[0].nodeName === 'PX-ICON';

    this.fire('px-tree-node-tapped', {shift, ctrl, item:this.item, isBranch: this.canOpen, isActive:this.isActive, isSelected:this.isSelected, isIcon}, {cancelable:true});
  }
});
