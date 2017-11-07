SummitClock  = {
  twoDigits: function(v) {
    return ("0" + v).slice(-2);
  },
  updateTime: function() {
    var c = document.getElementById('clock');
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var secs = now.getSeconds();
    c.innerHTML = [SummitClock.twoDigits(hours), SummitClock.twoDigits(minutes), SummitClock.twoDigits(secs)].join(":");
    var msecs = (secs * 1000 + now.getMilliseconds());

  },
  startClock: function() {
    setInterval(SummitClock.updateTime, 100);
  }
};
