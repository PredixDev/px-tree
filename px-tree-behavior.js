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
window.PxTreeBehavior = (window.PxTreeBehavior || {});

/**
 *
 * @polymerBehavior PxTreeBehavior
 */
PxTreeBehavior = {
  properties: {
    /**
     * When set to true, branches (nodes with children) can be expanded/collapsed,
     * but not selected. Only leaves (nodes with no children) will be selectable.
     */
    disableBranchSelect: {
      type: Boolean,
      value: false
    }
  },
  /**
   * Determines if an item has children nodes from the asset graph.
   */
  _hasChildren: function(item, assetGraph) {
    if (!assetGraph) return;
    return assetGraph.hasChildren(item);
  },
  /**
   * Fetches the item's child nodes from the asset graph.
   */
  _getChildren: function(item, assetGraph) {
    if (!assetGraph) return;
    return assetGraph.getChildren(item);
  },
  /**
   * Fetches an item's property at the configured key. Used to dynamically
   * fetch the item's label, icon, children, etc. based on the configured
   * `keys` for the app.
   */
  _getItemProp(item, key) {
    return item[key];
  },
  /**
   * Calculates whether the specified item is present in the active path.
   */
  _isItemActive: function(active, activeMeta, item, multiActivate) {
    if(this.multiActivate && Array.isArray(active)) {
      return active.indexOf(item) > -1;
    }
    else {
      return activeMeta && activeMeta.path && activeMeta.path.indexOf(item) > -1;
    }
  },
  /**
   * Determines whether the specified item is currently selected.
   */
  _isItemSelected: function(selected, item, multiSelect) {
    if(this.multiSelect && typeof selected === 'object' && Array.isArray(selected)) {
      return selected.indexOf(item) > -1;
    }
    else {
      return selected === item;
    }
  }
};
