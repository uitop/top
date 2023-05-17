import styled from '@emotion/styled'
import DownRound from '@/icons/DownRound'
import RollSlick from '@/components/Rolling';
const RollWrap =styled.section`
  background-color: #00ec4f;
  height: 100vh;
  @supports (-webkit-touch-callout: none) { 
    height: -webkit-fill-available;
  }
  .text_sec{
    position: relative;
    padding:32px 0;
    text-align: center;
    background-color: #fff;
    h3{
      font-size:24px;
      line-height:34px;
      font-weight:500;
    }
    .down{
      position: absolute;
      left:50%;
      bottom:-31px;
      transform: translateX(-50%);
    }
  }
`
const Roll = () => {
  return (
    <>
      <RollWrap>
        <div className="text_sec">
          <h3>
            두근💛 두근💛<br/>
            어떤 주식을 받게 될까요?
          </h3>
          <DownRound/>
        </div>
        <RollSlick/>
      </RollWrap>
    </>
  );
}

export default Roll;
