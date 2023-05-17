import { atom} from "recoil"
export type Tmain= {
  id: number,
  type: 'ShowCase'|'About'|'RecentWork',
  path?: string,
  name: string,
  text: string,
  link?: string,
}

export const mainList = atom<Tmain[]>({
  key:'mainList',
  default:[{
    id:1,
    type:'ShowCase',
    path:'item009.jpg',
    name:'선택/추첨UI',
    text:'K증권 주식증정 이벤트 참고했습니다.\n아이템을 선택후 랜덤으로 추첨 하는 UI\nNEXT + Typescript',
    link:'/zzim'
  },{
    id:2,
    type:'ShowCase',
    path:'main02.jpg',
    name:'이력서',
    text:'간단한 자기소개와\n진행했던 프로젝트를 기록 했습니다.\njQuery + SCSS',
    link:'https://uitop.github.io/ui/'
  },{
    id:3,
    type:'ShowCase',
    path:'main03.jpg',
    name:'웹메모장',
    text:'스티커메모장 입니다.\n로컬스토리지에 저장합니다. UI\njQuery',
    link:'https://uitop.github.io/ui/jstk'
  },{
    id:4,
    type:'ShowCase',
    path:'main04.jpg',
    name:'해커뉴스',
    text:'타입스크립트 스터디 코드입니다.\nTypescript',
    link:'https://github.com/uitop/practice_ts'
  },{
    id:5,
    type:'About',
    name:'내꿈은 Only1',
    text:'그리고 기차타고 유럽가기\n스크롤 해보세요\n잘 부탁드립니다.',
  },{
    id:6,
    type:'RecentWork',
    path:'main05.jpg',
    name:'서울스토어',
    text:'브랜디에서 진행한 업무입니다.\n메인/홈메뉴/마이페이지\n NEXT + Typescript',
    link:'https://www.seoulstore.com/'
  },{
    id:7,
    type:'RecentWork',
    path:'main06.jpg',
    name:'브랜디',
    text:'브랜디에서 진행한 업무입니다.\n유지보수\nVue',
    link:'https://www.brandi.co.kr/'
  },{
    id:8,
    type:'RecentWork',
    path:'main07.jpg',
    name:'KAIDA',
    text:'이너인포에서 진행한 업무입니다.\n프론트 전반\njQuery + SCSS',
    link:'https://www.kaida.co.kr/ko/index.do?language=ko'
  },{
    id:9,
    type:'RecentWork',
    path:'main08.jpg',
    name:'행복쇼핑 이벤트',
    text:'이너인포에서 진행한 업무입니다.\n프론트 전반\nReact',
    link:'https://event.pping.kr/'
  }]
})
