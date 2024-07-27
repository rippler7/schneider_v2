import "./Modal.css"
import React from "react";
import eventBus from "../../eventBus";
//import lbData from '../db/leaderBoards.json';
 
var content;

  // eventBus.on('openLeaderboard', (data) => {
  //   eventBus.remove('openLeaderboard');
    
  // });

  // eventBus.on('openVote', (data) => {
  //   eventBus.remove('openVote');
  //   document.getElementById('modalContent').innerHTML = "<div id='voteContent'>Vote content</div>";
  // });

  var menuItem;
  export default function Modal(props){
    
    // eventBus.on("clickedObj",function(data){
    //   console.log("clicked Object is: "+data.clickedObj);
    //   eventBus.remove("clickedObj");
    // })
    function onCloseModal(event){
      event.stopPropagation();
      var modl = event.target.parentNode.parentNode; 
      modl.classList.remove('showModal');
      modl.classList.add('hideModal');
      event.stopPropagation();
      var blackSheet = document.getElementById('blackSheet');
      blackSheet.style.display = "none";
      blackSheet.style.zIndex = -1;
      document.querySelector('canvas').classList.remove("noClick");
    };
    eventBus.on("menuSelected",(data)=>{
      menuItem = data.selectedMenu;
      switch(menuItem){
        case "lead":
          // console.log(lbData.length);
          // content = '<ul class="scoreBoardList">';
          // for(var i=0; i< lbData.length;i++){
          //   content+='<li><a href="#">'+lbData[i].name+'</a></li>';
          // }
          content="<div id='submitContent'><img src='/assets/img/leaderBoard_ss.png' alt='' width='100%'></div>";
          document.getElementById('modalContent').innerHTML = content;         
        break;
        case "vote":
          content="<div id='submitContent'><img src='/assets/img/voteNow_ss.png' alt='' width='100%'></div>";
          document.getElementById('modalContent').innerHTML = content;
        break;
        case "submit":
          document.getElementById('modalContent').innerHTML = "<div id='submitContent'><img src='/assets/img/submitEntry_ss.png' alt='' width='100%'></div>";
        break;
        case "report":
          content="<div id='submitContent'><img src='/assets/img/report_ss.png' alt='' width='100%'></div>";
          document.getElementById('modalContent').innerHTML = content;
        break;
        case "fame":
          content = "<div id='fameContent'>"
          content+= "<div class='fameSubContent'><div id='fameSubLeft'>";
          content+= "<h3>THE RESULTS ARE OUT... WE PROUDLY PRESENT YOU THE WINNERS!</h3>";
          content+= "<p>It's been a year full of continuous improvements and you have all done an amazing job in the last 3 quarters with your innovative entries and impactful automation solutions.</p>";
          content+= "<p>As we close off the year, let's all run together towards the finish line and submit our entries for the last quarter, may it be big or small, any improvement is already a win!</p>";
          content+= "</div><div id='fameSubRight'>";
          content+= "content right";
          content+= "</div></div>";
          content += "</div>";
          // content="<div id='submitContent'><img src='/assets/img/hallFame_ss.png' alt='' width='100%'></div>";
          document.getElementById('modalContent').innerHTML = content;
        break;
        default:
          content = "<div id='homeContent'>"
          content+= "<div class='homeSubContent' id=''></div>"
          content += "</div>";
          document.getElementById('modalContent').innerHTML = content;
        break;
      }
    })
    return (
      <div id="blackSheet">
        <div id="mainModal" className="modal-wrapper">        
          <div className="modal-header">
            <h1 id="modalHeader">Welcome!</h1>
            <img id="bldgIcon" src={"/assets/img/office.png"} alt="" />
            <span className="close-modal-btn" onClick={onCloseModal}>X</span>
          </div>
          <div className="modal-content">
            <div className="modal-body">
              <div id="modalContent">
                <p>Some text inside a modal</p>
              </div>
            </div>
            <div className="modal-footer">    
            </div>
          </div>
        </div>
      </div>
    );
};
