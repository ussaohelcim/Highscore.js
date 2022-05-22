interface IScore{
	position:number
	name:string
	score:number
}

enum ResponseTypes{
	AddedScore = 1,
	ScoreNotAdded = 2,
	NewHighscore = 6
}

class HighscoreSDK{
	private apiURL:string

	/**@param {string} apiURL http://apiurl.com/ */
	constructor(apiURL:string){
		this.apiURL = apiURL
	}
	async getTop10():Promise<IScore[]>{
		let scoreBoard:IScore[] = await fetch(`${this.apiURL}games/top`)
		.then((res)=>{
			console.log(`${this.apiURL}games/top`)
			return res.json()
		}).then((body)=>{
			return body
		})

		return scoreBoard
	}

	async addScore(playerName:string,score:number):Promise<number>{
		let obj = {
			name: playerName,
			score: score
		}
		return await fetch(`${this.apiURL}games/add`,{
			method:'Post',
			headers:{
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(obj)
		}).then((res)=>{
			if(res.status === 202)
			{

			}
			else if(res.status === 403)
			{		

			}
			console.log(res.statusText)
			return 0
		})
	}
	async getBetween(start:number,end:number):Promise<IScore[]>{
		return await fetch(`${this.apiURL}games/get/${start}/${end}`)
		.then((res)=>{
			return res.json()
		})
	}
	async getPlayerScore(playername:string){
		return await fetch(`${this.apiURL}games/get/${playername}`)
		.then((res)=>{
			return res.json();
		})
	}
}
