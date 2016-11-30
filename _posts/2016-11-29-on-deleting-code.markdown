---
title: On deleting code
layout: post
category: programming
desc: When and why to delete code
excerpt_separator: <!--more-->
---

This blog post is my journey on creating, debugging and deleting a unit test.

A frequent choice every programmer faces is whether a piece of code belongs in a program.  I was working on a hobby project recently where I faced this choice.  I had written a number of unit tests and after some reflection deleted one of the test to improve my code quality.  At first read this sounds counter-intuitive.  Don't unit tests improve code quality?  Generally, yes they do.  But good unit tests need to be repeatable, maintainable and quick to run.  

In my case I had created a Trie and some unit tests to validate it.  In my test code I created a small Trie which contained 11 entries.  However, I wanted to test against a larger set.  So, I decided to use the dictionary file in <code>/usr/share/dict/words</code>.  

I created the following unit test:

<!--more-->

```Python
def test_dictionary(self):
    t = trie.Trie()
    count = 0
    with open('/usr/share/dict/words') as f:
        for line in f:
            t.insert(line)
            count += 1
    assert(len(t.get_all_words())) == count

```

This test failed.  The <code>len(t.get_all_words())</code> value was 234,371 but the value of <code>count</code> was 235,886. 

I assumed something must be wrong with my code.  So, I compared the words returned by <code>t.get_all_words()</code> against the words in the file.  I added some print statements to my test code and expected to see 1515 words.  However, there was no output. This surprised me!  

Maybe my code was correct after all. I decided to look at the file to see if there were empty lines or duplicate entries.  Time to use some command line tools!  I used the following commands to get a count of the unique words in the file:

```Shell
$ sort -f -b -u /usr/share/dict/words > file
$ wc -l file
$ 234371
```

Oh! The numbers matched, meaning there must be duplicate entries.  Taking a quick look at the file I saw the first two entries were 'a' and 'A'.  In my Trie I convert everything to lower case, so they would be the same entry.

I added a unit test to cover the duplicates case and another to cover leading/trailing spaces.


After adding the new test cases I decided to remove the unit test which used the <code>/usr/share/dict/words</code> file.  Why? Because:

1. I would need to hardcode the value 234,371 into the test.  
1. The location of the <code>/usr/share/dict/words</code> file is hardcoded.  This test would fail on a Window's machine because that file does not exist. In my case this is not a problem because I'm the only one that will use this program.  But this would be a bad pattern if I were working with other people.
1. The unit test takes a few seconds to run.  It is a bit annoying waiting for it to run, even if it is only for a few seconds.
1. The new unit tests cover the cases uncovered by the <code>/usr/share/dict/words</code> file test.

I was a little attached to the test because it led me down a path that improved my test case scenarios.  It was also nice to see my Trie work with 234,371 entries.  However, it did not meet the requirements for a good unit test. It did not run quickly and it was not repeatable across platforms. 

But I think this raises the question: is there a case for testing the Trie with a large data set?  Yes, I think so, but not at the unit test level.  If this was a real project then I think this could be covered in a volume or verification testing phase.

I won't claim my code is elegant, but it is better without that test. 
