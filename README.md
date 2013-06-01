jstrie [![Build Status](https://travis-ci.org/timotheeg/jstrie.png)](https://travis-ci.org/timotheeg/jstrie)
=============================================================================================================

Implementing a trie in JavaScript, just for fun!

Features
---------
* pure js, no dependencies: browser and nodejs ready
* typical Trie behavior and API
* supports storing data in the trie for words
* supports duplicate entries in the trie
* good tests (120 assertions in 9 nodeunit tests)


API
---

### static methods:

* Trie.fromWordsArray( array_of_strings ); // creating
* Trie.fromWordsHash( hash ); // hash keys will become words, and hash values the associated metadata
* Trie.fromJSON( json_string );

### instance methods:

* addWord(word [, value])
* removeWord(word)   // removes ALL values in case of duplicates
* hasWord(word)
* getCount(word)
* getData(word)      // return first value stored for word (throws if word is not stored)
* getAllData(word)   // return array of all value stored for word (throws if word is not stored)
* hasPrefix(prefix)
* getWordsFromPrefix(prefix)
* toJSON()


Examples
---------

### simple Trie construction

    var myTrie = new Trie();
    myTrie.addWord("timothee");
    myTrie.addWord("tim");

    myTrie.hasWord("timothee"); // true
    myTrie.hasWord("tim");      // true
    myTrie.hasWord("timo");     // false
    myTrie.hasPrefix("timo");   // true


### Trie factories

    var myTrie = Trie.fromWordsArray([
    	'planet',
    	'planets',
    	'planetarium',
    	'planetoid',
    ]);
    myTrie.hasWord('planet');    // true
    myTrie.hasWord('planeto');   // false
    myTrie.hasPrefix('planeto'); // true


    var myTrie = Trie.fromWordsHash({
    	     a: 1
    	,  abc: 2
    	, abcd: 3
    });
    myTrie.hasPrefix('ab');          // true
    myTrie.getWordsFromPrefix('ab'); // {abc: 2, abcd: 3}
    myTrie.removeWord('abc');
    myTrie.getWordsFromPrefix('ab'); // {abcd: 3}

