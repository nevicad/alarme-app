window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome

let ip4 = ''
let alarmIp = ''

var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
pc.createDataChannel('');//create a bogus data channel
pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
pc.onicecandidate = (ice) => {
 if (ice && ice.candidate && ice.candidate.candidate)
 {
  var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
  console.log('my IP: ', myIP);
  ip4 = myIP
  pc.onicecandidate = noop;
 }
};


function searchAlarms() {
  document.getElementById('search-btn').style.display = 'none';
  document.getElementById('spinner').style.display = 'inline-block';
  let ipObj = ip4.split('.')
  console.log(ipObj)
  let found = false

  for (let i = 1; i < 254; i++){
    const ipToTry = `${ipObj[0]}.${ipObj[1]}.${ipObj[2]}.${i}`
    document.getElementById('scanning').innerHTML = `Escaneando...`
    const Http = new XMLHttpRequest();
    const req = `http://${ipToTry}/ping`
    Http.open("GET", req);
    Http.send();
    Http.onreadystatechange=(e)=>{
      if (Http.responseText === 'true'){
        document.getElementById('search-btn').style.display = 'initial';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('scanning').innerHTML = `Alarma encontrada ${ipToTry}`
        alarmIp = ipToTry
        found = true
        return 
      }
    }
  }

  setTimeout(() => {
    if (!found) {
      document.getElementById('search-btn').style.display = 'initial';
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('scanning').innerHTML = `No se encontró alarma en red local`
    }
  }, 22000);
}

function displayAddForm () {
  document.getElementById('add-form').style.display = 'block'
}

function postAlarm () {
  const jsonAlarm = {"title":"","time":document.getElementById('timeInput').value + ':15',"repetition":"una vez","on":true}
  console.log(jsonAlarm)

  var xhr = new XMLHttpRequest();
  xhr.open('POST', `http://${alarmIp}/alarms`);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(jsonAlarm))
  xhr.onload = function () {
    // do something to response
    if (this.responseText === '{"response":true}') {
      showToast();
    }
    // console.log(this.responseText);
  };
}

function showToast() {
  document.getElementById('toast').style.bottom = '20px'
  setTimeout(() => {
    document.getElementById('toast').style.bottom = '-100px'
  }, 1000);
}