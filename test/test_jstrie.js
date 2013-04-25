var Trie = require('../src/trie.js');

exports.test_building = function(test)
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