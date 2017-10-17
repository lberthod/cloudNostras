
(function () {
	"use strict";

	var localStorage = window.localStorage;



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
				title: 'string',
				text: 'string',
				complete: 'boolean',
				version: 'string'
			}
		});

		store.defineTable({
			name: plantsName,
			columnDefinitions: {
				id: 'string',
				category: 'string',
				num: 'number',
				name: 'string',
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
		$('#addCategoryCloud').on('click', addCategory);
		$('#addPlantCloud').on('click', addPlants);
		$('#nextPlants').on('click', nextPlants);
		$('#lastPlants').on('click', lastPlants);




		$('#goVariety').on('click', goVariety);
	}


	function refreshDisplay() {
		if (useOfflineSync) {
			syncLocalTable().then(displayUsers);
		} else {
			displayUsers();
			displayCategories();
		}
	}

	function syncLocalTable() {
		return syncContext
			.push()
			.then(function () {
				return syncContext.pull(new WindowsAzure.Query(tableName));
			});
	}

	function handleError(error) {
		var text = error + (error.request ? ' - ' + error.request.status : '');
		console.error(text);
		$('#errorlog').append($('<li>').text(text));
	}


	// method for user----------------------------------------------------------------------------------------------------USER

	function displayUsers() {
		userTable
			.where({ deleted: false })
			.read()
			.then(createUserList, handleError);
	}



	function createUser(userr) {
		return $('<div>')
			.attr('data-user-id', userr.id)
			.append($('<p class="item-name">').text(userr.name))
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

		textbox.val('').focus();
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
		localStorage.setItem(0, (item.name));
	}
	// end method for user

	// method for category--------------------------------------------------------------------------------------------CATEGORY
	function displayCategories() {
		categoryTable
			.where({ deleted: false })
			.read()
			.then(createCategoryList, handleError);
	}

	function createCategory(cat) {
		return $('<option>')
			.attr('data-cat-id', cat.title)
			.text(cat.title)
			;
	}

	function createCategoryList(items) {
		var listItems = $.map(items, createCategory);
		var listItems1 = $.map(items, createCategory);
		var listItems2 = $.map(items, createCategory);

		$('#todo-cat').empty().append(listItems).toggle(listItems.length > 0);
		$('#todo-cat2').empty().append(listItems1).toggle(listItems1.length > 0);
		$('#todo-cat3').empty().append(listItems2).toggle(listItems2.length > 0);

		$('.cat-delete').on('click', deleteCategory);
		$('.cat-choose').on('click', chooseCategory);
	}

	function getCategory(el) {
		return $(el).closest('select').attr('data-cat-id');
	}

	function addCategory(event) {
		var nameBox = $('#categoryNameAdd'),
			nameText = nameBox.val();

		var infoBox = $('#categoryInfoAdd'),
			infoText = infoBox.val();


		if (nameText !== '') {
			categoryTable.insert({
				title: nameText,
				text: infoText
			}).then(displayCategories, handleError);
		}

		//  textbox.val('').focus();
		event.preventDefault();
	}

	function updateItemTextHandler(event) {
		var itemId = getUser(event.currentTarget),
			newText = $(event.currentTarget).val();

		userTable
			.update({ id: itemId, text: newText })  // Async send the update to backend
			.then(displayCategories, handleError); // Update the UI
		event.preventDefault();
	}

	function updateItemCompleteHandler(event) {
		var itemId = getUser(event.currentTarget),
			isComplete = $(event.currentTarget).prop('checked');

		userTable
			.update({ id: itemId, complete: isComplete })  // Async send the update to backend
			.then(displayCategories, handleError);        // Update the UI
	}

	function alertUser() {
		alert(localStorage.getItem(localStorage.key(0)));
		alert(localStorage.getItem(localStorage.key(1)));
	}

	function goVariety(event) {
		var cat = $('#todo-cat2').val();
		localStorage.setItem(1, (cat));
		$('#nameVariety').text(cat);
		findCategoryName(cat);
		findPlantforCategory(cat);
	}

	function findCategoryName(titleN) {
		return categoryTable
			.where({ title: titleN })     // Set up the query
			.read()                         // Read the results
			.then(catName, handleError);
		event.preventDefault();
	}

	function catName(cats) {
		return listItems = $.map(cats, infoCat);
	}

	function infoCat(cat) {
		$('#infoVariety1').text(cat.text);
		return;
	}

	// end method for category

	// start methods for plants------------------------------------------------------------------------------------------PLANTS

	function getPlants(el) {
		return $(el).closest('div').attr('data-plant-id');
	}

	function addPlants(event) {
		var cate = $('#todo-cat3').val();

		getPlantsforLastID(cate);

	}



	function findPlantforCategory(catN) {
		return plantsTable
			.where({ category: catN })     // Set up the query
			.read()                         // Read the results
			.then(createPlantList, handleError);
		event.preventDefault();
	}

	function createPlants(plant) {
		return $('<div>')
			.attr('data-plant-id', plant.id)
			.text(plant.category + " - " + plant.num)
			.append($('<a class="plant-choose" href="#plants">GO</a>'))
			;
	}

	function createPlantList(items) {
		var listItems = $.map(items, createPlants);

		$('#todo-plants').empty().append(listItems).toggle(listItems.length > 0);
		$('.plant-choose').on('click', choosePlant);

		//	$('.item-text').on('change', updateItemTextHandler);
		//	$('.item-password').on('change', updateItemCompleteHandler);
	}

	function choosePlant(event) {

		var plant = getPlants(event.currentTarget);
		getPlantsforID(plant);

	}

	function getPlantsforID(plantID) {

		return plantsTable
			.where({ id: plantID })     // Set up the query
			.read()                         // Read the results
			.then(createPlantUniqueList, handleError);
		event.preventDefault();
	}

	function getPlantsforNum(plantNum, cat) {

		return plantsTable
			.where({
				num: plantNum,
				category: cat,
			})     // Set up the query
			.read()                         // Read the results
			.then(createPlantUniqueList, handleError);
		event.preventDefault();
	}

	function createPlantUniqueList(items) {
		return listItems = $.map(items, createUniquePlants);
	}

	function createUniquePlants(plant) {
		localStorage.setItem(3, (plant.num));

		localStorage.setItem(4, (plant.category));



		$('#titlePlant').text(plant.category + " - " + plant.num);
	}

	function getPlantsforLastID(categoryN) {
		return plantsTable
			.where({
				category: categoryN
			})     // Set up the query
			.read()                         // Read the results
			.then(createPlantUniqueForID, handleError);
		event.preventDefault();
	}

	function createPlantUniqueForID(items) {
		var nameBox = $('#numPlants'),
			nameText = nameBox.val();

		var cate = $('#todo-cat3').val();

		if (items.length === 0) {
			if (nameText !== '') {
				plantsTable.insert({
					name: nameText,
					category: cate,
					num: 1,
				}).then(displayCategories, handleError);
			}

			nameBox.val('').focus();
			event.preventDefault();
			return;
		} else {
			var idgive = items[items.length - 1].num;
			var idsent = parseInt(idgive, 10);

			idsent = idsent + 1;

			if (nameText !== '') {
				plantsTable.insert({
					name: nameText,
					category: cate,
					num: idsent,
				}).then(displayCategories, handleError);
			}

			nameBox.val('').focus();
			event.preventDefault();
			return;
		}


	}

	function nextPlants() {


		var numString = localStorage.getItem(localStorage.key(2));
		var numInt = parseInt(numString, 10);
		numInt = numInt + 1;
		var category = localStorage.getItem(localStorage.key(3));


		getPlantsforNum(numInt, category);

	}
	function lastPlants() {


		var numString = localStorage.getItem(localStorage.key(2));
		var numInt = parseInt(numString, 10);
		numInt = numInt - 1;
		var category = localStorage.getItem(localStorage.key(3));

		getPlantsforNum(numInt, category);

	}

})();