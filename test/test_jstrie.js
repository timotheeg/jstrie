var Trie = require('../src/trie.js');

exports.test_array_of_strings = function(test)
{
	var t = new Trie();

	t.build([
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

	test.equal( t.getWordCount('ali'),       1 );
	test.equal( t.getWordCount('ali-akber'), 1 );
	test.equal( t.getWordCount('tim'),       2 );
	test.equal( t.getWordCount('timothee'),  1 );
	test.equal( t.getWordCount('johan'),     1 );

	test.done();
};

exports.test_hash_with_data = function(test)
{
	var t = new Trie();

	var inc = 0;

	t.build({
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

	test.equal( t.getWordCount('ali'),       1 );
	test.equal( t.getWordCount('ali-akber'), 1 );
	test.equal( t.getWordCount('tim'),       2 );
	test.equal( t.getWordCount('timothee'),  1 );
	test.equal( t.getWordCount('johan'),     1 );

	test.done();
};

exports.test_individual_adds = function(test)
{
	var t = new Trie(), inc = 0;

	test.ok( !t.hasWord('ali') );
	test.equal( t.getWordCount('ali'), 0);

	t.addWord("ali", ++inc);
	test.ok( t.hasWord('ali') );	
	test.equal( t.getWordCount('ali'), 1);

	t.addWord("ali", ++inc);
	test.ok( t.hasWord('ali') );	
	test.equal( t.getWordCount('ali'), 2);

	test.deepEqual( t.getWordData('ali'), [1, 2] );

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

	test.strictEqual( t.getWordData('ali')[0],       data1 );
	test.strictEqual( t.getWordData('ali')[1],       data2 );
	test.strictEqual( t.getWordData('ali-akber')[0], data3 );

	test.done();
};

exports.test_api_behavior = function(test)
{
	var t = new Trie([
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

	test.equal( t.getWordCount('tim'),       1 );
	test.equal( t.getWordCount('timo'),      0 );
	test.equal( t.getWordCount('timothee'),  1 );
	test.equal( t.getWordCount('ali'),       1 );
	test.equal( t.getWordCount('ali-'),      0 );
	test.equal( t.getWordCount('ali-akber'), 1 );
	test.equal( t.getWordCount('baz'),       0 );

	test.doesNotThrow( function(){ t.getWordData('timo'); }, "prefix search should not throw");
	test.throws(       function(){ t.getWordData('baz');  }, "non-match should throw");

	test.done();
};

exports.test_empty_string = function(test)
{
	var t = new Trie(['']);

	test.ok(    t.hasWord('')   );
	test.ok(    t.hasPrefix('') );
	test.equal( t.getWordCount(''), 1 );

	t.addWord('');
	t.addWord('foo');

	test.ok(    t.hasWord('')   );
	test.ok(    t.hasPrefix('') );
	test.equal( t.getWordCount(''), 2 );

	test.ok(    t.hasWord('foo')   );
	test.ok(    t.hasPrefix('foo') );
	test.equal( t.getWordCount('foo'), 1 );

	test.done();
};
