var Trie = require('../src/trie.js');

exports.test_array_of_strings = function(test)
{
	var t = new Trie();

	t.build([
		"tim",
		"ali",
		"ali-akber",
		"timothee",
		"johan",
		"marc",
		"tim"
	]);

	test.ok( t.hasWord('ali') );
	test.ok( t.hasWord('ali-akber') );
	test.ok( t.hasWord('tim') );
	test.ok( t.hasWord('timothee') );
	test.ok( t.hasWord('johan') );

	test.ok( !t.hasWord('ali-') );
	test.ok( !t.hasWord('timo') );
	test.ok( !t.hasWord('bar') );

	test.equal( t.getWordCount('ali'), 1 );
	test.equal( t.getWordCount('ali-akber'), 1 );
	test.equal( t.getWordCount('tim'), 2 );
	test.equal( t.getWordCount('timothee'), 1 );
	test.equal( t.getWordCount('johan'), 1 );

	test.equal( t.getWordCount('ali-'), 0 );
	test.equal( t.getWordCount('foo'), 0 );

	test.done();
};

exports.test_hash_with_data = function(test)
{
	var t = new Trie();

	var inc = 0;

	t.build({
		"tim": {id: ++inc},
		"ali": {id: ++inc},
		"ali-akber": {id: ++inc},
		"timothee": {id: ++inc},
		"johan": {id: ++inc},
		"marc": {id: ++inc}
	});

	t.addWord("tim", {id: ++inc});

	test.ok( t.hasWord('ali') );
	test.ok( t.hasWord('ali-akber') );
	test.ok( t.hasWord('tim') );
	test.ok( t.hasWord('timothee') );
	test.ok( t.hasWord('johan') );

	test.ok( !t.hasWord('ali-') );
	test.ok( !t.hasWord('timo') );
	test.ok( !t.hasWord('bar') );

	test.equal( t.getWordCount('ali'), 1 );
	test.equal( t.getWordCount('ali-akber'), 1 );
	test.equal( t.getWordCount('tim'), 2 );
	test.equal( t.getWordCount('timothee'), 1 );
	test.equal( t.getWordCount('johan'), 1 );

	test.equal( t.getWordCount('ali-'), 0 );
	test.equal( t.getWordCount('foo'), 0 );

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

	t.addWord("ali", data1);
	t.addWord("ali", data2);
	t.addWord("ali-akber", data3);

	test.strictEqual( t.getWordData('ali')[0], data1 );
	test.strictEqual( t.getWordData('ali')[1], data2 );
	test.strictEqual( t.getWordData('ali-akber')[0], data3 );

	test.done();
};
