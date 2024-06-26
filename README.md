# AULO
When you receive a sound effect file or give a specific section on YouTube,   
it is a service that searches for the most similar sound effect

[**Check out the demo**](https://ses-website.vercel.app/)

![Node.js CI](https://github.com/dunky11/react-saas-template/workflows/Node.js%20CI/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[<img src="/.github/gifs/showcase2.gif">](https://reactsaastemplate.com "Go to demo website")

Small-scale recordings, TTSs, pre-produced copyrighted music, and sound effects are mainly used in the case of individual or small-scale video production.  
Even services that target them cannot escape from simply collecting sounds and classifying them into tags.  
Therefore, we aim to plan a service that can assist the production process by covering art fields such as video, media, and art with sound effects as the target.

## Features
* search with mp3 sound source file for direct similarity search
* search with The YouTube URL and the specific section targeted for the similarity search

## Getting Started

### Prerequisites

#### Node.js 12+ (versions below could work, but are not tested)

* Linux:

   ```
   sudo apt install nodejs npm
   ```

* Windows:

   https://nodejs.org/en/

* MacOs:

   ```
   brew install nodejs npm
   ```

### Installing

1. Clone the repository

   ```
   git clone https://github.com/2024-1-CapstoneDesign/ses_website
   ```
2. Install dependencies, this can take a minute

   ```
   cd ses_website
   npm install
   ```
3. Start the local server

   ```
   npm start
   ```

Your browser should now open and show the app. Otherwise open http://localhost:3000/ in your browser. Editing files will automatically refresh the page.

### What to do next?

If you are new to React, you should watch a [basic React tutorial](https://www.youtube.com/results?search_query=react+tutorial) first.

If you know React, then most of the information you need is in the [Material-UI documentation](https://material-ui.com/getting-started/usage/).

You can go into [src/theme.js](/src/theme.js) and change the primary and secondary color codes at the top of the script to the values you like and some magic will happen.

## Deployment

If you are satisfied with the state of your website you can run:

```
npm run build 
```

It will create a folder named build with your compiled project inside. After that copy its content into your webroot and you are ready to go.

## Built With

* [Create-React-App](https://github.com/facebook/create-react-app) - Used to bootstrap the development
* [Material-UI](https://github.com/mui-org/material-ui) - Material Design components
* [React-Router](https://github.com/ReactTraining/react-router) - Routing of the app
* [Pace](https://github.com/HubSpot/pace) - Loading bar at the top
* [Emoji-Mart](https://github.com/missive/emoji-mart) - Picker for the emojis
* [React-Dropzone](https://github.com/react-dropzone/react-dropzone) - File drop component for uploads
* [Aos](https://github.com/michalsnik/aos) - Animations based on viewport
* [React-Cropper](https://github.com/roadmanfong/react-cropper) - Cropper for the image uploads
* [React-Stripe-js](https://github.com/stripe/react-stripe-js) - Stripes payment elements
* [react-oauth/google](https://github.com/MomenSherif/react-oauth) - Google OAuth2 using the new Google Identity Services SDK for React

## Contribute
Show your support by ⭐ the project. Pull requests are always welcome.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/dunky11/react-saas-template/blob/master/LICENSE) file for details.  
This project also based on [**github repository**](https://github.com/dunky11/react-saas-template).  
Thanks for dunky11 to open your project public.
