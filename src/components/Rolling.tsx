
import useAnimation from '@/hooks/useAnimation';
import useRollNumbers from '@/hooks/useRollNumbers';
import { markedList,Tdata } from '@/store/zzimStore';
import Debounce from '@/utils/Debounce';
import styled from '@emotion/styled';
import CN from 'classnames';
import Link from 'next/link';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useReward } from 'react-rewards';
import { useRecoilValue } from 'recoil';
const RollWrap = styled.div`
  margin:83px auto 0;
  overflow: hidden;
  position: relative;
  max-width: 1000px;
  .forYou{
    opacity: 0;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background: no-repeat 50%;
    z-index: 3;
    text-align: center;
    animation: fadeIn 1s ease .2s forwards;
    img{
      border-radius: 20% 0;
      animation: radiusRoll 3s ease 1.2s infinite,zoomIn 1s ease forwards;
    }
  }
  .whiteBg{
    opacity: 0;
    position: fixed;
    text-align: center;
    top:0;
    left:0;
    width:100%;
    height: 100vh;
    padding-top: 80vh;
    background-color:#fff;
    z-index: 2;
    box-sizing: border-box;
    animation: fadeIn 1s ease .9s forwards;
    @supports (-webkit-touch-callout: none) { 
      height:-webkit-fill-available;
    }
    a{
      display:inline-block;
      padding: 20px;
      border-radius: 5px;
      box-shadow: inset 0 0 8px 1px #cecdcd;
      opacity: 0;
      animation: fadeIn 1s ease 3s forwards;
      text-decoration: none;
      position: relative;
      z-index: 5;
    }
  }
  @keyframes radiusRoll {
    0%{
      border-radius: 20% 0;
    }
    50%{
      border-radius: 0 20%;
    }
    100%{
      border-radius: 20% 0;
    }
  }
  @keyframes zoomIn {
    0%{
      padding: 5%;
      height:90%;
    }
    100%{
      padding: 0;
      height: 100%;
    }
  }
  @keyframes fadeIn {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
`
const RollList = styled.ul<{rollEnd:boolean,rollWidth:string}>`
  margin:20px 0;
  white-space: nowrap;
  margin-left:-8%;
  font-size: 0;
  transition: ${({rollEnd})=>rollEnd ?`4s`:`.1s`};
  transition-timing-function: cubic-bezier(1.000, 0.080, 0.550, 1.215);
  position: relative;
  &.rolling{
    transform: ${({rollWidth})=>rollWidth};
  }
  li{
    display: inline-block;
    width:36%;
    padding:3px 0;
    text-align:center;
    img{
      width:90%;
      border-radius: 20%;
      ${prop=>!prop.rollEnd &&`filter: blur(2px);`}
      transition: .5s;
    }
    &.empty{
      width:calc(36% * 3);
      font-size:20px;
      text-align:center;
    }
  }
`
const RollSlick = () => {
  const rollWrap = useRef<HTMLUListElement>(null)
  const [isRoll,setRoll] = useState(true)
  const [isItemWidth,setItemWidth] = useState(0)
  const list = useRecoilValue(markedList)
  const [length,multi,giftNum,maxCount] = useRollNumbers(list as Tdata[]);
  const [shouldRender, handleTransitionEnd] = useAnimation(isRoll);
  const { reward } = useReward('rewardSpan', 'confetti');
  const getItem = (idx:number):Tdata =>{
    return list[idx] as Tdata
  }
  const getItemWidth = Debounce(()=>{
    const item = rollWrap.current?.firstChild as HTMLElement
    rollWrap.current && setItemWidth(item.offsetWidth*maxCount)
  },600)
  useEffect(()=>{
    setRoll(false)
    getItemWidth()
  },[maxCount,length])
  useEffect(()=>{
    window.addEventListener('resize',getItemWidth);
    return ()=> window.addEventListener('resize',getItemWidth);
  },[getItemWidth])
  useEffect(()=>{
    length && !shouldRender&&reward()
  },[shouldRender,reward,length])
  const setLoopList = useCallback(() => {
    const arrHtml = [] as ReactElement[]
    const arrPush = (num:number,key:number) => {
      const {id,path} = getItem(num)
      arrHtml.push(<li key={id+String(key)}><img src={`/images/${path}`}  alt="추천후보"/></li>)}
    let step = 0,loop = 1, stop = true;
    while (stop) {
      if(step === length){
        if(loop < multi){step = 0;loop++}
      }
      if(step === length){
        switch(giftNum) {
          case (length -2) :
            break;
          case (length -1) :
            arrPush(0,loop+1)
            break;
          default:
            arrPush(giftNum,loop+1)
            arrPush(giftNum+1,loop+1)
            break;
        }
        break
      }
      arrPush(step,loop)
      step++
    }
    return arrHtml
  },[giftNum, length, list, multi,getItem])
  return <RollWrap className='rollIcon_sec'>
    <RollList ref={rollWrap}
    onTransitionEnd={handleTransitionEnd}
    rollEnd={shouldRender}
    rollWidth={`translateX(-${isItemWidth}px)`}
    className={CN({'rolling':!isRoll})}>
      { length ? setLoopList():<li className="empty"><Link href="/zzim">찜먼저 하기</Link></li>}
    </RollList>
    {!!length && !shouldRender && <>
      <div className="forYou">
        <img src={`/images/${getItem(giftNum).path}`} alt={getItem(giftNum).name} />
        <span id="rewardSpan" />
      </div>
      <div className="whiteBg">
        <Link href="/zzim">찜하기로 돌아가기</Link>
      </div>
    </>}
  </RollWrap>
}

export default RollSlick