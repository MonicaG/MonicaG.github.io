---
title: Solving Perl locale issues on my Raspberry Pi
layout: post
category: raspberrypi
desc: Solving Perl locale issues on Raspberry Pi
---

On my [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) I would get locale warnings when using Perl commands.  This blog post explains the steps I took to fix these warnings.

For example, the [colordiff](http://www.colordiff.org/) command would give the following error:

```
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
		LANGUAGE = "en_US.UTF-8",
		LC_ALL = "en_US.UTF-8",
		LC_CTYPE = "en_CA.UTF-8",
		LANG = "en_US.UTF-8"
	are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").

```

To fix it, I first uncommented the locales I wanted in the /etc/locale.gen file.  

```
sudo vi /etc/locale.gen
```

Uncommenting means removing the # mark at the start of a line. Any line that starts with a # is ignored, so removing the mark means the line will be read. Here I have uncommented the en_GB.UTF-8 and en_US.UTF-8 locales:

<img src="/images/locale_warning_locale_gen_file.png" class="img-responsive center-block" alt="editing the /etc/locale.gen file">


Next I ran the following two commands:

```
sudo dpkg-reconfigure locales

sudo locale-gen
``` 

This solved my issue and now Perl does not throw the warning! The output of the two commands are displayed in the screenshots below.  

<img src="/images/locale_warning_dpgk-reconfigure.png" class="img-responsive center-block" alt="results of dpkg-reconfigure locales command">

<img src="/images/locale_warning_locale-gen.png" class="img-responsive center-block" alt="results of locale-gen command">


I was curious about the <code>dpkg-reconfigure locales</code> and <code>locale-gen</code> commands.  The following is my summary from reading the man pages for those commands.

<code>dpkg-reconfigure</code> - The dpkg-reconfigure command reconfigures an already installed package: the locales package in this case.  The <code>debconf-show package_name</code> command will display what is currently configured on a package.  Running this command gave me the following result:

```
* locales/locales_to_be_generated: en_CA.UTF-8 UTF-8, en_GB.UTF-8 UTF-8, en_US.UTF-8 UTF-8
* locales/default_environment_locale: en_US.UTF-8
```

The above was the result after having already run the <code>dpkg-reconfigure locales</code> command. Running the <code>dpkg-reconfigure locales</code> command again would regenerate those locales.

<code>locale-gen</code> - From the man pages:

> locale-gen is a program that reads the file /etc/locale.gen and invokes localedef for the chosen localisation profiles.  Run locale-gen after you have modified the /etc/locale.gen file.  

So, the localdef program is run for each locale I uncommented in the /etc/locale.gen file. The localdef program creates binary files used by the locale functions in the C library.  These binary files contain information about how various locale attributes should be formatted.

## References:
[https://www.raspberrypi.org/forums/viewtopic.php?t=38231&p=553816](https://www.raspberrypi.org/forums/viewtopic.php?t=38231&p=553816)

[https://manpages.debian.org/cgi-bin/man.cgi?query=dpkg-reconfigure](https://manpages.debian.org/cgi-bin/man.cgi?query=dpkg-reconfigure)

[https://manpages.debian.org/cgi-bin/man.cgi?query=locale-gen](https://manpages.debian.org/cgi-bin/man.cgi?query=locale-gen)

[http://man7.org/linux/man-pages/man1/localedef.1.html](http://man7.org/linux/man-pages/man1/localedef.1.html)
