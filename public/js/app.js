ENV = { ENABLE_ALL_FEATURES: true };

App = Ember.Application.create();

App.Router.map(function() {
    this.resource("channels");
    this.resource("channel");
});


App.Channel = DS.Model.extend({
    title: DS.attr('string'),
    description:  DS.attr('string'),
    thumbnails: DS.attr('')
});

App.ChannelsRoute = Ember.Route.extend({
    setupController: function(controller,model){
    	controller.set('model',model);
	controller.set('q',model.query.q);
    },
    model: function(params) {
    	//return jQuery.get('http://localhost:3000/v1/channel?q=xoom.com');
	return this.store.find('channel',{ q: params.queryParams.q });
    },
    actions: {
	queryParamsDidChange: function() {
	    // opt into full refresh
	    this.refresh();
	}
    }
});


App.ChannelsController = Ember.ArrayController.extend({
    channelSearch: null,
    queryParams: ['q'],
    q: 'xoom',
    searchResults: function() {
	return this.get('model').filter(function (channel){
	    return 'hello';//name.description.match(regex);
	},this);
    }.property('q','model'),
    actions:{
	autocomplete: function(val){
	    this.transitionToRoute('channels',{queryParams:{q: val}});
	}
    },
    submitAction: function(){
	console.log('suybmit');
    }
});

App.ChannelsView = Ember.View.extend({
    searchTerm: null,
    keyUp: function(e){
	console.log(e);
	if (e.target.value.length >= 3){
	    this.controller.send('autocomplete',e.target.value);
	}
	    
    }
});

App.ChannelSerializer = DS.ActiveModelSerializer.extend({
    primaryKey: 'channelId',
});



DS.ActiveModelAdapter.reopen({
    host: 'http://localhost:3000/v1',
    corsWithCredentials: true
});

App.ApplicationStore = DS.Store.extend({
    adapter:'-active-model'
})
