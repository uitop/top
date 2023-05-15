
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil';
import { itemList } from '@/store/store';
import SelectItem from '@/components/SelectItem';
import BookmarkIcon from '@/icons/BookmarkIcon';
import SelectedBtn from '@/components/SelectedBtn';
const SelectWrap =styled.section`
  padding:0 24px;
  .text_sec{
    text-align: center;
    h1{
      line-height: 44px;
      font-size:32px;
      font-weight: 500;
      margin: 8px 0;
    }
    h3{
      color: #060b1148;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }
  .select_sec{
    margin:64px 0;
    .icon_list{
      padding:0;
      margin:0;
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
      justify-content: space-between;
      grid-gap: 20px 13.5px;
 
      .icon_box{
        position: relative;
        width:100px;
        text-align: center;
        .icon_btn{
          width:100px;
          height:100px;
          border:0;
          margin-bottom:6px;
          background: url('/images/itembg.png') no-repeat 0 0;
          background-size: 100px 100px;
          .marked{
            position: absolute;
            top:0;
            left:0;
            .bookmarkIcon{
              position: absolute;
              top:22px;
              left:22px;
              width:56px;
              height:56px;
            }
          }
        }
        .icon_title{
          font-size:16px;
          white-space: nowrap;
          line-height: 24px;
          &::before{
            content: "";
            margin-left: -100%;
          }
          &::after{
            content: "";
            margin-right: -100%;
          }
        }
        .icon_text{
          color:#060b1148;
          font-size:12px;
          line-height: 18px;
        }
      }
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
        vertical-align: text-top;
        margin-right: 2;
      }
    }
  }
  .sticky_sec{
    position: sticky;
    bottom:16px;
    margin-bottom:50px;
    button{
      width:100%;
      height:60px;
      border-radius: 32px;
      border:0;
      font-weight: 500;
      font-size:18px;
      line-height: 26px;
      background-color: #FFEB00;
      transition: background-color .5s;
      font-family: 'kakaopay System Sans';
      &:after{
        content: '받을래요. 찜!';
        vertical-align: middle;
      }
      &:disabled{
        background-color: #FFF9BF;
        color:#060B1124;
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
          margin-left:-4px;
          background: url('/images/emptyBg.png') no-repeat 0;
          background-size: 34px 34px;
          width: 34px;
          height:34px;
          transition: background-image .3s;
          &:first-of-type{
            z-index: 3;
          }
          &:nth-of-type(2){
            z-index: 2;
          }
          >span{
            position: absolute;
            width:32px;
            height:32px;
            top:1px;
            left:1px;
            background: no-repeat 0;
            background-size: 32px 32px;
            font-style: normal;
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
            position: relative;
            z-index: 2;
          }
        }
      }
    }
  }
`
const Select = () => {
  const list = useRecoilValue(itemList)
  return (
    <SelectWrap>
      <div className="text_sec">
        <h1>받고 싶은 주식<br/>찜하세요!</h1>
        <h3>고른 주식 중 하나를 최대 500만원어치 드릴게요.</h3>
      </div>
      <div className="select_sec">
        <ul className="icon_list">
          {list.length ? list.map((item)=>{
            return <SelectItem data={item} key={item.id}/>
          }):<div>empty</div>
        }
        </ul>
      </div>
      <div className="end_sec">
        <p className="text_box">
          <BookmarkIcon/>
          찜한 주식은<br/>‘내 관심’에도 넣어둘게요!
        </p>
      </div>
      <div className="sticky_sec">
        <SelectedBtn/>
      </div>
    </SelectWrap>
  );
}

export default Select;
