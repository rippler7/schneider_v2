import "./footer.css";
import React from "react";

function template() {
  return (
    <div className="footer">
      <div className="col-lgl12">
      <button className="btn mainMenuItem" onClick={ this.buttonClick }>
            <img className="mainItemBtn" id="btn_Fame" src="/assets/img/menuFame.png" data-btnname="fame" alt="" />
        </button>
        <button className="btn mainMenuItem" onClick={ this.buttonClick }>
            <img className="mainItemBtn" id="btn_Lead" src="/assets/img/menuLead.png" data-btnname="lead" alt="" />
        </button>
        <button className="btn mainMenuItem" onClick={ this.buttonClick }>
            <img className="mainItemBtn" id="btn_Vote" src="/assets/img/menuVote.png" data-btnname="vote" alt="" />
        </button>
        <button className="btn mainMenuItem" onClick={ this.buttonClick }>
            <img className="mainItemBtn" id="btn_Entry" src="/assets/img/menuEntry.png" data-btnname="submit" alt="" />
        </button>
        <button className="btn mainMenuItem" onClick={ this.buttonClick }>
            <img className="mainItemBtn" id="btn_Report" src="/assets/img/menuReport.png" data-btnname="report" alt="" />
        </button>
        <button className="btn mainMenuItem" onClick={ this.buttonClick }>
            <img className="mainItemBtn" id="btn_Home" src="/assets/img/menuHome.png" data-btnname="home" alt="" />
        </button>
      </div>
    </div>
  );


};

export default template;
