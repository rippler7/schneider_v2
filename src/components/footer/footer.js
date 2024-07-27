import "./footer.css";
import React, { Suspense } from 'react';
import eventBus from "../../eventBus";
var tId, currTarget;
var headerTitle = '';
class footer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMenu:"",
      modalStats:"",
      clickedObj:"",
      targetObject:'',
      cam:''
    }
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentDidMount(){
    eventBus.remove("menuSelected");
    eventBus.remove("clickedObj");
    let modl = document.getElementById("mainModal");
    modl.classList.add('hideModal');
    modl.classList.remove('showModal');
  }
  
  async onButtonClick(event){
    eventBus.remove("menuSelected");
    eventBus.remove("clickedObj");
    console.log('clicked!');
    event.stopPropagation();
    var blackSheet = document.getElementById('blackSheet');
    blackSheet.style.display = "flex";
    blackSheet.style.zIndex = 1;
    //-----------------------------------------------------
    let modl = document.getElementById("mainModal");
    let header = document.getElementById("modalHeader");
    currTarget = event.target;
    modl.classList.remove('hideModal');
    modl.classList.add('showModal');
    document.querySelector('canvas').classList.add("noClick");
   
    var cObj;
    var icon;
    if(currTarget.tagName === 'IMG'){
      tId = currTarget.getAttribute("data-btnname");
      console.log(header);
      switch (tId){
        case 'fame':
          headerTitle = 'Hall of Fame';
          cObj="podiumSimple";
          icon = "podium.png";
          eventBus.dispatch("openFame",{selectedMenu:tId});
        break;
        case 'lead':
          headerTitle = 'Leaderboards';
          cObj="FSt_Fra_002";
          icon = "stadSW.png";
          eventBus.dispatch("openLeaderboard",{selectedMenu:tId});
        break;
        case 'vote':
          headerTitle = 'Vote Now';
          cObj="SchoolMesh";
          icon = "academy.png";
          eventBus.dispatch("openVote",{selectedMenu:tId});
        break;
        case 'submit':
          headerTitle = 'Submit Entry';
          cObj="Office_buildingMesh";
          icon = "office.png";
          eventBus.dispatch("openSubmit",{selectedMenu:tId});
        break;
        case 'report':
          headerTitle = 'Submission List';
          cObj='houseBldg';
          icon = "house.png";
          eventBus.dispatch("openReport",{selectedMenu:tId});
        break;
        default:
          headerTitle = "Home"
          cObj='grouped';
          icon = "academy.png";
          break;
      }
      this.setState({selectedMenu:tId,clickedObj:cObj});
      eventBus.dispatch("menuSelected",{selectedMenu:tId, modalStat:"opened",clickedObj:cObj});
      document.getElementById("bldgIcon").setAttribute("src","./assets/img/"+icon);
      header.innerHTML = headerTitle;
    }
  //---------------------------------------------------------------

  // document.addEventListener("onObjSelection", function(e){
  //   console.log("selected Object as the footer detects is: "+data.clickedObj);
  // });

  eventBus.on("clickedObj",(data) => {    
    eventBus.remove("clickedObj");
    console.log("selected Object as the footer detects is: "+data.clickedObj);
    // var onObjSelection = new CustomEvent('onObjSelection',{'clickedObj':data.clickedObj});
    // document.dispatchEvent(onObjSelection,data.clickedObj);
    //this.fClickObj(data);
  });
  }

  // async fClickObj(data){
  //   eventBus.remove("clickedObj");
  //   var year, quarter;
  //   let modl = document.getElementById("mainModal");
  //   let header = document.getElementById("modalHeader");
  //   let eventClick = new Event('click');
  //   console.log('currBtn is: ');
  //   console.log(currBtn);
  //   switch (data.clickedObj){
  //     case 'fame':
  //       tId = 'fame'
  //       headerTitle = 'Hall of Fame';
  //       currTarget = document.getElementById('btn_Fame');
  //     break;
  //     case 'FSt_Fra_002':
  //       tId = 'lead';
  //       year = 2022;
  //       quarter = 'Q1';
  //       headerTitle = 'Leaderboards: '+quarter+' '+year;
  //       currTarget = document.getElementById('btn_Lead');
  //     break;
  //     case 'Fst_Eng_002':
  //       tId = 'lead';
  //       year = 2022;
  //       quarter = 'Q2';
  //       headerTitle = 'Leaderboards: '+quarter+' '+year;
  //       currTarget = document.getElementById('btn_Lead');
  //     break;
  //     case 'FSt_Ita_003':
  //       tId = 'lead';
  //       year = 2022;
  //       quarter = 'Q3';
  //       headerTitle = 'Leaderboards: '+quarter+' '+year;
  //       currTarget = document.getElementById('btn_Lead');
  //     break;
  //     case 'FSt_Fra_003':
  //       tId = 'lead';
  //       year = 2022;
  //       quarter = 'Q4';
  //       headerTitle = 'Leaderboards: '+quarter+' '+year;
  //       currTarget = document.getElementById('btn_Lead');
  //     break;
  //     case 'SchoolMesh':
  //       tId = 'vote'
  //       headerTitle = 'Vote Now';
  //       currTarget = document.getElementById('btn_Vote');
  //     break;
  //     case 'Office_buildingMesh':
  //       tId = 'submit'
  //       headerTitle = 'Submit Entry';
  //       currTarget = document.getElementById('btn_Entry');
  //     break;
  //     case 'report':
  //       tId = 'report'
  //       headerTitle = 'Submission List';
  //       currTarget = document.getElementById('btn_Report');
  //     break;
  //     default:
  //       headerTitle = "Home"
  //       tId = 'home'
  //       break;
  //   }
  //   currBtn = currTarget.parentNode;
  //   console.log(currBtn);
  //   modl.classList.remove('hideModal');
  //   modl.classList.add('showModal');
  //   header.innerHTML = headerTitle;
  //   var blackSheet = document.getElementById('blackSheet');
  //   blackSheet.style.display = "flex";
  //   blackSheet.style.zIndex = 1;
    
  // }

  render = () => {
    return (  
      <Suspense>
      <div className="footer" ref={ref => (this.mount = ref)}>
          <div className="col-lgl12">
          <button className="btn mainMenuItem" onClick={this.onButtonClick}>
                <img className="mainItemBtn" id="btn_Fame" src="./assets/img/mFame.png" data-btnname="fame" alt="" width="80" /><br />
                FAME
            </button>
            <button className="btn mainMenuItem" onClick={this.onButtonClick}>
                <img className="mainItemBtn" id="btn_Lead" src="./assets/img/mLead.png" data-btnname="lead" alt="" width="80" />
                <br />
                LEADERBOARDS
            </button>
            <button className="btn mainMenuItem" onClick={this.onButtonClick}>
                <img className="mainItemBtn" id="btn_Vote" src="./assets/img/mVote.png" data-btnname="vote" alt="" width="80" />
                <br />
                VOTE NOW
            </button>
            <button className="btn mainMenuItem" onClick={this.onButtonClick}>
                <img className="mainItemBtn" id="btn_Entry" src="./assets/img/mEntry.png" data-btnname="submit" alt="" width="80" />
                <br />
                SUBMIT ENTRY
            </button>
            <button className="btn mainMenuItem" onClick={this.onButtonClick}>
                <img className="mainItemBtn" id="btn_Report" src="./assets/img/mReport.png" data-btnname="report" alt="" width="80" />
                <br />
                SUBMISSION LIST
            </button>
            <button className="btn mainMenuItem" onClick={this.onButtonClick}>
                <img className="mainItemBtn" id="btn_Home" src="./assets/img/mHome.png" data-btnname="home" alt="" width="80" />
                <br />
                HOME
            </button>
          </div>
        </div>
        </Suspense>
    );
  }
}

export default footer;

