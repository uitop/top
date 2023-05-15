
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReward } from 'react-rewards';
import { useRecoilValue } from 'recoil';
import CN from 'classnames';
import styled from '@emotion/styled'
import { markedList } from '@/store/store';
import useAnimation from '@/hooks/useAnimation';
import useRollNumbers from '@/hooks/useRollNumbers';
import Debounce from '@/utils/Debounce';
import Link from 'next/link';
const RollWrap = styled.div`
  margin-top:83px;
  overflow: hidden;
  position: relative;
  .forYou{
    opacity: 0;
    position: absolute;
    left:0;
    top:-15px;
    width:100%;
    height:calc(100% + 30px);
    background: no-repeat 50%;
    z-index: 3;
    animation: fadeIn 1s ease .2s forwards;
    text-align: center;
  }
  .whiteBg{
    opacity: 0;
    position: fixed;
    text-align: center;
    top:0;
    left:0;
    width:100%;
    height: 100vh;
    background-color:#fff;
    z-index: 2;
    animation: fadeIn 1s ease .7s forwards;
    a{
      opacity: 0;
      position: absolute;
      bottom:10px;
      left:0;
      width:100%;
      animation: fadeIn 1s ease 3s forwards;
    }
    @supports (-webkit-touch-callout: none) { 
      height:-webkit-fill-available;
    }
  }
  @keyframes fadeIn {
    from{
      opacity: 0;
      background-size: auto calc(100% - 70px);
    }
    to{
      opacity: 1;
      background-size: auto calc(100% - 50px);
    }
  }
`
const RollList = styled.ul`
  margin:20px 0;
  white-space: nowrap;
  margin-left:-8%;
  font-size: 0;
  transition: ${prop=>prop.rollEnd ?`3s`:`.1s`};
  transition-timing-function: cubic-bezier(1.000, 0.080, 0.550, 1.215);
  position: relative;
  &.rolling{
    transform: ${prop=>prop.rollWidth};
  }
  li{
    display: inline-block;
    width:36%;
    padding:3px 0;
    p{
      width:100%;
      padding-top:75%;
      background: no-repeat 50%;
      background-size: auto 100%;
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
  const rollWrap = useRef(null)
  const [isRoll,setRoll] = useState(true)
  const [isItemWidth,setItemWidth] = useState(0)
  const list = useRecoilValue(markedList)
  const [length,multi,giftNum,maxCount] = useRollNumbers(list);
  const [shouldRender, handleTransitionEnd] = useAnimation(isRoll);
  const { reward } = useReward('rewardSpan', 'confetti');
  const getItemWidth = Debounce(()=>{
    setItemWidth(rollWrap.current.children[0].offsetWidth*maxCount)
  },800)
  useEffect(()=>{
    setRoll(false)
    length && setItemWidth(rollWrap.current.children[0].offsetWidth*maxCount)
  },[maxCount,length])
  useEffect(()=>{
    window.addEventListener('resize',getItemWidth);
    return ()=> window.addEventListener('resize',getItemWidth);
  },[getItemWidth])
  useEffect(()=>{
    length && !shouldRender&&reward()
  },[shouldRender,reward,length])
  const setLoopList = useCallback(() => {
    const arrHtml = []
    const arrPush = (num,key) => arrHtml.push(<li key={list[num].id+String(key)}><p style={{backgroundImage:`url(/images/${list[num].logo})`}} ></p></li>)
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
  },[giftNum, length, list, multi])
  return <RollWrap className='rollIcon_sec'>
    <RollList ref={rollWrap}
    onTransitionEnd={handleTransitionEnd}
    rollEnd={shouldRender}
    rollWidth={`translateX(-${isItemWidth}px)`}
    className={CN({'rolling':!isRoll})}>
      { length ? setLoopList():<li className="empty"><Link href="/zzim">찜먼저 하기</Link></li>}
    </RollList>
    {!!length && !shouldRender && <>
      <div className="forYou" style={{backgroundImage:`url(/images/${list[giftNum].logo})`}} >
        <span id="rewardSpan" />
      </div>
      <div className="whiteBg">
        <Link href="/zzim">찜하기로 돌아가기</Link>
      </div>
    </>}
  </RollWrap>
}

export default RollSlick