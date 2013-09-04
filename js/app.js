App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Item.all();
  }
});

//Param for search
var Persona = 'Michelle Obama';

App.IndexController = Ember.ObjectController.extend({
  headerName: 'Freebase Profession Ask',
  personName: Persona,
  appVersion:  2.1
});

App.Item = Ember.Object.extend();

App.Item.reopenClass({
  //Retrives profession(s) from Freebase 
  all: function() {
		var service_url = 'https://www.googleapis.com/freebase/v1/topic';
		var persona = '/en/' + Persona.toLowerCase().replace(' ', '_');
	 	var topic_id = persona + '?filter=/people/person/profession';
      	
      	var params = {};
      	return $.getJSON(service_url + topic_id + '&callback=?')
      			.then(function(topic) {
		      		var items = [],
		      			professions = topic['property']['/people/person/profession']['values'];
					 
			        professions.forEach( function (item) {
			          items.push( App.Item.create(item) );
			        });			 
			         return items;
		      	});
  }
});
