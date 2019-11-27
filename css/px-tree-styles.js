const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="px-tree-styles">
<template>
<style>
li,ul{list-style:none;padding:0;margin:0;line-height:1.8rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.tree__branch:hover,.tree__leaf:hover{color:var(--px-tree-text-color--hover,#000);background-color:var(--px-tree-background-color--hover,#d3d3d3)}.tree__branch.selected,.tree__leaf.selected{color:var(--px-tree-text-color--selected,#fff);background-color:var(--px-tree-background-color--selected,gray)}.tree__branch.disabled,.tree__leaf.disabled{color:var(--px-tree-text-color--disabled,gray)}.tree__leaf{padding-left:1.75rem}.chevron,.icon{--iron-icon-width:1rem;--iron-icon-height:1rem;margin-left:.25rem;margin-right:.25rem}.collapse-content{padding-left:1.5rem}
</style>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

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
;
