suite('single active/select', function(){

  let tree,
      leaf1,
      li1,
      branch2,
      li2,
      icon2,
      collapse2,
      branch3,
      li3,
      collapse3,
      leaf4,
      li4;

  suiteSetup(done => {
    tree =  Polymer.dom(document).querySelector('#px-tree');
    leaf1 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[0];
    li1 = leaf1.$$('li');
    branch2 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[1];
    li2 = branch2.$$('li');
    icon2 = branch2.$$('px-icon');
    collapse2 = branch2.$$('iron-collapse');
    branch3 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[2];
    li3 = branch3.$$('li');
    collapse3 = branch3.$$('iron-collapse');
    leaf4 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[3];
    li4 = leaf4.$$('li');
    flush(()=>{
      done();
    })
  });
  test('Properties and methods are intact', function(){
    assert.typeOf(tree.items,'array');
    assert.typeOf(tree.keys,'object');
    assert.typeOf(tree.multiActivate,'boolean');
    assert.typeOf(tree.multiSelect,'boolean');
    assert.typeOf(tree.activate,'function');
    assert.typeOf(tree.select,'function');
  });
  // test('Select a single leaf', function(done) {
  //   leaf1.addEventListener('click', function handler(e) {
  //     assert.isTrue(li1.classList.contains('selected'));
  //     assert.equal(tree.selected, leaf1.item);
  //     leaf1.removeEventListener('click', handler);
  //     tree.select(null);
  //     done();
  //   });
  //   leaf1.click();
  // });
  // test('Select/expand a single branch', function(done) {
  //   branch2.addEventListener('click', function handler(e) {
  //     assert.isTrue(li2.classList.contains('selected'));
  //     assert.isTrue(li2.classList.contains('active'));
  //     assert.isTrue(collapse2.opened);
  //     branch2.removeEventListener('click', handler);
  //     tree.select(null);
  //     tree.activate(null);
  //     done();
  //   });
  //   branch2.click();
  // });
  // test('Expand branch by clicking icon', function(done) {
  //   icon2.addEventListener('click', function handler(e) {
  //     window.setTimeout(function() {
  //       assert.isFalse(li2.classList.contains('selected'));
  //       assert.isTrue(li2.classList.contains('active'));
  //       assert.isTrue(collapse2.opened);
  //       icon2.removeEventListener('click', handler);
  //       tree.select(null);
  //       tree.activate(null);
  //       done();
  //     }, 50);
  //   });
  //   icon2.click();
  // });
  // test('Select/expand two branches, first should deselect/close', function(done) {
  //   branch3.addEventListener('click', function handler(e) {
  //     assert.isTrue(li3.classList.contains('selected'));
  //     assert.isTrue(li3.classList.contains('active'));
  //     assert.isTrue(collapse3.opened);
  //     assert.isFalse(li2.classList.contains('selected'));
  //     assert.isFalse(li2.classList.contains('active'));
  //     assert.isFalse(collapse2.opened);
  //     branch3.removeEventListener('click', handler);
  //     tree.select(null);
  //     tree.activate(null);
  //     done();
  //   });
  //   branch2.click();
  //   branch3.click();
  // });
  // test('Select/expand two branches with Cmd key, first should deselect/close', function(done) {
  //   var cmdClick = new MouseEvent('click', {"metaKey": true});
  //   branch3.addEventListener('click', function handler(e) {
  //     assert.isTrue(li3.classList.contains('selected'));
  //     assert.isTrue(li3.classList.contains('active'));
  //     assert.isTrue(collapse3.opened);
  //     assert.isFalse(li2.classList.contains('selected'));
  //     assert.isFalse(li2.classList.contains('active'));
  //     assert.isFalse(collapse2.opened);
  //     branch3.removeEventListener('click', handler);
  //     tree.select(null);
  //     tree.activate(null);
  //     done();
  //   });
  //   branch2.click();
  //   branch3.dispatchEvent(cmdClick);
  // });
  // test('Select/expand two branches with Ctrl key, first should deselect/close', function(done) {
  //   var ctrlClick = new MouseEvent('click', {"ctrlKey": true});
  //   branch3.addEventListener('click', function handler(e) {
  //     assert.isTrue(li3.classList.contains('selected'));
  //     assert.isTrue(li3.classList.contains('active'));
  //     assert.isTrue(collapse3.opened);
  //     assert.isFalse(li2.classList.contains('selected'));
  //     assert.isFalse(li2.classList.contains('active'));
  //     assert.isFalse(collapse2.opened);
  //     branch3.removeEventListener('click', handler);
  //     tree.select(null);
  //     tree.activate(null);
  //     done();
  //   });
  //   branch2.click();
  //   branch3.dispatchEvent(ctrlClick);
  // });
  // test('Select/expand two branches with Shift key, first should deselect/close', function(done) {
  //   var shiftClick = new MouseEvent('click', {"shiftKey": true});
  //   branch3.addEventListener('click', function handler(e) {
  //     assert.isTrue(li3.classList.contains('selected'));
  //     assert.isTrue(li3.classList.contains('active'));
  //     assert.isTrue(collapse3.opened);
  //     assert.isFalse(li2.classList.contains('selected'));
  //     assert.isFalse(li2.classList.contains('active'));
  //     assert.isFalse(collapse2.opened);
  //     branch3.removeEventListener('click', handler);
  //     tree.select(null);
  //     tree.activate(null);
  //     done();
  //   });
  //   branch2.click();
  //   branch3.dispatchEvent(shiftClick);
  // });
  // test('Clicking on a node with isSelectable false does nothing', function(done) {
  //   leaf4.addEventListener('click', function handler(e) {
  //     assert.isFalse(li4.classList.contains('selected'));
  //     leaf4.removeEventListener('click', handler);
  //     tree.select(null);
  //     tree.activate(null);
  //     done();
  //   });
  //   leaf4.click();
  // });
});

