import type { NextApiResponse } from 'next'
import axios from 'axios'
export default async function weather (req:never,res: NextApiResponse){
	const APIKey = process.env.WEATHER_API_KEY
	const time = Math.floor(Date.now() / 300000)
	const repo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=37.4980&lon=127.0277&lang=kr&appid=${APIKey}&units=metric&ti=${time}`).then(
	(res)=>{
		const {weather,main} = res.data
		return {weather,main}
	}
	).catch((error) =>{
		console.error(error);
	})
	res.status(200).json(repo)
}