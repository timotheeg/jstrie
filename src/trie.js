
var module_setup = function(undefined)
{
	var META_NAME = "$$"; // 2-chars string to never collide with a single char content

	function isArray(obj)
	{
		return {}.toString.call( obj ) === '[object Array]';
	}

	function Trie()
	{
		this.root = {};
	}

	// factory methods
	Trie.fromWordsArray = function(words)
	{
		var t = new Trie();
		for (var idx = words.length; idx--;) t.addWord(words[idx], null);
		return t;
	};

	Trie.fromWordsHash = function(words)
	{
		var t = new Trie();
		for (var word in words) t.addWord(word, words[word]);
		return t;
	};

	Trie.fromJSON = function(json_string)
	{
		var t = new Trie();
		t.root = JSON.parse(json_string);
		return t;
	};



	// instance methods
	var p = Trie.prototype;

	p.addWord = function(word, metadata)
	{
		if (typeof word !== 'string') return;

		var node = this.root, len = word.length;
		for (var idx=0; idx<len; idx++)
		{
			var _char = word.charAt(idx);
			node = node[_char] || (node[_char] = {});
		}

		if (!node[META_NAME]) node[META_NAME] = []; // array because you could have duplicate words with different medatata

		node[META_NAME].push(metadata);
	};

	function getTailNode(node, word)
	{
		var len = word.length;
		for (var idx=0; idx<len; idx++)
		{
			node = node[ word.charAt(idx) ];
			if (!node)
			{
				throw "not found";
			}
		}
		return node;
	}

	// returns an array of all metadata associated with a given word
	// if there's no metadata
	p.getAllData = function(word)
	{
		var node = getTailNode(this.root, word);
		if (!node[META_NAME]) throw "not found";
		return node[META_NAME];
	};

	// returns the FIRST data associated with a given word (convenience function)
	p.getData = function(word)
	{
		return this.getAllData(word)[0];
	};

	p.removeWord = function(word)
	{
		// nodes in our trie are not aware of their parents,
		// so to remove a word, we need to store the traversed nodes, so we can iterate backward and remove as necessary all nodes which are NOT 
		var nodes = [this.root], node = this.root, len = word.length;
		for (var idx=0; idx<len; idx++)
		{
			node = node[ word.charAt(idx) ];
			if (!node) return;
			nodes.push(node);
		}

		if ( !node[META_NAME] ) return; // this was never a stored word to start with, so there's nothing to delete

		delete node[META_NAME]; // warning: this removes ALL values stored!!

		do {
			node = nodes.pop();

			if (node[META_NAME]) break;

			var has_children = false;
			for (var c in node) if (node.hasOwnProperty(c)) {
				has_children = true;
				break;
			}

			if (has_children) break;

			// no children and not an end of word, tree needs to be trimmed
			delete nodes[nodes.length-1][word.charAt(nodes.length-1)];
		}
		while (nodes.length > 1);
	};

	p.getCount = function(word)
	{
		try
		{
			return this.getAllData(word).length;
		}
		catch(e)
		{
			// nothing to do here
			// assume word not found, return value will be 0
			return 0;
		}
	};

	p.hasWord = function(word)
	{
		try
		{
			this.getAllData(word);
			return true;
		}
		catch(e)
		{
			// nothing to do here
			// assume word not found, return value will be 0
			return false;
		}
	};

	p.hasPrefix = function(prefix)
	{
		try
		{
			getTailNode(this.root, prefix);
			return true;
		}
		catch(e)
		{
			return false;
		}
	};

	function traverse(node, prefix, res)
	{
		if (META_NAME in node) res[prefix] = node[META_NAME].concat();
		for (var c in node) if (node.hasOwnProperty(c) && c !== META_NAME)
		{
			traverse(node[c], prefix + c, res);
		}
	}

	p.getWordsFromPrefix = function(prefix)
	{
		var res = {};
		try
		{
			var node = getTailNode(this.root, prefix);
			traverse(node, prefix, res);
		}
		catch(e)
		{
		}

		return res;
	};

	p.toJSON = function()
	{
		return JSON.stringify(this.root);
	};

	p.toString = p.toJSON;

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
