import React from 'react';
import Head from 'next/head'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil';
import { itemList } from '@/store/zzimStore';
import SelectItem from '@/components/SelectItem';
import BookmarkIcon from '@/icons/BookmarkIcon';
import SelectedBtn from '@/components/SelectedBtn';

const SelectWrap = styled.section`
  .text_sec{
    text-align: center;
    background-color: var(--zzimBG);
    padding:10px 24px;
    h1{
      line-height: 44px;
      font-size:32px;
      font-weight: 500;
      margin: 8px 0;
    }
    h3{
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: var(--gray);
    }
  }
  .select_sec{
    padding:64px 24px;
    max-width:640px;
    margin:auto;
    .icon_list{
      padding:0;
      margin:0;
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
      justify-content: space-between;
      grid-gap: 20px 13.5px;
    }
  }
  .end_sec{
    margin-bottom:20px;
    .text_box{
      text-align: center;
      font-size:16px;
      line-height: 24px;
      svg{
        width:16px;
        vertical-align: middle;
        margin-right: 2px;
      }
    }
  }
  .sticky_sec{
    position: sticky;
    bottom:16px;
    margin-bottom:50px;
    text-align: center;
    button{
      width:90%;
      max-width:640px;
      height:60px;
      border-radius: 32px;
      border:0;
      font-weight: 500;
      font-size:18px;
      line-height: 26px;
      background-color: var(--zzimPoint);
      transition: background-color .5s;
      &:after{
        content: '받을래요. 찜!';
        vertical-align: middle;
      }
      &:disabled{
        color: var(--gray);
        background-color: var(--zzimBG);
        &:after{
          content: '3개이상 선택하세요';
        }
      }
      p{
        display: inline-flex;
        flex-direction: row-reverse;
        vertical-align: middle;
        height: 34px;
        margin-right:8px;
        >span{
          position: relative;
          margin-left:2px;
          background: url('/images/qmark.png') no-repeat 50%;
          background-size: auto 20px;
          width: 34px;
          height:34px;
          border: 2px dashed #3fbfe7;
          border-radius: 7px 14px;
          overflow: hidden;
          img{
            max-width:100%;
          }
          &:first-of-type{
            z-index: 3;
          }
          &:nth-of-type(2){
            z-index: 2;
          }
        }
        .dim{
          font-size:12px;
          color:#fff;
          line-height: 34px;
          font-weight: 500;
          svg{
            left:0;
            top:0;
            position: absolute;
            width:100%;
            height:100%;
          }
          i{
            position: absolute;
            width:34px;
            height:34px;
            top:0;
            left:0;
            font-style: normal;
            background-color: var(--alpha);
          }
        }
      }
    }
  }
`
const Select = () => {
  const list = useRecoilValue(itemList)
  return (
  <React.Fragment>
    <Head>
      <title>동물주식</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta property="description" content="돌려돌려 동물주식" />
      <meta property="og:image" content="/images/ogImage.jpg"/>
      <meta property="og:title" content="TOP 포트폴리오"/>
      <meta property="og:description" content="돌려돌려 동물주식" />
      <meta property="og:url" content="https://top-kappa.vercel.app/"/>
    </Head>
    <SelectWrap>
      <div className="text_sec">
        <h1>좋아하는 동물주식을<br/>찜하세요!</h1>
        <h3>찜한 동물주식중 하나를 최대한 많이 사볼께요.</h3>
      </div>
      <div className="select_sec">
        <ul className="icon_list">
          {list.length ? list.map((item)=>{
            return <SelectItem {...item} key={item.id}/>
          }):<div>empty</div>
        }
        </ul>
      </div>
      <div className="end_sec">
        <p className="text_box">
          <BookmarkIcon/>
          찜한 동물주식은<br/>‘내 관심’에도 넣어둘게요!
        </p>
      </div>
      <div className="sticky_sec">
        <SelectedBtn/>
      </div>
    </SelectWrap>
  </React.Fragment>
  );
}

export default Select;
