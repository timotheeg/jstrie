var Trie = require('../src/trie.js');

exports.test_array_of_strings = function(test)
{
	var t = Trie.fromWordsArray([
		"tim",
		"timothee",
		"ali",
		"ali-akber",
		"johan",
		"marc",
		"tim"
	]);

	// test words that are present
	test.ok( t.hasWord('ali')       );
	test.ok( t.hasWord('ali-akber') );
	test.ok( t.hasWord('tim')       );
	test.ok( t.hasWord('timothee')  );
	test.ok( t.hasWord('johan')     );
	test.ok( t.hasWord('marc')      );

	test.equal( t.getCount('ali'),       1 );
	test.equal( t.getCount('ali-akber'), 1 );
	test.equal( t.getCount('tim'),       2 );
	test.equal( t.getCount('timothee'),  1 );
	test.equal( t.getCount('johan'),     1 );

	test.done();
};

exports.test_hash_with_data = function(test)
{
	var inc = 0;

	var t = Trie.fromWordsHash({
		        "tim": {id: ++inc}
		,  "timothee": {id: ++inc}
		,       "ali": {id: ++inc}
		, "ali-akber": {id: ++inc}
		,     "johan": {id: ++inc}
		,      "marc": {id: ++inc}
	});

	t.addWord("tim", {id: ++inc});

	test.ok( t.hasWord('ali')       );
	test.ok( t.hasWord('ali-akber') );
	test.ok( t.hasWord('tim')       );
	test.ok( t.hasWord('timothee')  );
	test.ok( t.hasWord('johan')     );

	test.equal( t.getCount('ali'),       1 );
	test.equal( t.getCount('ali-akber'), 1 );
	test.equal( t.getCount('tim'),       2 );
	test.equal( t.getCount('timothee'),  1 );
	test.equal( t.getCount('johan'),     1 );

	test.done();
};

exports.test_individual_adds = function(test)
{
	var t = new Trie(), inc = 0;

	test.ok( !t.hasWord('ali') );
	test.equal( t.getCount('ali'), 0);

	t.addWord("ali", ++inc);
	test.ok( t.hasWord('ali') );	
	test.equal( t.getCount('ali'), 1);

	t.addWord("ali", ++inc);
	test.ok( t.hasWord('ali') );	
	test.equal( t.getCount('ali'), 2);

	test.deepEqual( t.getAllData('ali'), [1, 2] );
	test.deepEqual( t.getData('ali'),    1      );

	test.done();
};

exports.test_data = function(test)
{
	var t = new Trie()
		, inc = 0
		, data1 = {id: ++inc, dat: 'foo'}
		, data2 = {id: ++inc, dat: 'bar'}
		, data3 = {id: ++inc, dat: 'baz'};

	t.addWord("ali",       data1);
	t.addWord("ali",       data2);
	t.addWord("ali-akber", data3);

	test.strictEqual( t.getData('ali'),             data1 );
	test.strictEqual( t.getAllData('ali')[0],       data1 );
	test.strictEqual( t.getAllData('ali')[1],       data2 );
	test.strictEqual( t.getAllData('ali-akber')[0], data3 );

	test.done();
};

exports.test_api_behavior = function(test)
{
	var t = Trie.fromWordsArray([
		"tim",
		"timothee",
		"ali",
		"ali-akber"
	]);

	test.ok(  t.hasWord('tim')       );
	test.ok( !t.hasWord('timo')      );
	test.ok(  t.hasWord('timothee')  );
	test.ok(  t.hasWord('ali')       );
	test.ok( !t.hasWord('ali-')      );
	test.ok(  t.hasWord('ali-akber') );
	test.ok( !t.hasWord('foo')       ); 

	test.ok(  t.hasPrefix('t')         );
	test.ok(  t.hasPrefix('ti')        );
	test.ok(  t.hasPrefix('tim')       );
	test.ok(  t.hasPrefix('timo')      );
	test.ok(  t.hasPrefix('timot')     );
	test.ok(  t.hasPrefix('timoth')    );
	test.ok(  t.hasPrefix('timothe')   );
	test.ok(  t.hasPrefix('timothee')  );
	test.ok( !t.hasPrefix('timotheea') );
	test.ok( !t.hasPrefix('bar')       );

	test.equal( t.getCount('tim'),       1 );
	test.equal( t.getCount('timo'),      0 );
	test.equal( t.getCount('timothee'),  1 );
	test.equal( t.getCount('ali'),       1 );
	test.equal( t.getCount('ali-'),      0 );
	test.equal( t.getCount('ali-akber'), 1 );
	test.equal( t.getCount('baz'),       0 );

	test.throws( function(){ t.getAllData('timo'); });
	test.throws( function(){ t.getAllData('baz');  });
	test.throws( function(){ t.getData('timo');    });
	test.throws( function(){ t.getData('baz');     });

	test.done();
};

