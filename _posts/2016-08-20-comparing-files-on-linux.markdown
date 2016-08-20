---
title: 6 ways to compare two files on Linux
layout: post
category: linux
desc: 6 ways to compare two files on Linux using diff colordiff vimdiff emacs cmp and sdiff
---

Comparing two files is a common task.  On my MacBook I use the FileMerge (opendiff) app, which is part of the [XCode](https://developer.apple.com/xcode/features/) tool-set.  However, there are times when I am at the Linux command line and need to compare two files. In this blog post I will show how to compare files at the command line and with the emacs and vim editors.

To start, here are two simple python files that I will compare:

<img src="/images/file_diff_file1.png" class="img-responsive center-block" alt="contents of file1.py">


<img src="/images/file_diff_file2.png" class="img-responsive center-block" alt="contents of file2.py">

The differences between the two file are:

1. The values of variable <code>y</code> are different
1. The <code>assert</code> statements are different
1. file1.py has an extra line at the end: it prints the value of z

## Command line tools

### diff

The <code>diff</code> command compares files line by line.  It is invoked as follows:

```
diff file1.py file2.py
```

<img src="/images/file_diff_diff_command.png" class="img-responsive center-block" alt="output of diff file1.py file2.py command">

Let's break down the output:

```
2c2 <-- The first '2' is line 2 in file1. 'c' means 'change'.  The second 2, is line 2 in file2.
< y = 3 <-- The '<' indicates the line is from file1.  
--- <-- formatting line, the different line(s) from file2 are below this
> y = 7 <-- The '>' indicates the line is from file2
6,7c6 <-- The next difference.  It is on line 6 & 7 of file1, and line 6 of file2.
< assert z == 8 <-- line 6 from file1
< print z <-- line 7 from file1
---
> assert z == 12 <-- line 6 from file2. Note, there is no line 7 in file2
```

This is the "normal" output format of the <code>diff</code> command without any options.  There are [many ways to configure](http://www.gnu.org/software/diffutils/manual/diffutils.html#toc-diff-Output-Formats) the <code>diff</code> output.


### colordiff

The <code>colordiff</code> command is a wrapper around the <code>diff</code> command. It displays the same output as the diff command but with 'syntax' highlighting.  You may need to install <code>colordiff</code> on your machine. On Ubuntu or Debian you can do this using <code>apt-get install colordiff</code>. Alternatively, you can download it from the [http://www.colordiff.org/](http://www.colordiff.org/) website.

The <code>colordiff</code> command is invoked as follows:

```
colordiff file1.py file2.py
```

<img src="/images/file_diff_colordiff.png" class="img-responsive center-block" alt="output of colordiff file1.py file2.py command">

The colour scheme used for highlighting can be changed. The file is located in <code>/etc/colordiffrc</code> but override it in <code>~/.colordiffrc</code>. Alternate colour themes are available at [https://github.com/daveewart/colordiff](https://github.com/daveewart/colordiff)

### cmp

The <code>cmp</code> command compares two files byte by byte.  If the files are different then it reports the first byte and line number where they differ.  


```
cmp file1.py file2.py
```

<img src="/images/file_diff_cmp.png" class="img-responsive center-block" alt="output of cmp file1.py file2.py command">


It will also report if one file is the prefix of another. What does it mean that one file is a prefix of another? It means the contents of one file are the starting contents of another file.  For example:

file: a.txt 

```
IT WAS the best of times, it was the worst of times,
it was the age of wisdom, it was the age of foolishness,
```

file: b.txt

```
IT WAS the best of times, it was the worst of times,
it was the age of wisdom, it was the age of foolishness,
it was the epoch of belief, it was the epoch of incredulity,
it was the season of Light, it was the season of Darkness,
```

In this example a.txt is a prefix of b.txt. 

```
cmp a.txt b.txt
```

<img src="/images/file_diff_cmp-prefix.png" class="img-responsive center-block" alt="output of cmp a.txt b.txt command">


### sdiff 

The <code>sdiff</code> command does a side by side merge of file difference.  When <code>sdiff</code> is invoked without the --output (-o) option it produces a side-by-side difference.  However, this usage is considered depricated.  <code>diff -y file1 file2</code> should be used instead.  This screen shot shows the output from using <code>diff -y file1 file2</code>.

<img src="/images/file_diff_diff-y.png" class="img-responsive center-block" alt="output of diff -y file1.py file2.py command">


## Editors

### emacs

To compare two files in the emacs editor use the following command:

```
M-x ediff
```

Note: M means meta key and is usually either the ALT or OPTION key. Example: <code>ALT x</code>

Emacs will then provide prompts to enter the file names. At the resulting differences screen it provides you with the option to 'Type ? for help'.  This lists the commands for moving around, changing display features and manipulating the files.  But briefly, to navigate through the changes use:

* <code>p</code> or <code>DEL</code> - move to the previous difference
* <code>n</code> or <code>SPACE</code> - move to the next difference

<img src="/images/file_diff_emacs-ediff.png" class="img-responsive center-block" alt="output of using emacs M-x ediff-files command">


### vimdiff

The vim editor lets you compare files too.  Use the following command to view the differences using a side-by-side comparison:

```
vimdiff file1.py file2.py
```

<img src="/images/file_diff_vimdiff.png" class="img-responsive center-block" alt="output of vimdiff file1.py file2.py command">


To view the differences using horizontal splits use the -o argument:

```
vimdiff -o file1.py file2.py
```

For either display option you can navigate the through the differences using these commands:

* <code>[c</code>- Jump back to the previous start of a change. The c is optional and stands for count. When c is used jump back 'c' times
* <code>]c</code> - Jump to the start of the next change


This was a very brief overview of how to compare files. Please see the references below for more details on each of the methods.

## References

* [https://www.gnu.org/software/diffutils/manual/diffutils.html](https://www.gnu.org/software/diffutils/manual/diffutils.html)
* [http://www.colordiff.org/](http://www.colordiff.org/)
* [https://www.gnu.org/software/emacs/manual/html_mono/ediff.html](https://www.gnu.org/software/emacs/manual/html_mono/ediff.html)
* [http://vimdoc.sourceforge.net/htmldoc/diff.html](http://vimdoc.sourceforge.net/htmldoc/diff.html)
