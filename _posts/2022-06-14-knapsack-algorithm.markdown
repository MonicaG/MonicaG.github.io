---
title: Using React to visualize the knapsack algorithm
layout: post
category: webdev
desc: How I built a react app that steps through generating the knapsack algorithm
excerpt_separator: <!--more-->
---


React and Tailwind CSS are popular frontend technologies. I had not used either and wanted to try them. After completing some React tutorials, I wanted to create my own app. I decided to create an [app](https://monicagranbois.com/knapsack-algorithm-visualization/) that would step through the knapsack algorithm. This would help me solidify my understanding of the algorithm while learning React and Tailwind CSS. This post lists the design and technology choices I made to build the app. For details about the algorithm itself, please visit [https://monicagranbois.com/knapsack-algorithm-visualization/](https://monicagranbois.com/knapsack-algorithm-visualization/).

<!--more-->

## Approach

My approach was to build a skeleton of the app first, without any CSS. This allowed me to focus on React and the logic of the app. 

Once I had the basic logic working I  added Tailwind CSS to the project. This allowed me to then focus on learning Tailwind CSS.

I then iterated on the project using React and Tailwind CSS at the same time.

I think this was a good approach since I was learning two technologies. It allowed me to focus on one technology at a time. Now that I am familiar with both I would approach a new project differently.  In the future, I would iterate on a project with React and Tailwind CSS at the same time.  

## Technologies Used

* [Create React App](https://create-react-app.dev/) 
	* I chose Create React App (CRA) because I was creating a new, standalone React App.
	* This was my first time using CRA, as the tutorials only used React in an index.html file.
* [Tailwind CSS](https://tailwindcss.com/)
	* To get started I followed the tutorials on the [Tailwinds YouTube channel](https://www.youtube.com/tailwindlabs). The documentation and online playground were also helpful.
	* I used the [Hero Icons](https://heroicons.com/) project to find and add icons to my project.
	* Overall, I liked Tailwind CSS, but it felt verbose to apply styles in the HTML rather than in a separate CSS file.
		* The developer addressed the issue of separation of concerns in his blog post [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/). 
		* I did define custom classes for styles used in multiple places. 
* [React Hook Form](https://react-hook-form.com/)
	* I initially wrote my own form validation. That was the wrong approach.
	* I found React Hook Form, which made form validation much easier. 
	* It also allowed me to use dynamically-generated fields. This allowed me to add, edit and delete items on the initial setup screen.
	* I would recommend investigating this tool if your app uses forms.
* [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
	* I used this to highlight code segments when the app steps through the code.
* [react-embed-gist](https://github.com/msaracevic/react-embed-gist)
	* I used this to display the complete algorithm at the end. I used this rather than react-syntax-highlighter because gist has better copy support. If someone wants to copy the algorithm, it is easier for them to do so with the gist.
	* The downside is it performs a network call to get the gist.
	* I am not sure if this was the right approach.
* [GitHub Pages](https://pages.github.com/)
	* I use this to host the app. My blog is already hosted on GitHub Pages, so it seemed a natural place to host it.
	* I use a GitHub workflow to deploy the site.



Please try the app at [https://monicagranbois.com/knapsack-algorithm-visualization/](https://monicagranbois.com/knapsack-algorithm-visualization/). I would appreciate any feedback on it or my tech choices. Happy coding!