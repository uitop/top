import axios from "axios";
const apiWeather = async () =>{
	const apikey = '2218dbf863106f69e3a3f830002da15a'
	try{
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=37.4980&lon=127.0277&lang=kr&appid=${apikey}&units=metric`)
		return response.data || [];
	} catch(e){
		throw new Error(`날씨 불러오기:${e}`)
	}
}

export default  apiWeather;