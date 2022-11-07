const list20102011 = require("./s2010-2011");
const list20082009 = require("./s2008-2009");
const list20182019 = require("./s2018-2019");

const m20210502 = `04:38 trivela pass
04:54 missed pen but still goal :> 
06:49 last freekick goal of Barca (until now)`


const m20130818 = `00:59 1st goal ⚽️ 
02:25 what stat cant show
03:20 nice through ball =>  🅰️
04:06 chip shot 
05:45 2nd goal ⚽️ 
`

// -- s2010-2011

const matchScripts = Object.assign({}, 
    list20102011, 
    list20082009,
    list20182019, 
    {
        m20210502,
        m20130818,
    }
);

module.exports =  {
    matchScripts
}