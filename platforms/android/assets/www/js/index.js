
(function () {
	"use strict";

	var userStorage = window.localStorage;


	var client, // Connection to the Azure Mobile App backend
		store,  // Sqlite store to use for offline data sync
		syncContext, // Offline data sync context
		userName = 'user',
		remarksName = 'remarks',
		categoryName = 'category',
		plantsName = 'plants',
		sizeName = 'size',
		stepName = 'step',
		photoName = 'photo',
		user = 'nobody',


		userTable,
		remarksTable,
		categoryTable,
		plantsTable,
		photoTable,
		sizeTable,
		stepTable;

	// Set useOfflineSync to true to use tables from local store.
	// Set useOfflineSync to false to use tables on the server.
	var useOfflineSync = false;

	// Add an event listener to call our initialization routine when the host is ready
	document.addEventListener('deviceready', onDeviceReady, false);

    /**
     * Event Handler, called when the host is ready
     *
     * @event
     */
	function onDeviceReady() {
		// Create a connection reference to our Azure Mobile Apps backend 
		client = new WindowsAzure.MobileServiceClient('https://cloudnostras.azurewebsites.net');

		if (useOfflineSync) {
			initializeStore().then(setup);
		} else {
			setup();
		}
	}

    /**
     * Set up and initialize the local store.
     */
	function initializeStore() {
		// Create the sqlite store
		store = new WindowsAzure.MobileServiceSqliteStore();

		store.defineTable({
			name: userName,
			columnDefinitions: {
				id: 'string',
				text: 'string',
				deleted: 'boolean',
				password: 'string'
			}
		});

		store.defineTable({
			name: remarksName,
			columnDefinitions: {
				id: 'string',
				deleted: 'boolean',
				text: 'string',
				complete: 'boolean',
				version: 'string'
			}
		});

		store.defineTable({
			name: categoryName,
			columnDefinitions: {
				id: 'string',
				deleted: 'boolean',
				text: 'string',
				complete: 'boolean',
				version: 'string'
			}
		});

		store.defineTable({
			name: plantsName,
			columnDefinitions: {
				id: 'string',
				deleted: 'boolean',
				text: 'string',
				complete: 'boolean',
				version: 'string'
			}
		});

		store.defineTable({
			name: sizeName,
			columnDefinitions: {
				id: 'string',
				deleted: 'boolean',
				text: 'string',
				complete: 'boolean',
				version: 'string'
			}
		});

		store.defineTable({
			name: photoName,
			columnDefinitions: {
				id: 'string',
				deleted: 'boolean',
				text: 'string',
				complete: 'boolean',
				version: 'string'
			}
		});
		// Define the table schema
		return store.defineTable({
			name: stepName,
			columnDefinitions: {
				id: 'string',
				deleted: 'boolean',
				text: 'string',
				complete: 'boolean',
				version: 'string'
			}

		}).then(function () {
			// Initialize the sync context
			syncContext = client.getSyncContext();

			syncContext.pushHandler = {
				onConflict: function (pushError) {
					return pushError.cancelAndDiscard();
				},
				onError: function (pushError) {
					return pushError.cancelAndDiscard();
				}
			};

			return syncContext.initialize(store);
		});
	}

    /**
     * Set up the tables, event handlers and load data from the server 
     */
	function setup() {

		// Create a table reference
		if (useOfflineSync) {
			userTable = client.getSyncTable(userName),
				remarksTable = client.getSyncTable(remarksName),
				categoryTable = client.getSyncTable(categoryName),
				plantsTable = client.getSyncTable(plantsName),
				sizeTable = client.getSyncTable(sizeName),
				photoTable = client.getSyncTable(photoName),
				stepTable = client.getSyncTable(stepName);

		} else {
			userTable = client.getTable(userName),
				remarksTable = client.getTable(remarksName),
				categoryTable = client.getTable(categoryName),
				plantsTable = client.getTable(plantsName),
				sizeTable = client.getTable(sizeName),
				photoTable = client.getTable(photoName),
				stepTable = client.getTable(stepName);

		}

		refreshDisplay();

		$('#refresh').on('click', refreshDisplay);
		$("#testUser").on('click', alertUser);
		$('#addUserCloud').on('click', addUser);

	}


	function refreshDisplay() {

		if (useOfflineSync) {
			syncLocalTable().then(displayUsers);
		} else {
			displayUsers();
		}
	}

	function syncLocalTable() {
		return syncContext
			.push()
			.then(function () {
				return syncContext.pull(new WindowsAzure.Query(tableName));
			});
	}

	function displayUsers() {
		userTable
			.where({ deleted: false })    
			.read()                      
			.then(createUserList, handleError);
	}



	function createUser(userr) {
		return $('<div>')
			.attr('data-user-id', userr.id)
			//  .append($('<button class="item-delete">Delete</button>'))
			//  .append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
			//	.append($('<div>')
			.append($('<p class="item-name">').text(userr.name))
			// .append($('<button class="user-delete">Delete</button>'))
			.append($('<button class="user-choose">Choose</button>'))
			.append($('<br>'))
			;
	}


	function createUserList(items) {
		var listItems = $.map(items, createUser);
		$('#todo-user').empty().append(listItems).toggle(listItems.length > 0);

		$('.user-delete').on('click', deleteUser);
		$('.user-choose').on('click', chooseUser);

		//$('.item-text').on('change', updateItemTextHandler);
		//	$('.item-password').on('change', updateItemCompleteHandler);
	}

 
	function handleError(error) {
		var text = error + (error.request ? ' - ' + error.request.status : '');
		console.error(text);
		$('#errorlog').append($('<li>').text(text));
	}


	function getUser(el) {
		return $(el).closest('div').attr('data-user-id');
	}


	function addUser(event) {
		var textbox = $('#userNameAdd'),
			itemText = textbox.val();

		if (itemText !== '') {
			userTable.insert({
				name: itemText,
				password: itemText
			}).then(displayItems, handleError);
		}

		//  textbox.val('').focus();
		event.preventDefault();
	}

	function deleteUser(event) {
		var itemId = getUser(event.currentTarget);
		userTable
			.del({ id: itemId })   // Async send the deletion to backend
			.then(displayItems, handleError); // Update the UI
		event.preventDefault();
	}


	function chooseUser(event) {
		var user1 = getUser(event.currentTarget);
		userTable
			.where({ id: user1 })     // Set up the query
			.read()                         // Read the results
			.then(UserList, handleError);
		event.preventDefault();
	}

	function UserList(items) {
		var listItems = $.map(items, infoUser);
		
	}
	function infoUser(item) {
		user = item.name;
		userStorage.setItem(0, (item.name));
	}

	

	function updateItemTextHandler(event) {
		var itemId = getUser(event.currentTarget),
			newText = $(event.currentTarget).val();

		updateSummaryMessage('Updating Item in Azure');
		userTable
			.update({ id: itemId, text: newText })  // Async send the update to backend
			.then(displayItems, handleError); // Update the UI
		event.preventDefault();
	}


	function updateItemCompleteHandler(event) {
		var itemId = getUser(event.currentTarget),
			isComplete = $(event.currentTarget).prop('checked');

		updateSummaryMessage('Updating Item in Azure');
		userTable
			.update({ id: itemId, complete: isComplete })  // Async send the update to backend
			.then(displayItems, handleError);        // Update the UI
	}

	function alertUser() {
		alert(userStorage.getItem(userStorage.key(0)));	
	}
})();