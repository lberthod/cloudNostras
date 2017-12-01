var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
  
    onDeviceReady: function() {
		var parentElement = document.getElementById('deviceready');
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');      SummitClock.startClock();
    },
    receivedEvent: function(id) {
    }
};
