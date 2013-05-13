
var module_setup = function(undefined)
{
	var META_NAME = "_$";

	function isArray(obj)
	{
		return {}.toString.call( obj ) === '[object Array]';
	}

	var Trie = function(word_collection)
	{
		this.root = {};

		if (word_collection) this.build( word_collection );
	};

	var p = Trie.prototype;

	p.build = function(words)
	{
		if (isArray(words))
		{
			// iterate over all words and add them to the Trie
			for (var idx = words.length; idx--;)
			{
				this.addWord(words[idx], null);
			}
		}
		else
		{
			// assumes hash, where keys are words and value are the metadata
			for (var word in words)
			{
				this.addWord(word, words[word]);
			}
		}
	};

	p.addWord = function(word, metadata)
	{
		if (typeof word !== 'string' || !word) return;

		var node = this.root, len = word.length;
		for (var idx=0; idx<len; idx++)
		{
			var _char = word.charAt(idx);
			node = node[_char] || (node[_char] = {});
		}

		if (!node[META_NAME]) node[META_NAME] = []; // array because you could have duplicate words with different medatata

		node[META_NAME].push(metadata);
	};

	p.getWordData = function(word)
	{
		var node = this.root, len = word.length;
		for (var idx=0; idx<len; idx++)
		{
			node = node[ word.charAt(idx) ];
			if (!node)
			{
				throw new Error("word not found");
			}
		}

		return node[META_NAME] || [];
	};

	p.getWordCount = function(word)
	{
		var data = [];

		try
		{
			data = this.getWordData(word);
		}
		catch(e)
		{
			// nothing to do here
			// assume word not found, return value will be 0
		}

		return data.length;
	};

	p.hasWord = function(word)
	{
		return this.getWordCount(word) > 0;
	};

	p.export = function()
	{
		return JSON.stringify(this.root);
	};

	p.import = function(trie_json)
	{
		this.root = trie_json;
	};

	return Trie;
};

if (typeof module !== "undefined" && module.exports)
{
	module.exports = module_setup();
}
else
{
	this.Trie = module_setup();
}
