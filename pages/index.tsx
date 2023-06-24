import styled from '@emotion/styled'
import axios from 'axios';
import Image from 'next/image';
import React, { useState,useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { mainList, Tmain} from '@/store/homeStore';
import { useRouter } from 'next/router';
const Main = styled.div<{bgNum:number}>`
  background-image: url('/images/mainbg.jpg');
  background-position: ${({bgNum})=>`${100 - bgNum}% top;`};
  background-size: auto 100%;
  background-repeat:no-repeat;
  width:100vw;
  height:100vh;
  overflow: hidden;
  transition: .3s;
  @supports (-webkit-touch-callout: none) { 
    height:-webkit-fill-available;
  }
  main{
    z-index: 1;
    width:100vw;
    height:100vh;
    overflow: auto;
    padding-right: 15px;
    position: relative;
    background:var(--alpha);
    font-size:15px;
    @media (max-width: 950px) {
      font-size: 13px;
      .gridSec{
        grid-gap: 1em;
        width:85vw;
      }
    }
    @media (max-width: 820px) {
      font-size: 11px;
      .gridSecn{
        width:90vw;
      }
    }
    @media (max-width: 680px) {
    box-sizing: border-box;
    .gridSec{
      position:relative;
      display:flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width:90vw;
      grid-gap: 2em;
      .itemBox{
        flex:1;
        order:2;
        &.box5{
          order:1;
        }
        .text{
          transform: rotateY(0deg);
        }
      }
    }
  }
}
.gridSec{
  position:sticky;
  top:0;
  width:80vw;
  height:90vh;
  display:grid;
  margin:0 auto;
  padding:5vh 0;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1.5em;
  .itemBox{
    background:var(--alpha);
    border-radius: 1em;
    color:#fff;
    padding:1em;
    position: relative;
    &.box5{
      .contents{
        cursor: default;
      }
      .text{
        background: none;
        transform: rotateY(0deg);
        padding-top:.5rem;
      }
      dl{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin:0;
        dt{
          width:50px;
        }
        dd{
          width:calc(100% - 50px);
          margin:0;
          img {
            width:35px;
            vertical-align:middle;
          }
          span{
            vertical-align:middle;

          }
        }
      }
    }
  }
  .title{
    font-size:2em;
    border-bottom: 1px solid #fff;
  }
  .contents{
    cursor: pointer;
    margin-top:1em;
    height: calc(100% - 4em);
    border-radius:.5em;
    background: no-repeat;
    background-size: cover;
    
    &:hover{
      .text{
        transform: rotateY(0deg);
      }
    }
    .text{
      box-sizing: border-box;
      height: 100%;
      padding:1em;
      border-radius:.5em;
      background:rgba(0,0,0,.6);
      transform: rotateY(90deg);
      transition: transform .4s;
    }
    h4{
      font-size: 1.5em;
    }
    h5{
      font-size: 16px;
      white-space: pre-wrap;
    }
  }
}
.heightSec{
  height:100vh;
}
`
type WeatherType = {
  weather:[{[key:string]:string}],
  main:{[key:string]:number}
} | undefined
const Home = () => {
  const [isBg,setBg] = useState(0)
  const [isWeather,setWeather] = useState<WeatherType> (undefined)
  const list = useRecoilValue(mainList)
  const router = useRouter()
  useEffect(()=>{
    axios.get('/api/weather').then(
      (res)=>{
        setWeather(res.data)
      }
    )
  },[])
  const setText = (text?:string) =>{
    if(text){
      return text
    } else {
      if(isWeather) {
      const {main,weather} = isWeather
      const sky = weather[0]
      return <dl>
        <dt>하늘 :</dt>
        <dd>
          <span>{sky.description}</span>
          <Image src={`https://openweathermap.org/img/wn/${sky.icon}.png`} alt={sky.main} width="35" height="35"/>
        </dd>
        <dt>온도 :</dt><dd>{main.temp}&#8451;</dd>
        <dt>습도 :</dt><dd>{main.humidity}%</dd>
      </dl>
      } else return '날씨 가져오는중...'
    }
  }
  const handleScroll = (e:React.UIEvent<HTMLElement>) =>{
    const scroll = Math.floor(e.currentTarget.scrollTop /  window.innerHeight * 10)*10;
    setBg(scroll)
  }
  const handleClick = (item:Tmain) =>{
    const {id,link} = item
    if(link){
      switch(id){
        case 1:
          router.push(link)
          break;
        default:
          window.open (link, '_ blank');
          break;
      }
    }
  }
  return (
    <Main bgNum={isBg}>
      <main onScroll={handleScroll}>
        <section className="gridSec">
          {list.map((item)=>{
            const {id,name,path,text,type} = item
            return ( 
            <div className={`itemBox box${id}`} key={'main'+id}>
              <h3 className="title">{type}</h3>
              <div className="contents" style={path ? {backgroundImage:`url(/images/${path})`}:{}} onClick={()=>handleClick(item)}>
                <div className="text">
                  <h4>{name}</h4>
                  <h5>{setText(text)}</h5>
                </div>
              </div>
            </div>)
          })}
        </section>
        <section className='heightSec'></section>
      </main>
    </Main>
  )
}
export default Home
