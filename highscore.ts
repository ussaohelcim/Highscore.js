interface IScore{
	position:number
	name:string
	score:number
}

enum ResponseTypes{
	ScoreAdded = 1,
	ScoreNotAdded = 2
}

class HighscoreSDK{
	private apiURL:string

	/**@param {string} apiURL http://apiurl.com/ */
	constructor(apiURL:string){
		this.apiURL = apiURL
	}

	/**
	 * Returns all scores from the database between 1 and 10 (inclusive).
	 * @returns {IScore[]}
	 */
	async getTop10():Promise<IScore[]>{
		let scoreBoard:IScore[] = await fetch(`${this.apiURL}api/top`)
		.then((res)=>{
			return res.json()
		})

		return scoreBoard
	}

	/**
	 * Adds a new score to the database and returns a ResponseTypes.
	 * @param playerName 
	 * @param score 
	 * @returns {number} 0: error,1: accepted, 2: not accepted
	 */
	async addScore(playerName:string,score:number):Promise<number>{
		let obj = {
			name: playerName,
			score: score
		}
		return await fetch(`${this.apiURL}api/add`,{
			method:'Post',
			headers:{
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(obj)
		}).then((res)=>{
			if(res.status === 202)
			{
				return ResponseTypes.ScoreAdded
			}
			else if(res.status === 403)
			{		
				return ResponseTypes.ScoreNotAdded
			}
			
			return 0
		})
	}
	/**
	 * Returns all scores from the database between {start} and {end} (inclusive).
	 * @param start 
	 * @param end 
	 * @returns {IScore[]}
	 */
	async getBetween(start:number,end:number):Promise<IScore[]>{
		return await fetch(`${this.apiURL}api/get/${start}/${end}`)
		.then((res)=>{
			return res.json()
		})
	}

	/**
	 * Returns all scores from the database.
	 * @returns {IScore[]}
	 */
	async getAllScores():Promise<IScore[]>{
		return await fetch(`${this.apiURL}api/all`).then((res)=>{
			return res.json()
		})
	}

	/**
	 * Returns the amount of games on database. 
	 * @returns {number}
	 */
	async getLeaderBoardSize(){
		return await fetch(`${this.apiURL}api/count`).then((res)=>{
			return res
		})
	}

	/**
	 * 
	 * @param playername 
	 * @returns {IScore} score
	 */
	async getPlayerScore(playername:string){
		return await fetch(`${this.apiURL}api/get/${playername}`)
		.then((res)=>{
			return res.json();
		})
	}
}