exports.test_empty_string = function(test)
{
	var t = Trie.fromWordsArray(['']);

	test.ok(    t.hasWord('')   );
	test.ok(    t.hasPrefix('') );
	test.equal( t.getCount(''), 1 );

	t.addWord('');
	t.addWord('foo');

	test.ok(    t.hasWord('')   );
	test.ok(    t.hasPrefix('') );
	test.equal( t.getCount(''), 2 );

	test.ok(    t.hasWord('foo')   );
	test.ok(    t.hasPrefix('foo') );
	test.equal( t.getCount('foo'), 1 );

	test.done();
};

exports.test_remove_longest_first = function(test)
{
	var t = Trie.fromWordsArray([
		  'timothee'
		, 'tim'
	]);

	test.ok( t.hasWord('tim')      );
	test.ok( t.hasWord('timothee') );

	t.removeWord('timothee');

	test.ok( !t.hasWord('timothee')   );
	test.ok( !t.hasPrefix('timothee') );
	test.ok( !t.hasPrefix('timothe')  );
	test.ok( !t.hasPrefix('timoth')   );
	test.ok( !t.hasPrefix('timot')    );
	test.ok( !t.hasPrefix('timo')     );
	test.ok(  t.hasPrefix('tim')      );
	test.ok(  t.hasPrefix('ti')       );
	test.ok(  t.hasPrefix('t')        );
	test.ok(  t.hasPrefix('')         );
	test.ok(  t.hasWord('tim')        );

	t.removeWord('tim');

	test.ok( !t.hasWord('tim')   );
	test.ok( !t.hasPrefix('tim') );
	test.ok( !t.hasPrefix('ti')  );
	test.ok( !t.hasPrefix('t')   );
	test.ok(  t.hasPrefix('')    );

	test.done();
};

exports.test_remove_shortest_first = function(test)
{
	var t = Trie.fromWordsArray([
		  'timothee'
		, 'tim'
	]);

	test.ok( t.hasWord('tim')      );
	test.ok( t.hasWord('timothee') );

	t.removeWord('tim');

	test.ok( !t.hasWord('tim')        );
	test.ok(  t.hasWord('timothee')   );
	test.ok(  t.hasPrefix('timothee') );
	test.ok(  t.hasPrefix('timothe')  );
	test.ok(  t.hasPrefix('timoth')   );
	test.ok(  t.hasPrefix('timot')    );
	test.ok(  t.hasPrefix('timo')     );
	test.ok(  t.hasPrefix('tim')      );
	test.ok(  t.hasPrefix('ti')       );
	test.ok(  t.hasPrefix('t')        );
	test.ok(  t.hasPrefix('')         );

	t.removeWord('timothee');

	test.ok( !t.hasWord('timothee')   );
	test.ok( !t.hasPrefix('timothee') );
	test.ok( !t.hasPrefix('timot')    );
	test.ok( !t.hasPrefix('ti')       );
	test.ok( !t.hasPrefix('t')        );
	test.ok(  t.hasPrefix('')         );

	test.done();
};

exports.test_get_words = function(test)
{
	var res, t = Trie.fromWordsArray([
		  'timothee'
		, 'tim'
	]);

	res = t.getWordsFromPrefix('t');
	test.ok( 'tim' in res);
	test.ok( 'timothee' in res);

	res = t.getWordsFromPrefix('ti');
	test.ok( 'tim' in res);
	test.ok( 'timothee' in res);

	res = t.getWordsFromPrefix('tim');
	test.ok( 'tim' in res);
	test.ok( 'timothee' in res);

	res = t.getWordsFromPrefix('timo');
	test.ok( ! ('tim' in res) );
	test.ok( 'timothee' in res);

	test.done();
};

exports.test_import_export = function(test)
{
	var t1 = Trie.fromWordsArray([
		  'timothee'
		, 'ali'
	]);

	test.ok( t1.hasWord('timothee') );
	test.ok( t1.hasWord('ali')      );

	var t2 = Trie.fromJSON( t1.toJSON() );
	test.deepEqual(t1, t2);

	test.ok( t2.hasWord('timothee') );
	test.ok( t2.hasWord('ali')      );

	test.done();
};
