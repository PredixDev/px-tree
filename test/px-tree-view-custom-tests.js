/*global px_tree_view */

function getnodes(level){
  var child,
  nodes=[];

  if (!level){
    level = 0;
  }

  for(var i=0; i<4; i++){
    child={ "label":"Label "+level+'.'+i };

    if (!level && i===2){
      child.items=getnodes(level+1);
    }

    nodes.push(child);
  }

  return nodes;
}

function runCustomTests(){
  suite('<px-tree-view>', function(){
    test('Property and methods are intact', function(){
      assert.typeOf(px_tree_view.selected,'array');
      assert.typeOf(px_tree_view.items,'array');
      assert.typeOf(px_tree_view.nodes,'function');
      assert.typeOf(px_tree_view.insert,'function');
      assert.typeOf(px_tree_view.remove,'function');
      assert.typeOf(px_tree_view.flush,'function');
      assert.typeOf(px_tree_view.expand,'function');
      assert.typeOf(px_tree_view.collapse,'function');
      assert.typeOf(px_tree_view.toggle,'function');
      assert.typeOf(px_tree_view.select,'function');
      assert.typeOf(px_tree_view.deselect,'function');
      assert.typeOf(px_tree_view.enable,'function');
      assert.typeOf(px_tree_view.disable,'function');
    });


    suite('Inserts individual leafs and branches', function(){
      test('Inserts a leaf', function(done){
        px_tree_view.insert({ "label":"Leaf" });

        setTimeout(function(){
          assert.equal(px_tree_view.items.length, 1);
          assert.equal(px_tree_view._childnodes.length, 1);
          assert.equal(px_tree_view.nodes(0).is,'px-tree-view-leaf');
          
          px_tree_view.flush();
          done();
        });
      });

      test('Inserts a branch', function(done){
        px_tree_view.insert({ "label":"Branch", "items":[ { "label":"Branch Child" } ] });
        
        setTimeout(function(){
          assert.equal(px_tree_view.items.length, 1);
          assert.equal(px_tree_view._childnodes.length, 1);
          assert.equal(px_tree_view.nodes(0).is,'px-tree-view-branch');
          
          px_tree_view.flush();
          done();
        });
      });

      test('Inserts a leaf after the first node', function(done){
        px_tree_view.insert(getnodes());

        px_tree_view.insert({ "label":"Injected" },0);
        
        setTimeout(function(){
          assert.equal(px_tree_view.nodes(1).label, 'Injected');

          px_tree_view.flush();
          done();
        });
      });

      test('Inserts many leafs after the first node', function(done){
        px_tree_view.insert(getnodes());

        px_tree_view.insert([{ "label":"Injected 1" },{ "label":"Injected 2" }],0);
        
        setTimeout(function(){
          assert.equal(px_tree_view.nodes(1).label, 'Injected 1');
          assert.equal(px_tree_view.nodes(2).label, 'Injected 2');

          px_tree_view.flush();
          done();
        });
      });
    });

    suite('Removes individual leafs and branches', function(){
      test('Removes a leaf', function(done){
        px_tree_view.insert({ "label":"Leaf" });
        
        setTimeout(function(){
          assert.equal(px_tree_view.items.length, 1);
          assert.equal(px_tree_view._childnodes.length, 1);

          px_tree_view.remove(0);

          setTimeout(function(){
            assert.equal(px_tree_view.items.length, 0);
            assert.equal(px_tree_view._childnodes.length, 0);
            
            px_tree_view.flush();
            done();
          });
        });
      });

      test('Removes a branch', function(done){
        px_tree_view.insert({ "label":"Leaf", "items":[] });
        
        setTimeout(function(){
          assert.equal(px_tree_view.items.length, 1);
          assert.equal(px_tree_view._childnodes.length, 1);

          px_tree_view.remove(0);

          setTimeout(function(){
            assert.equal(px_tree_view.items.length, 0);
            assert.equal(px_tree_view._childnodes.length, 0);
            
            px_tree_view.flush();
            done();
          });
        });
      });
    });

    suite('Inserts many leafs and branches', function() {
      test('Inserts children', function(done){
        px_tree_view.insert(getnodes());
        assert.equal(px_tree_view.items.length, 4);

        setTimeout(function(){
          assert.equal(px_tree_view._childnodes.length, 4);
          assert.equal(px_tree_view.nodes(0).is,'px-tree-view-leaf');
          assert.equal(px_tree_view.nodes(1).is,'px-tree-view-leaf');
          assert.equal(px_tree_view.nodes(2).is,'px-tree-view-branch');
          assert.equal(px_tree_view.nodes(3).is,'px-tree-view-leaf');

          px_tree_view.flush();
          done();
        });
      });
    });

    suite('Flushes the tree', function() {
      test('Removes all children', function(done){
        px_tree_view.insert(getnodes());
          
        setTimeout(function(){
          px_tree_view.flush();

          setTimeout(function(){
            assert.equal(px_tree_view.selected.length, 0);
            assert.equal(px_tree_view.items.length, 0);
            assert.equal(px_tree_view._childnodes.length, 0);
            
            done();
          });
        });
      });
    });

    suite('Toggles a single branch', function(){
      test('Expands a branch', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var branch = px_tree_view.nodes(2);

          assert.equal(branch.is,'px-tree-view-branch');
          branch.expand();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(branch.expanded, true);
          
          px_tree_view.flush();
          done();
        });
      });

      test('Collapses a branch', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var branch = px_tree_view.nodes(2);

          assert.equal(branch.is,'px-tree-view-branch');
          branch.collapse();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(branch.expanded, undefined);
          
          px_tree_view.flush();
          done();
        });
      });
    });

    suite('Toggles a single branch', function(){
      test('Expands a branch', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var branch = px_tree_view.nodes(2);

          assert.equal(branch.is,'px-tree-view-branch');
          branch.expand();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(branch.expanded, true);
          
          px_tree_view.flush();
          done();
        });
      });

      test('Collapses a branch', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var branch = px_tree_view.nodes(2);

          assert.equal(branch.is,'px-tree-view-branch');
          branch.collapse();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(branch.expanded, undefined);
          
          px_tree_view.flush();
          done();
        });
      });

      test('Toggles a branch state', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var branch = px_tree_view.nodes(2);

          assert.equal(branch.is,'px-tree-view-branch');
          branch.toggle();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(branch.expanded, true);

          branch.toggle();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(branch.expanded, false);          
          
          px_tree_view.flush();
          done();
        });
      });

      test('Toggles all branch states', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          px_tree_view.toggle();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(px_tree_view.nodes(2).expanded, true);

          px_tree_view.toggle();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(px_tree_view.nodes(2).expanded, false);          
          
          px_tree_view.flush();
          done();
        });
      });
    });

    suite('Selects & deselects a single node', function(){
      test('Select a branch', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var branch = px_tree_view.nodes(2);

          assert.equal(branch.is,'px-tree-view-branch');
          branch.select();

          assert.equal(px_tree_view.selected.length, 1);
          assert.equal(branch.selected, true);
          
          px_tree_view.flush();
          done();
        });
      });

      test('Deselects a branch', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var branch = px_tree_view.nodes(2);

          assert.equal(branch.is,'px-tree-view-branch');
          branch.select();

          setTimeout(function(){
            assert.equal(px_tree_view.selected.length, 1);
            assert.equal(branch.selected, true);
            branch.deselect();

            setTimeout(function(){
              assert.equal(px_tree_view.selected.length, 0);
              assert.equal(branch.selected, false);
              
              px_tree_view.flush();
              done();
            });
          });
        });
      });

      test('Select a leaf', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          var leaf = px_tree_view.nodes(0);

          assert.equal(leaf.is,'px-tree-view-leaf');
          leaf.select();

          setTimeout(function(){
            assert.equal(px_tree_view.selected.length, 1);
            assert.equal(leaf.selected, true);
            
            px_tree_view.flush();
            done();
          });
        });
      });

      test('Deselects a leaf', function(done){
        px_tree_view.insert(getnodes());
        
        setTimeout(function(){
          var leaf = px_tree_view.nodes(0);

          assert.equal(leaf.is,'px-tree-view-leaf');
          leaf.deselect();

          setTimeout(function(){
            assert.equal(px_tree_view.selected.length, 0);
            assert.equal(leaf.selected, false);
            
            px_tree_view.flush();
            done();
          });
        });
      });
    });


    suite('Selects & deselects a multiple nodes', function(){
      test('Select a single node node', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          px_tree_view.select(0);

          assert.equal(px_tree_view.selected.length, 1);
          assert.equal(px_tree_view.nodes(0).selected, true);
          
          px_tree_view.flush();
          done();
        });
      });

      test('Select several nodes', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          px_tree_view.select([0,2,3]);

          assert.equal(px_tree_view.selected.length, 3);
          assert.equal(px_tree_view.nodes(0).selected, true);
          assert.equal(px_tree_view.nodes(2).selected, true);
          assert.equal(px_tree_view.nodes(3).selected, true);
          
          px_tree_view.flush();
          done();
        });
      });

      test('Deselect one of the nodes', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          px_tree_view.select([0,2,3]);
          px_tree_view.deselect(2);

          assert.equal(px_tree_view.selected.length, 2);
          assert.equal(px_tree_view.nodes(0).selected, true);
          assert.equal(px_tree_view.nodes(2).selected, false);
          assert.equal(px_tree_view.nodes(3).selected, true);
          
          px_tree_view.flush();
          done();
        });
      });

      test('Deselects all of the nodes', function(done){
        px_tree_view.insert(getnodes());

        setTimeout(function(){
          px_tree_view.select([0,2,3]);
          px_tree_view.deselect();

          assert.equal(px_tree_view.selected.length, 0);
          assert.equal(px_tree_view.nodes(0).selected, false);
          assert.equal(px_tree_view.nodes(2).selected, false);
          assert.equal(px_tree_view.nodes(3).selected, false);
          
          px_tree_view.flush();
          done();
        });
      });
    });



    suite('<px-tree-view> Events', function(){
      test('Fires <insert> event', function(done){
        function fn(e){
          console.log('asdf');
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');

          done();

          px_tree_view.removeEventListener('insert', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('insert', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
      });


      test('Fires <flush> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
           
          done();

          px_tree_view.removeEventListener('flush', fn);
        }

        px_tree_view.addEventListener('flush', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        px_tree_view.flush();
      });

      
      test('Fires <remove> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          
          done();

          px_tree_view.removeEventListener('remove', fn);
        }

        px_tree_view.addEventListener('remove', fn);
        
        setTimeout(function(){
          px_tree_view.insert({ "label":"Label", "foo":"bar" });
          px_tree_view.remove(0);
        });
      });
    });
  });
  



  suite('<px-tree-view-branch>', function(){
    test('Property and methods are intact', function(done){
      px_tree_view.flush();
      px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });

      setTimeout(function(){
        var branch=px_tree_view.nodes(0);

        assert.equal(branch.is, 'px-tree-view-branch');
        assert.typeOf(branch.label,'string');
        assert.typeOf(branch.items,'array');
        assert.typeOf(branch.nodes,'function');
        assert.typeOf(branch.insert,'function');
        assert.typeOf(branch.remove,'function');
        assert.typeOf(branch.flush,'function');
        assert.typeOf(branch.expand,'function');
        assert.typeOf(branch.collapse,'function');
        assert.typeOf(branch.toggle,'function');
        assert.typeOf(branch.select,'function');
        assert.typeOf(branch.deselect,'function');
        assert.typeOf(branch.enable,'function');
        assert.typeOf(branch.disable,'function');

        px_tree_view.flush();
        done();
      });
    });

    suite('<px-tree-view-branch> Events', function(){
      test('Fires <insert> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          
          done();

          px_tree_view.removeEventListener('insert', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('insert', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
      });


      test('Fires <remove> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          
          done();

          px_tree_view.removeEventListener('remove', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('remove', fn);

        setTimeout(function(){
          px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
          px_tree_view.nodes(0).remove();
        });
      });


      test('Fires <select> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,true);

          done();

          px_tree_view.removeEventListener('select', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('select', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        px_tree_view.select(0);
      });


      test('Fires <branch.select> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,true);

          done();

          px_tree_view.removeEventListener('branch.select', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('branch.select', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.select(0);
        });
      });


      test('Fires <deselect> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,false);

          done();

          px_tree_view.removeEventListener('deselect', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('deselect', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.select(0).deselect(0);
        });
      });


      test('Fires <branch.deselect> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,false);

          done();

          px_tree_view.removeEventListener('branch.deselect', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('branch.deselect', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.select(0).deselect(0);
        });
      });


      test('Fires <toggle> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).expanded,true);

          done();

          px_tree_view.removeEventListener('toggle', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('toggle', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.toggle(0);
        });
      });


      test('Fires <expand> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).expanded,true);

          done();

          px_tree_view.removeEventListener('expand', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('expand', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.expand(0);
        });
      });


      test('Fires <collapse> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).expanded,false);

          done();

          px_tree_view.removeEventListener('collapse', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('collapse', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.expand(0).collapse(0);
        });
      });


      test('Fires <empty> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');

          done();

          px_tree_view.removeEventListener('empty', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('empty', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.expand(0);
        });
      });


      test('Fires <disable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,true);

          done();

          px_tree_view.removeEventListener('disable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('disable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.disable(0);
        });
      });


      test('Fires <branch.disable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,true);

          done();

          px_tree_view.removeEventListener('branch.disable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('branch.disable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.disable(0);
        });
      });


      test('Fires <enable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,false);

          done();

          px_tree_view.removeEventListener('enable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('enable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.disable(0).enable(0);
        });
      });


      test('Fires <branch.enable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,false);

          done();

          px_tree_view.removeEventListener('branch.enable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('branch.enable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar", "items":[] });
        
        setTimeout(function(){
          px_tree_view.disable(0).enable(0);
        });
      });
    });
  });




  suite('<px-tree-view-leaf>', function(){
    test('Property and methods are intact', function(done){
      px_tree_view.flush();
      px_tree_view.insert({ "label":"Label", "foo":"bar" });

      setTimeout(function(){
        var leaf=px_tree_view.nodes(0);

        assert.equal(leaf.is, 'px-tree-view-leaf');
        assert.typeOf(leaf.label,'string');
        assert.typeOf(leaf.remove,'function');
        assert.typeOf(leaf.select,'function');
        assert.typeOf(leaf.deselect,'function');
        assert.typeOf(leaf.enable,'function');
        assert.typeOf(leaf.disable,'function');

        done();
        px_tree_view.flush();
      });
    });


    suite('<px-tree-view-leaf> Events', function(){
      test('Fires <remove> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          
          done();

          px_tree_view.removeEventListener('remove', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('remove', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });

        setTimeout(function(){
          px_tree_view.nodes(0).remove();
        });
      });


      test('Fires <select> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,true);

          done();

          px_tree_view.removeEventListener('select', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('select', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.select(0);
        });
      });


      test('Fires <leaf.select> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,true);

          done();

          px_tree_view.removeEventListener('leaf.select', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('leaf.select', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.select(0);
        });
      });


      test('Fires <deselect> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,false);

          done();

          px_tree_view.removeEventListener('deselect', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('deselect', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.select(0).deselect(0);
        });
      });


      test('Fires <leaf.deselect> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).selected,false);

          done();

          px_tree_view.removeEventListener('leaf.deselect', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('leaf.deselect', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.select(0).deselect(0);
        });
      });


      test('Fires <disable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,true);

          done();

          px_tree_view.removeEventListener('disable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('disable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.disable(0);
        });
      });


      test('Fires <leaf.disable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,true);

          done();

          px_tree_view.removeEventListener('leaf.disable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('leaf.disable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.disable(0);
        });
      });


      test('Fires <enable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,false);

          done();

          px_tree_view.removeEventListener('enable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('enable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.disable(0).enable(0);
        });
      });


      test('Fires <leaf.enable> event', function(done){
        function fn(e){
          assert.isDefined(e.detail.scope,'Scope is defined');
          assert.isDefined(e.detail.data,'Data is defined');
          assert.isDefined(e.detail.data.foo,'Detail data is defined');
          assert.equal(px_tree_view.nodes(0).disabled,false);

          done();

          px_tree_view.removeEventListener('leaf.enable', fn);
          px_tree_view.flush();
        }

        px_tree_view.addEventListener('leaf.enable', fn);
        px_tree_view.insert({ "label":"Label", "foo":"bar" });
        
        setTimeout(function(){
          px_tree_view.disable(0).enable(0);
        });
      });
    });
  });
}
