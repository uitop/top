import axios from "axios";
const apiWeather = () =>{
	const apikey = process.env.REACT_APP_WEATHER_API_KEY 
	axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=37.497982&lon=127.027658&lang=ko&appid=${apikey}`,
	).then(response=>{
		console.log(response)
	}).catch(error =>{
		console.log(error)
	})
	return 'test'
}


export default apiWeather;