// suite('multi-active and multi-select', function(){
//   var tree = document.getElementById('px-multi-tree'),
//       leaf1 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[0],
//       li1 = leaf1.$$('li'),
//       leaf2 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[1],
//       li2 = leaf2.$$('li'),
//       leaf3 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[2],
//       li3 = leaf3.$$('li');
//   test('Properties and methods are intact', function(){
//     assert.typeOf(tree.selected,'array');
//     assert.typeOf(tree.active,'array');
//     assert.isTrue(tree.multiSelect);
//     assert.isTrue(tree.multiActivate);
//   });
//   test('Deselect a single leaf with Cmd', function(done) {
//     var cmdClick = new MouseEvent('click', {"metaKey": true});
//     leaf1.addEventListener('click', function handler(e) {
//       assert.isFalse(li1.classList.contains('selected'));
//       assert.notInclude(tree.selected, leaf1.item);
//       leaf1.removeEventListener('click', handler);
//       done();
//     });
//     tree.push('selected', tree.items[0]);
//     leaf1.dispatchEvent(cmdClick);
//   });
//   test('Deselect a single leaf with Ctrl', function(done) {
//     var ctrlClick = new MouseEvent('click', {"ctrlKey": true});
//     leaf1.addEventListener('click', function handler(e) {
//       assert.isFalse(li1.classList.contains('selected'));
//       assert.notInclude(tree.selected, leaf1.item);
//       leaf1.removeEventListener('click', handler);
//       done();
//     });
//     tree.push('selected', tree.items[0]);
//     leaf1.dispatchEvent(ctrlClick);
//   });
//   test('Select two different leaves with Cmd', function(done) {
//     var cmdClick = new MouseEvent('click', {"metaKey": true});
//     leaf2.addEventListener('click', function handler(e) {
//       assert.isTrue(li1.classList.contains('selected'));
//       assert.isTrue(li2.classList.contains('selected'));
//       leaf2.removeEventListener('click', handler);
//       tree.select(null);
//       done();
//     });
//     tree.select(leaf1.item);
//     leaf2.dispatchEvent(cmdClick);
//   });
//   test('Select two different leaves with Ctrl', function(done) {
//     var ctrlClick = new MouseEvent('click', {"ctrlKey": true});
//     leaf2.addEventListener('click', function handler(e) {
//       assert.isTrue(li1.classList.contains('selected'));
//       assert.isTrue(li2.classList.contains('selected'));
//       leaf2.removeEventListener('click', handler);
//       tree.select(null);
//       done();
//     });
//     tree.select(leaf1.item);
//     leaf2.dispatchEvent(ctrlClick);
//   });
//   test('Select three different leaves with Shift', function(done) {
//     var shiftClick = new MouseEvent('click', {"shiftKey": true});
//     leaf3.addEventListener('click', function handler(e) {
//       assert.isTrue(li1.classList.contains('selected'));
//       assert.isTrue(li2.classList.contains('selected'));
//       assert.isTrue(li3.classList.contains('selected'));
//       leaf3.removeEventListener('click', handler);
//       tree.select(null);
//       done();
//     });
//     tree.select(leaf1.item);
//     leaf3.dispatchEvent(shiftClick);
//   });
//   test('Select three different leaves with Shift (in reverse)', function(done) {
//     var shiftClick = new MouseEvent('click', {"shiftKey": true});
//     leaf1.addEventListener('click', function handler(e) {
//       assert.isTrue(li1.classList.contains('selected'));
//       assert.isTrue(li2.classList.contains('selected'));
//       assert.isTrue(li3.classList.contains('selected'));
//       leaf1.removeEventListener('click', handler);
//       tree.select(null);
//       done();
//     });
//     tree.select(leaf3.item);
//     leaf1.dispatchEvent(shiftClick);
//   });
// });
//
// suite('disable-branch-select', function() {
//   var tree = document.getElementById('px-disable-tree'),
//       branch1 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[0],
//       li1 = branch1.$$('li'),
//       collapse1 = branch1.$$('iron-collapse');
//   test('Expand but do not select branch', function(done) {
//     branch1.addEventListener('click', function handler(e) {
//       assert.isFalse(li1.classList.contains('selected'));
//       assert.isTrue(li1.classList.contains('active'));
//       assert.isTrue(collapse1.opened);
//       branch1.removeEventListener('click', handler);
//       tree.select(null);
//       tree.activate(null);
//       done();
//     });
//     branch1.click();
//   });
// });
