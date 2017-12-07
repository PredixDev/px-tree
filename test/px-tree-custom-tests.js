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

  setup(done => {
    tree =  fixture("px-tree-fixture");
    flush(()=>{
      leaf1 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[0];
      li1 = Polymer.dom(leaf1.root).querySelector('li');
      branch2 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[1];
      li2 = Polymer.dom(branch2.root).querySelector('li');
      icon2 = Polymer.dom(branch2.root).querySelector('px-icon');
      collapse2 = Polymer.dom(branch2.root).querySelector('iron-collapse');
      branch3 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[2];
      li3 = Polymer.dom(branch3.root).querySelector('li');
      collapse3 = Polymer.dom(branch3.root).querySelector('iron-collapse');
      leaf4 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[3];
      li4 = Polymer.dom(leaf4.root).querySelector('li');
      done();
    });
  });
  test('Properties and methods are intact', function(){
    assert.typeOf(tree.items,'array');
    assert.typeOf(tree.keys,'object');
    assert.typeOf(tree.multiActivate,'boolean');
    assert.typeOf(tree.multiSelect,'boolean');
    assert.typeOf(tree.activate,'function');
    assert.typeOf(tree.select,'function');
  });
  test('Select a single leaf', function(done) {
    leaf1.addEventListener('click', function handler(e) {
      assert.isTrue(li1.classList.contains('selected'));
      assert.equal(tree.selected, leaf1.item);
      leaf1.removeEventListener('click', handler);
      done();
    });
    leaf1.click();
  });
  test('Select/expand a single branch', function(done) {
    branch2.addEventListener('click', function handler(e) {
      assert.isTrue(li2.classList.contains('selected'));
      assert.isTrue(li2.classList.contains('active'));
      assert.isTrue(collapse2.opened);
      branch2.removeEventListener('click', handler);
      done();
    });
    branch2.click();
  });
  // test('Expand branch by clicking icon', function(done) {
  //   icon2.click();
  //   flush(function() {
  //     assert.isFalse(li2.classList.contains('selected'));
  //     assert.isTrue(li2.classList.contains('active'));
  //     assert.isTrue(collapse2.opened);
  //     done();
  //   });
  // });
  test('Select/expand two branches, first should deselect/close', function(done) {
    branch3.addEventListener('click', function handler(e) {
      assert.isTrue(li3.classList.contains('selected'));
      assert.isTrue(li3.classList.contains('active'));
      assert.isTrue(collapse3.opened);
      assert.isFalse(li2.classList.contains('selected'));
      assert.isFalse(li2.classList.contains('active'));
      assert.isFalse(collapse2.opened);
      branch3.removeEventListener('click', handler);
      done();
    });
    branch2.click();
    branch3.click();
  });
  test('Select/expand two branches with Cmd key, first should deselect/close', function(done) {
    var cmdClick = new MouseEvent('click', {"metaKey": true});
    branch3.addEventListener('click', function handler(e) {
      assert.isTrue(li3.classList.contains('selected'));
      assert.isTrue(li3.classList.contains('active'));
      assert.isTrue(collapse3.opened);
      assert.isFalse(li2.classList.contains('selected'));
      assert.isFalse(li2.classList.contains('active'));
      assert.isFalse(collapse2.opened);
      branch3.removeEventListener('click', handler);
      done();
    });
    branch2.click();
    branch3.dispatchEvent(cmdClick);
  });
  test('Select/expand two branches with Ctrl key, first should deselect/close', function(done) {
    var ctrlClick = new MouseEvent('click', {"ctrlKey": true});
    branch3.addEventListener('click', function handler(e) {
      assert.isTrue(li3.classList.contains('selected'));
      assert.isTrue(li3.classList.contains('active'));
      assert.isTrue(collapse3.opened);
      assert.isFalse(li2.classList.contains('selected'));
      assert.isFalse(li2.classList.contains('active'));
      assert.isFalse(collapse2.opened);
      branch3.removeEventListener('click', handler);
      done();
    });
    branch2.click();
    branch3.dispatchEvent(ctrlClick);
  });
  test('Select/expand two branches with Shift key, first should deselect/close', function(done) {
    var shiftClick = new MouseEvent('click', {"shiftKey": true});
    branch3.addEventListener('click', function handler(e) {
      assert.isTrue(li3.classList.contains('selected'));
      assert.isTrue(li3.classList.contains('active'));
      assert.isTrue(collapse3.opened);
      assert.isFalse(li2.classList.contains('selected'));
      assert.isFalse(li2.classList.contains('active'));
      assert.isFalse(collapse2.opened);
      branch3.removeEventListener('click', handler);
      done();
    });
    branch2.click();
    branch3.dispatchEvent(shiftClick);
  });
  test('Clicking on a node with isSelectable false does nothing', function(done) {
    leaf4.addEventListener('click', function handler(e) {
      assert.isFalse(li4.classList.contains('selected'));
      leaf4.removeEventListener('click', handler);
      done();
    });
    leaf4.click();
  });
});

