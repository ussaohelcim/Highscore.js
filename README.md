# Highscore.js

Javascript SDK for [Highscore](google.com) for browser based games.   

# How to use

[Download page](https://github.com/ussaohelcim/Highscore.js/releases)  

Download `highscore.js` to your project.  
You can also download the type definition `highscore.d.ts` to help you.  
Append the `highscore.js` file to your HTML before your game.  
```html
<script src="highscore.js"></script>
<!-- Your game code here -->
```

You can now create a object with the Highscore SDK and use it when you want.

```javascript
let highscoreAPI = new HighscoreSDK("http://localhost:3000/");

highscoreAPI.addScore("AAA",3000).then((res)=>{
	console.log(res)
})

highscoreAPI.getPlayerScore("AAA").then((res)=>{
	console.log(res)//{position: 1, name: 'AAA', score: 3000}
})

highscoreAPI.getTop10().then((res)=>{
	console.log(res)
})

highscoreAPI.getBetween(0,10).then((res)=>{
	console.log(res)
})
```