suite('multi-active and multi-select', function(){
  let tree, leaf1, li1, leaf2, li2, leaf3, li3;

  setup(function(done) {
    tree = fixture('px-multi-tree');
    flush(()=>{
      leaf1 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[0];
      li1 = Polymer.dom(leaf1.root).querySelector('li');
      leaf2 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[1];
      li2 = Polymer.dom(leaf2.root).querySelector('li');
      leaf3 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[2];
      li3 = Polymer.dom(leaf3.root).querySelector('li');
      done();
    });
  });

  test('Properties and methods are intact', function(){
    assert.typeOf(tree.selected,'array');
    assert.typeOf(tree.active,'array');
    assert.isTrue(tree.multiSelect);
    assert.isTrue(tree.multiActivate);
  });
  test('Deselect a single leaf with Cmd', function(done) {
    var cmdClick = new MouseEvent('click', {"metaKey": true});
    leaf1.addEventListener('click', function handler(e) {
      assert.isFalse(li1.classList.contains('selected'));
      assert.notInclude(tree.selected, leaf1.item);
      leaf1.removeEventListener('click', handler);
      done();
    });
    tree.push('selected', tree.items[0]);
    leaf1.dispatchEvent(cmdClick);
  });
  test('Deselect a single leaf with Ctrl', function(done) {
    var ctrlClick = new MouseEvent('click', {"ctrlKey": true});
    leaf1.addEventListener('click', function handler(e) {
      assert.isFalse(li1.classList.contains('selected'));
      assert.notInclude(tree.selected, leaf1.item);
      leaf1.removeEventListener('click', handler);
      done();
    });
    tree.push('selected', tree.items[0]);
    leaf1.dispatchEvent(ctrlClick);
  });
  test('Select two different leaves with Cmd', function(done) {
    var cmdClick = new MouseEvent('click', {"metaKey": true});
    leaf2.addEventListener('click', function handler(e) {
      assert.isTrue(li1.classList.contains('selected'));
      assert.isTrue(li2.classList.contains('selected'));
      leaf2.removeEventListener('click', handler);
      done();
    });
    tree.select(leaf1.item);
    leaf2.dispatchEvent(cmdClick);
  });
  test('Select two different leaves with Ctrl', function(done) {
    var ctrlClick = new MouseEvent('click', {"ctrlKey": true});
    leaf2.addEventListener('click', function handler(e) {
      assert.isTrue(li1.classList.contains('selected'));
      assert.isTrue(li2.classList.contains('selected'));
      leaf2.removeEventListener('click', handler);
      done();
    });
    tree.select(leaf1.item);
    leaf2.dispatchEvent(ctrlClick);
  });
  test('Select three different leaves with Shift', function(done) {
    var shiftClick = new MouseEvent('click', {"shiftKey": true});
    leaf3.addEventListener('click', function handler(e) {
      assert.isTrue(li1.classList.contains('selected'));
      assert.isTrue(li2.classList.contains('selected'));
      assert.isTrue(li3.classList.contains('selected'));
      leaf3.removeEventListener('click', handler);
      done();
    });
    tree.select(leaf1.item);
    leaf3.dispatchEvent(shiftClick);
  });
  test('Select three different leaves with Shift (in reverse)', function(done) {
    var shiftClick = new MouseEvent('click', {"shiftKey": true});
    leaf1.addEventListener('click', function handler(e) {
      assert.isTrue(li1.classList.contains('selected'));
      assert.isTrue(li2.classList.contains('selected'));
      assert.isTrue(li3.classList.contains('selected'));
      leaf1.removeEventListener('click', handler);
      done();
    });
    tree.select(leaf3.item);
    leaf1.dispatchEvent(shiftClick);
  });
});

suite('disable-branch-select', function() {
  let tree, branch1, li1, collapse1;
  setup(function(done) {
    tree = fixture('px-disable-tree');
    flush(()=>{
      branch1 = Polymer.dom(tree.root).querySelectorAll('px-tree-node')[0];
      li1 = Polymer.dom(branch1.root).querySelector('li');
      collapse1 = Polymer.dom(branch1.root).querySelector('iron-collapse');
      done();
    });
  });
  test('Expand but do not select branch', function(done) {
    branch1.addEventListener('click', function handler(e) {
      assert.isFalse(li1.classList.contains('selected'));
      assert.isTrue(li1.classList.contains('active'));
      assert.isTrue(collapse1.opened);
      branch1.removeEventListener('click', handler);
      done();
    });
    branch1.click();
  });
});
